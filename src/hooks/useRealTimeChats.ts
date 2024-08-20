import { useState, useEffect } from "react";
import { supabase } from "@/hooks/supaBase"; // Ensure this is your Supabase client instance

type Message = {
    id: string;
    created_at: string;
    sender_id: string;
    conversation_id: string;
    content: string;
  };

export const useRealTimeChats = (chatId: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("message_chat")
        .select("*")
        .eq("conversation_id", chatId)
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching messages: ", error);
      } else {
        setMessages(data);
      }

      setLoading(false);
    };

    fetchMessages();

    // Subscribe to new messages in real-time
    const messageSubscription = supabase
    .channel(`public:message_chat:conversation_id=eq.${chatId}`)
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'message_chat', filter: `conversation_id=eq.${chatId}` },
      (payload: any) => {
        setMessages((prevMessages) => [
          ...prevMessages,
          payload.new as Message, // Type assertion here
        ]);
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(messageSubscription);
  };
  }, [chatId]);

  return { messages, loading };
};
