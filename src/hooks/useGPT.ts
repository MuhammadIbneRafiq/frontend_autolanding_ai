import { Message } from "@/types/Message";
import axios from "axios";
// import { formatForGPT } from "@/lib/utils";

export const useGPT = () => {
    async function generateAIResponse(
        message: string,
        sessionId: string
    ) {
        console.log(message)

        console.log('this is the print to see what its going wrong')
        const response = await axios.post(
            `http://localhost:3000/chat/${sessionId}`,
            {
                sessionId: sessionId,
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

        console.log('this 2nd wrong', response)

        const responseAI = response.data as Message;
        console.log(responseAI)
        return responseAI;
    }

    return { generateAIResponse };
};
