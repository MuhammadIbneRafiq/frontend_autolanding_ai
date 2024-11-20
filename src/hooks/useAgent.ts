import { Message } from "@/types/Message";
import axios from "axios";

export const useAgent = () => {
  async function generateAIResponse(chatId: string) {
    const response = await axios.put(
      `http://localhost:3000/chats/${chatId}`,
      {
        sender: "assistant",
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        timeout: 30000, // 30 seconds
      }
    );

    const responseMessage = response.data as Message;
    console.log('🤖 AI response:', responseMessage);
    return responseMessage;
  }

  return { generateAIResponse };
};
