import { Loader, SendHorizontal } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useAuth } from "@/hooks/useAuth";
import { useChat } from "@/hooks/useChat";
import { useChatActions } from "@/hooks/useChatActions";
import { useChats } from "@/hooks/useChats";
import { useAgent } from "@/hooks/useAgent";
import { useProjects } from "@/hooks/useProjects";
import { useProjectActions } from "@/hooks/useProjectActions";
import { useToast } from "./ui/use-toast";

interface ResultItemProps {
  id: number;
  name: string;
  tweet: string;
  profile: string;
  url: string;
}

interface ChatInputProps {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  search: (query: string) => Promise<ResultItemProps[]>;
}

export const ChatInput = ({ loading, setLoading }: ChatInputProps) => {
  const location = useLocation();
  const chatId = location.pathname.split("/")[2];

  const { isAuthenticated } = useAuth();

  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const { toast } = useToast();
  const { refetchChatMessages /*, getChatMessages */ } = useChat({
    id: chatId,
  });
  const { generateAIResponse } = useAgent();
  const { refetchChatsList } = useChats();
  const { createChat, sendMessageExistingChat } = useChatActions();
  const { projects, refetchProjectsList } = useProjects();
  const { createProject } = useProjectActions();

  const isOnProjectPage = location.pathname.split("/")[1] === "project";

  // Clear the chat inputted text when the user goes to a different page
  useEffect(() => {
    setMessage("");
  }, [location.pathname]);

  const projectExistsForChat = useMemo(() => {
    if (!projects) {
      return false;
    }

    return Boolean(projects.find((project) => project.chat_id === chatId));
  }, [projects, chatId]);

  async function onSendMessage() {
    setLoading(true);
    try {
      if (location.pathname === "/chatHome") {
        // If this is a new chat, send the message and navigate to the chat
        const response = await createChat(message, "user");
        await generateAIResponse(response.chat_id);

        await refetchChatsList();
        await refetchChatMessages();

        navigate(`/chat/${response.chat_id}`);
      } else {
        // If this is an existing chat, send the message
        setMessage("");
        const chatId = location.pathname.split("/")[2];
        await sendMessageExistingChat(message, chatId, "user");
        await refetchChatMessages();

        const aiMessage = await generateAIResponse(chatId);
        await refetchChatMessages();

        if (aiMessage.is_final) {
          console.log("Final message received");
          toast({
            title: "New project requested",
            description:
              "Our agent is creating the new project for you. You should see it in a few seconds.",
            variant: "success",
          });

          const response = await createProject(chatId);
          await refetchProjectsList();

          navigate(`/project/${response.project_id}`);
        }
      }
      setMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
      toast({
        title: "Failed to send message",
        description:
          "Something went wrong while sending the message. Please try again.",
        variant: "destructive",
      });
    }
    setLoading(false);
  }

  return (
    <div className="flex items-end w-full justify-between items-center gap-2">
      <Input
        placeholder={
          !isAuthenticated
            ? "Sign up or log in to start chatting."
            : projectExistsForChat
            ? "We created a profile for you based on your chat, go and share this to your clients!"
            : isOnProjectPage
            ? "Share and start outreach! If you want to edit the project, go and keep chatting."
            : "Describe your client needs to get matched with the right one. E.g. 'I am a web developer for AI automation agency'."
        }
        value={message}
        className={`${
          !isAuthenticated ? "cursor-pointer font-bold" : ""
        } bg-white dark:bg-black`}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSendMessage();
          }
        }}
        onClick={isAuthenticated ? undefined : () => navigate("/register")}
        // disabled={projectExistsForChat || isOnProjectPage}
        disabled={ isOnProjectPage }
      />
      <Button
        variant="secondary"
        onClick={onSendMessage}
        disabled={
          loading || projectExistsForChat || isOnProjectPage || !message
        }
      >
        {loading ? <Loader className="animate-spin" /> : <SendHorizontal />}
      </Button>
    </div>
  );
};
