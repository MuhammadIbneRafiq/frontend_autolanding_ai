import { Loader, SendHorizontal } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Message } from "@/types/Message";
import { useAuth } from "@/hooks/useAuth";
import { useChat } from "@/hooks/useChat";
import { useChatActions } from "@/hooks/useChatActions";
import { useConversations } from "@/hooks/useConversations";
import { useGPT } from "@/hooks/useGPT";
import { useProjects } from "@/hooks/useProjects";
import { useToast } from "./ui/use-toast";

interface ChatInputProps {
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ChatInput = ({ loading, setLoading }: ChatInputProps) => {
    const location = useLocation();
    const conversationId = location.pathname.split("/")[2];

    const { isAuthenticated } = useAuth();

    console.log("isAuthenticated", isAuthenticated);

    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const { toast } = useToast();
    const { chatHistory, refetchChatMessages, getChatMessages } = useChat({
        id: conversationId,
    });
    const { generateAIResponse } = useGPT();
    const { refetchConversationsList } = useConversations();
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
                (project) => project.conversation_id === conversationId
            )
        );
    }, [projects, conversationId]);

    async function onSendMessage() {
        setLoading(true);
        try {
            // if this is a new chat, send the message and navigate to the chat
            if (location.pathname === "/") {
                const response = await sendMessageNewChat(message, "user");

                const latestChatHistory = await getChatMessages(
                    response.conversation_id
                );

                // Send the message to GPT
                // console.log("Chat history being sent:", latestChatHistory);
                await generateAIResponse(
                    latestChatHistory as Message[],
                    response.conversation_id
                );

                // Refetch the chat messages
                await refetchConversationsList();
                await refetchChatMessages();
                navigate(`/chat/${response.conversation_id}`);
            } else {
                // if this is an existing chat, send the message
                setMessage("");
                const conversationId = location.pathname.split("/")[2];
                await sendMessageExistingChat(message, conversationId, "user");
                await refetchChatMessages();

                // Send the message to GPT
                await generateAIResponse(
                    chatHistory as Message[],
                    conversationId
                );
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
                        ? "Sign up to start finding freelancers or clients"
                        : projectExistsForChat
                        ? "This chat has been moved to a project and is read-only."
                        : isOnProjectPage
                        ? "Chat is disabled for projects. Reach out to us via email for any questions."
                        : "Ask me anything..."
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
