import { Message } from "@/types/Message";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

interface ChatProps {
  id: string;
}

/*
Makes an api call to the backend and return the chat history of a specific chat.
*/
export const useChat = ({ id }: ChatProps) => {
  const hardcodedId = "8c245f0d-daec-4845-9cfc-25365547ec21"; // Replace with your actual chat ID
  const chatId = id || hardcodedId;

  // console.log('heres the id', id)

  const {
    data: chatHistory,
    isError,
    isLoading,
    refetch: refetchChatMessages,
  } = useQuery({
    queryKey: ["chatHistory", chatId], // putting the convo id here
    queryFn: async () => {
      return await getChatMessages(chatId); // here
    },
    refetchOnWindowFocus: false,
    enabled: Boolean(chatId), // here
  });

  const getChatMessages = async (id: string) => {
    const token = localStorage.getItem("accessToken");
    const response = await axios.get(
      // `http://localhost:3000/chats/${id}`,
      `https://backend-autolanding-ai.vercel.app/chats/${id}`,
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
