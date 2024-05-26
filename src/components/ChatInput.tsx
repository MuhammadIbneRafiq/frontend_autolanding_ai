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
                const response = await sendMessageNewChat(message, "user");              // comes from useChatACTIONS 

                console.log('useChat /newchat works:', response)    // this response is the groq api responding w llm chain!
                
                const latestChatHistory = await getChatMessages( 
                    // 'ce0429d9-210f-48e6-aa43-81b221fef544'                 // useChat, getChatMessages gets Messages[]
                    response.conversation_id                            // groq only replies message, doesnt have conv id
                );

                // Send the message to GPT
                console.log("shows getChatMessages works", latestChatHistory);    // array of 8 with all messages of the convo id

                console.log('response theke messagetosend', response.message)
                await generateAIResponse(
                    latestChatHistory as Message[],
                    response.conversation_id
                    // 'ce0429d9-210f-48e6-aa43-81b221fef544' 
                );

                // Refetch the chat messages
                await refetchConversationsList();
                await refetchChatMessages();    // one using the id, its /undefined, if i fix this, hopefully its navigates to the page i want

                console.log('im here and why are they navigating to there?')
                // navigate('/chat/a7e43fed-f788-4da7-a33d-65702aa281aa')
                navigate(`/chat/${response.conversation_id}`);
            } else {
                // if this is an existing chat, send the message

                console.log(
                    'i need to go here'
                )

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