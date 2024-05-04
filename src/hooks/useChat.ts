import { Message } from "@/types/Message";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

interface ChatProps {
    id: string;
}

/*
Makes an api call to the backend and return the chat history of a specific conversation.
*/
export const useChat = ({ id }: ChatProps) => {
    const {
        data: chatHistory,
        isError,
        isLoading,
        refetch: refetchChatMessages,
    } = useQuery({
        queryKey: ["chatHistory", id],
        queryFn: async () => {
            return await getChatMessages(id);
        },
        refetchOnWindowFocus: false,
        enabled: Boolean(id),
    });

    const getChatMessages = async (id: string) => {
        const token = localStorage.getItem("accessToken");

        const response = await axios.get(
            `https://ai-freelance-be.onrender.com/chat/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data as Message[];
    };

    return {
        chatHistory,
        isError,
        isLoading,
        refetchChatMessages,
        getChatMessages,
    };
};
