import { Message } from "@/types/Message";
import axios from "axios";

export const useGPT = () => {
  async function generateAIResponse(
    chatId: string
  ) {

    const response = await axios.put(
      `https://backend-autolanding-ai.vercel.app/chats/${chatId}`,
      {
        sender: "assistant",
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );

    const responseMessage = response.data as Message;
    return responseMessage;
  }

  return { generateAIResponse };
};
