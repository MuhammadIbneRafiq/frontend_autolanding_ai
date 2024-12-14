import { Message, SentFrom } from "@/types/Message";

import axios from "axios";
import { useUserSessionStore } from "@/services/state/useUserSessionStore";

export const useChatActions = () => {
  const user = useUserSessionStore((state) => state.user);

  const sendMessageExistingChat = async (
    content: string,
    chatId: string,
    sender: SentFrom
  ) => {
    if (!user) {
      throw new Error("User is not authenticated");
    }

    const response = await axios.put(
      // `http://localhost:3000/chats/${chatId}`,
      `https://backend-autolanding-ai.vercel.app/chats/${chatId}`,

      {
        content: content,
        chatId: chatId,
        sender: sender,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        timeout: 30000  // 30 seconds
      }
    );

    return response.data.message as Message;
  };

  const createChat = async (content: string, sender: SentFrom) => {
    if (!user) {
      throw new Error("User is not authenticated");
    }

    const response = await axios.post(
      // "http://localhost:3000/chats/new",
      `https://backend-autolanding-ai.vercel.app/chats/new`,

      {
        content: content,
        sender: sender,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        timeout: 30000  // 30 seconds
      }
    );

    console.log("Response:", response);

    return response.data as Message;
  };

  return { createChat, sendMessageExistingChat };
};
