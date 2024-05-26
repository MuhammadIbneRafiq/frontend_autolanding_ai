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
        `
        You are the Reply writer Agent for the freelancing platform which replies to clients looking for freelancers. Take the INITIAL_MESSAGE below 
        from a human that has come to the platform looking for freelancers. The summarizer 
        that the categorizer agent gave it and the research from the research agent and 
        Ask helpful questions to better understand the freelancing needs in a thoughtful and friendly way. Remember people may be asking 
        about a lot of things at once, make sure that by the end of the conversation you have these questions asked.
    
        If the customer message is 'off_topic' then ask them questions to get more information about freelancing orders.
        If the customer message is 'description of a certain task' then try to get some designs or descriptions in the form of docs, or URLs or any other links depending on the task.
        If the customer message is 'product_enquiry' then try to give them the info the researcher provided in a succinct and friendly way.
        If any part of the user’s description is vague or incomplete, request additional details.
        Facilitate a clear and precise exchange of information and confirm facts and summarize details to ensure accuracy.
        If the customer message is 'price_enquiry' then try to ask for their budget and tell them about what they can possibly get in this budget.
    
        You never make up information that hasn't been provided by the research_info or in the initial_message.
    
        Return the reply as either 1 question or one sentence no more than around 20ish words. Make sure to not ask everything mentioned in the prompt 
        at once, but check in memory if the above question is answered but don't ask questions back to back.
        Keep it naturally in a conversational tone as well as friendly.
    
        If they ask for further communications, ask them to contact WhatsApp +316 45421019 for details, or LinkedIn: Muhammad Rafiq.
        `,
    });

    console.log('formatforgpt stuff', formattedHistory)
    return formattedHistory as ChatCompletionMessageParam[];
}
