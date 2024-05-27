import { Message } from "@/types/Message";
import axios from "axios";
// import { formatForGPT } from "@/lib/utils";

export const useGPT = () => {
    async function generateAIResponse(
        // chatHistory: Message[],
        message: string,
        conversationId: string
    ) {
        const formattedMessages = message;
        
        // console.log('INPUT is chat the formatted message', formatForGPT)
        // console.log('INPUT is the chathistoyr,', chatHistory[chatHistory.length -1])

        const response = await axios.post(
            `http://localhost:3000/chat/${conversationId}`,
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

        // console.log('final return thingy', responseAI)

        return responseAI;
    }

    return { generateAIResponse };
};