import { Message, SentFrom } from "@/types/Message";

import axios from "axios";
import { useUserSessionStore } from "@/services/state/useUserSessionStore";

export const useChatActions = () => {
    const user = useUserSessionStore((state) => state.user);

    const sendMessageExistingChat = async (
        messageToSend: string,
        conversationId: string,
        from: SentFrom
    ) => {
        if (!user) {
            throw new Error("User is not authenticated");
        }

        const response = await axios.post(
            "https://ai-freelance-be.onrender.com/chat/existing",
            {
                messageToSend: messageToSend,
                conversationId: conversationId,
                from: from,
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "accessToken"
                    )}`,
                },
            }
        );

        console.log("Response:", response);
        return response.data as Message;
    };

    const sendMessageNewChat = async (
        messageToSend: string,
        from: SentFrom
    ) => {
        if (!user) {
            throw new Error("User is not authenticated");
        }

        // TODO: Summarize the message request

        const response = await axios.post(
            "https://ai-freelance-be.onrender.com/chat/new",
            {
                messageToSend: messageToSend,
                from: from,
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "accessToken"
                    )}`,
                },
            }
        );

        console.log("Response:", response);

        return response.data as Message;
    };

    return { sendMessageNewChat, sendMessageExistingChat };
};
