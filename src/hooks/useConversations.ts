import { Conversation } from "@/types/Conversation";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

/*
Makes an api call to the backend and return the list of conversations.
*/
export const useConversations = () => {
    const {
        data: conversations,
        isError,
        isLoading,
        refetch: refetchConversationsList,
    } = useQuery({
        queryKey: ["conversations"],
        queryFn: async () => {
            const token = localStorage.getItem("accessToken");

            const response = await axios.get(
                "https://ai-freelance-be.onrender.com/chat/conversations",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log("Conversations from useConversations", response.data);

            return response.data as Conversation[];
        },
        refetchOnWindowFocus: false,
        retry: false,
    });

    return { conversations, isError, isLoading, refetchConversationsList };
};
