import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "./ui/card";
import { ChatInput } from "./ChatInput";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Database } from "@/types/supabase";
import { supabase } from "./utils/supabaseClient";
import { Loader } from "lucide-react";

type Message = {
  id: string;
  created_at: string;
  sender_id: string;
  conversation_id: string;
  content: string;
};

export const RealTimeChatPage = () => {
  const { id } = useParams();
  const supabase = useSupabaseClient<Database>();
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  // Function to fetch messages from Supabase
  const fetchMessages = async () => {
    setLoading(true);
    if (!id) {
      console.error("Conversation ID is undefined.");
      return;
    }
    const { data, error } = await supabase
      .from("message_chat")
      .select("*")
      .eq("conversation_id", id)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error fetching messages:", error);
    } else {
      console.log(data);
      setMessages(data);
    }
    setLoading(false);
  };

  // Function to listen to real-time messages
  useEffect(() => {
    fetchMessages();

    const messageListener = supabase
      .channel("public:message_chat")
      .on<Database["public"]["Tables"]["message_chat"]["Row"]>(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "message_chat" },
        (payload) => {
          if (payload.new.conversation_id === id) {
            setMessages((prevMessages) => [...prevMessages, payload.new]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(messageListener);
    };
  }, [id]);

  return (
    <div className="w-full h-full flex justify-center p-4 flex-col md:flex-row gap-1 md:pt-4">
      <Card className="rounded-2 h-[75vh] md:h-full min-w-[10vw] max-w-[100vw] w-full">
        <div className="flex flex-col h-full items-center justify-center p-6">
          {loading ? (
            <Loader className="animate-spin" />
          ) : (
            <div className="w-full h-full overflow-y-auto p-4">
              {messages.map((message) => (
                <div key={message.id} className="mb-4">
                  <div>
                    <span className="font-bold">{message.sender_id}: </span>
                    {message.content}
                  </div>
                  <div className="text-xs text-muted">
                    {new Date(message.created_at).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          )}
          <ChatInput loading={loading} setLoading={setLoading} />
        </div>
      </Card>
    </div>
  );
};
