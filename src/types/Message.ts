export type Message = {
  message_id: string;
  content: string;
  created_at: string;
  chat_id: string;
  sender: string;
  user_id: string;
  is_final: boolean;
  search_needed: boolean;
};

export type SentFrom = "user" | "assistant";

export type GroqMessage = {
  role: string;
  content: string;
};
