export type Message = {
    message_id: string;
    message: string;
    sent_at: string;
    conversation_id: string;
    from: string;
    user_id: string;
};

export type SentFrom = "user" | "assistant";

export type GroqMessage = {
    role: string;
    content: string;
  };
