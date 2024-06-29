import { Loader, SendHorizontal } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
// import { Message } from "@/types/Message";
import { useAuth } from "@/hooks/useAuth";
import { useChat } from "@/hooks/useChat";
import { useChatActions } from "@/hooks/useChatActions";
import { useChats } from "@/hooks/useChats";
import { useGPT } from "@/hooks/useGPT";
import { useProjects } from "@/hooks/useProjects";
import { useToast } from "./ui/use-toast";

interface ChatInputProps {
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ChatInput = ({ loading, setLoading }: ChatInputProps) => {
    const location = useLocation();
    const chatId = location.pathname.split("/")[2];

    const { isAuthenticated } = useAuth();

    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const { toast } = useToast();
    const { refetchChatMessages /*, getChatMessages */} = useChat({
        id: chatId,
    });
    const { generateAIResponse } = useGPT();
    const { refetchChatsList } = useChats();
    const { sendMessageNewChat, sendMessageExistingChat } = useChatActions();
    const { projects, refetchProjectsList } = useProjects();

    const isOnProjectPage = location.pathname.split("/")[1] === "project";

    // Clear the chat inputted text when the user goes to a different page
    useEffect(() => {
        setMessage("");
    }, [location.pathname]);

    const projectExistsForChat = useMemo(() => {
        if (!projects) {
            return false;
        }

        return Boolean(
            projects.find(
                (project) => project.chat_id === chatId
            )
        );
    }, [projects, chatId]);

    async function onSendMessage() {
        setLoading(true);
        try {
            // if this is a new chat, send the message and navigate to the chat
            if (location.pathname === "/") {
                const response = await sendMessageNewChat(message, "user");
                await generateAIResponse(response.chat_id);

                // Refetch the chat messages
                await refetchChatsList();
                await refetchChatMessages();

                // console.log('HERES THE refetch convo probs', a, b)
                navigate(`/chat/${response.chat_id}`);
            } else {
                // if this is an existing chat, send the message
                setMessage("");
                const chatId = location.pathname.split("/")[2];
                await sendMessageExistingChat(message, chatId, "user");
                await refetchChatMessages();

                // Send the message to GPT
                await generateAIResponse(chatId);
                await refetchChatMessages();
                await refetchProjectsList();
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
        <div className="flex items-end w-full gap-2 ">
            <Input
                placeholder={
                    !isAuthenticated
                        ? "Sign up to start finding freelancers."
                        : projectExistsForChat
                        ? "We already created a project for this chat and is now read-only."
                        : isOnProjectPage
                        ? "Chat is currently not available for projects. Reach out to us via email for any questions."
                        : "Tell me about your project..."
                }
                value={message}
                className={`${
                    !isAuthenticated ? "cursor-pointer font-bold" : ""
                }`}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        onSendMessage();
                    }
                }}
                onClick={
                    isAuthenticated ? undefined : () => navigate("/register")
                }
                disabled={projectExistsForChat || isOnProjectPage}
            />
            <Button
                variant="secondary"
                onClick={onSendMessage}
                disabled={
                    loading ||
                    projectExistsForChat ||
                    isOnProjectPage ||
                    !message
                }
            >
                {loading ? (
                    <Loader className="animate-spin" />
                ) : (
                    <SendHorizontal />
                )}
            </Button>
        </div>
    );
};