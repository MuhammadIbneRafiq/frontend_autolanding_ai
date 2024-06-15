import { Chat } from "@/types/Chat";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

/*
Makes an api call to the backend and return the list of chats.
*/
export const useChats = () => {
  const {
    data: chats,
    isError,
    isLoading,
    refetch: refetchChatsList,
  } = useQuery({
    queryKey: ["chats"],
    queryFn: async () => {
      const token = localStorage.getItem("accessToken");

      const response = await axios.get(
        "https://backend-autolanding-ai.vercel.app/chats",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data as Chat[];
    },
    refetchOnWindowFocus: false,
    retry: false,
  });
  return { chats, isError, isLoading, refetchChatsList };
};
