import { Link, useLocation } from "react-router-dom";

import { Loader } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { ScrollShadow } from "@nextui-org/react";
import { useChats } from "@/hooks/useChats";

export const ChatList = () => {
    const { chats, isLoading, isError } = useChats();

    const path = useLocation();

    return (
        <ScrollArea className="flex flex-col h-full">
            <div className="flex flex-col h-full mt-2 gap-1">
                {isLoading && (
                    <div className="flex justify-center items-center justify-center h-full">
                        <Loader className="animate-spin" />
                    </div>
                )}

                {!isError &&
                    chats?.map((chat) => (
                        <ScrollShadow
                            orientation="horizontal"
                            key={chat.chat_id}
                            className={`${
                                path.pathname.split("/")[2] ==
                                chat.chat_id
                                    ? "bg-muted"
                                    : ""
                            } w-full max-w-[100px] md:max-w-[210px] hover:bg-muted transition-colors pt-2 pb-2 rounded-lg cursor-pointer`}
                        >
                            <Link
                                key={chat.chat_id}
                                to={`/chat/${chat.chat_id}`}
                                className="h-full rounded-lg text-sm"
                            >
                            <p className="w-[500px] ml-[-1px] pl-3 whitespace-nowrap overflow-hidden text-overflow-ellipsis">
                                {chat.title}
                            </p>
                            </Link>
                        </ScrollShadow>
                    ))}
            </div>
        </ScrollArea>
    );
};
