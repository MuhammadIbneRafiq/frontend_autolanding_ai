import { Message } from "@/types/Message";
import axios from "axios";
import { formatForGPT } from "@/lib/utils";

export const useGPT = () => {
    async function generateAIResponse(
        chatHistory: Message[],
        conversationId: string
    ) {
        const formattedMessages = formatForGPT(chatHistory);

        const response = await axios.post(
            `https://ai-freelance-be.onrender.com/chat/${conversationId}`,
            {
                conversationId: conversationId,
                chatHistory: formattedMessages,
                from: "assistant",
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "accessToken"
                    )}`,
                },
            }
        );

        const responseAI = response.data as Message;

        return responseAI;
    }

    return { generateAIResponse };
};
