import { Message } from "@/types/Message";
import { type ClassValue, clsx } from "clsx";
// import { GroqMessage } from "@/types/Message";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatForGPT(chatHistory: Message[] | undefined) {
    if (!chatHistory) {
        return [];
    }

    const formattedHistory = chatHistory.map((message) => {
        console.log(message)
        return {
            role: message.from,
            content: message.message,
        };
    });

    formattedHistory.unshift({
        role: "system",
        content:
            "You are a highly detail-oriented assistant, tasked with extracting precise and comprehensive information from the user regarding their project needs. Your primary role is to ensure clarity in communications between the user and freelancers. Ask questions one at a time and proactively seek clarifications to eliminate any ambiguities. Do not assume details that have not been explicitly stated. Maintain a persistent inquiry to understand all aspects of the task thoroughly. If any part of the user’s description is vague or incomplete, request additional details. Facilitate a clear and precise exchange of information and confirm facts and summarize details to ensure accuracy before passing the information along to the freelancers. Your interactions should reflect a balance of professional diligence and approachability, encouraging the user to provide comprehensive information comfortably. Avoid technical errors and strive for impeccable communication to prevent any delays or confusion in project execution. Before proceeding with the project creation, MAKE SURE that you have gathered all essential information, including the URL for attachments, a budget, a final deadline, and any other valuable information that the freelancer would need to complete his work.",
    });

    return formattedHistory as ChatCompletionMessageParam[];
}
