import { Link, useLocation } from "react-router-dom";

import { Loader } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { ScrollShadow } from "@nextui-org/react";
import { useConversations } from "@/hooks/useConversations";

export const ConversationList = () => {
    const { conversations, isLoading, isError } = useConversations();

    const path = useLocation();

    console.log("conversations", conversations, isError);

    return (
        <ScrollArea className="flex flex-col h-full">
            <div className="flex flex-col h-full mt-2 gap-1">
                {isLoading && (
                    <div className="flex justify-center items-center justify-center h-full">
                        <Loader className="animate-spin" />
                    </div>
                )}

                {!isError &&
                    conversations?.map((conversation) => (
                        <ScrollShadow
                            orientation="horizontal"
                            key={conversation.conversation_id}
                            className={`${
                                path.pathname.split("/")[2] ==
                                conversation.conversation_id
                                    ? "bg-muted"
                                    : ""
                            } w-full max-w-[100px] md:max-w-[210px] hover:bg-muted transition-colors pt-2 pb-2 rounded-lg cursor-pointer`}
                        >
                            <Link
                                key={conversation.conversation_id}
                                to={`/chat/${conversation.conversation_id}`}
                                className="h-full rounded-lg text-sm"
                            >
                                <p className="w-[500px] ml-[-1px] pl-3 ">
                                    {conversation.summary}
                                </p>
                            </Link>
                        </ScrollShadow>
                    ))}
            </div>
        </ScrollArea>
    );
};
