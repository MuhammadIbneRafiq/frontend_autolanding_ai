import { Chat } from "@/types/Chat";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

/*
Makes an api call to the backend and return the list of conversations.
*/
export const useChats = () => {
  const {
    data: chats,
    isError,
    isLoading,
    refetch: refetchConversationsList,
  } = useQuery({
    queryKey: ["chats"],
    queryFn: async () => {
      const token = localStorage.getItem("accessToken");

      const response = await axios.get(
        "http://localhost:3000/chats",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // console.log("Conversations from useConversations", response.data);

      return response.data as Chat[];
    },
    refetchOnWindowFocus: false,
    retry: false,
  });
  return { chats, isError, isLoading, refetchConversationsList };
};
