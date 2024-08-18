export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

// Example Database type (add this in @/types/supabase or wherever your Database type is defined)

export type Database = {
    public: {
      Tables: {
        message_chat: {
          Row: {
            id: string;
            created_at: string;
            sender_id: string;
            conversation_id: string;
            content: string;
          };
          Insert: {
            id?: string;
            created_at?: string;
            sender_id: string;
            conversation_id: string;
            content: string;
          };
          Update: {
            id?: string;
            created_at?: string;
            sender_id?: string;
            conversation_id?: string;
            content?: string;
          };
        };
        // Other tables
      };
      Views: {
        // Views here if any
      };
      Functions: {
        // Functions here if any
      };
      Enums: {
        // Enums here if any
      };
    };
  };
