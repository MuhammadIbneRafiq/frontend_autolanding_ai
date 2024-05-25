import { Message } from "@/types/Message";
import axios from "axios";
// import { formatForGPT } from "@/lib/utils";

export const useGPT = () => {
    async function generateAIResponse(
        message: Message,
        sessionId: string
    ) {
        const response = await axios.post(
            `http://localhost:3001/chat/${sessionId}`,
            {
                // sessionId: sessionId,
                message: message,
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
        console.log(responseAI)
        return responseAI;
    }

    return { generateAIResponse };
};
