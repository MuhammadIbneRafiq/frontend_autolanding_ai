import { Card } from "./ui/card";
import Chat from "./Chat";
import { ChatInput } from "./ChatInput";
import { ConversationList } from "./ConversationList";
import { Edit } from "lucide-react";
import { ProjectList } from "./ProjectList";
import { Separator } from "./ui/separator";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ChatInterface() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    return (
        <div className="w-full h-full flex">
            <Card className="h-full rounded-none max-w-[140px] md:max-w-[250px] w-full">
                <div className="flex flex-col h-full p-6">
                    <div className="flex items-center justify-between">
                        <h2 className="font-semibold text-lg">Chats</h2>
                        <Edit
                            onClick={() => navigate("/")}
                            className="cursor-pointer "
                        />
                    </div>
                    <Separator />
                    <ConversationList />
                    <h2 className="font-semibold text-lg">Projects</h2>
                    <Separator />
                    <ProjectList />
                </div>
            </Card>
            <Card className="w-full rounded-none h-full">
                <div className="flex flex-col h-full items-center justify-center p-6">
                    <Chat loading={loading} />
                    <ChatInput loading={loading} setLoading={setLoading} />
                </div>
            </Card>
        </div>
    );
}
