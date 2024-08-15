import { Card } from "./ui/card";
import Chat from "./Chat";
import { ChatInput } from "./ChatInput";
import { ChatList } from "./ChatList";
import { Edit } from "lucide-react";
import { ProjectList } from "./ProjectList";
import { Separator } from "./ui/separator";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ChatInterface() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    return (
        <div className="w-full h-full flex justify-center p-4 flex-col md:flex-row gap-1 pt-40 md:pt-4">
            <Card className="rounded-2 md:max-w-[250px] w-full flex justify-between max-h-[250px] md:max-h-full overflow:auto">
                <div className="w-full flex flex-row md:flex-col p-6 justify-between md:justify-between md:items-start">
                    <div>
                        <div className="flex items-center justify-between">
                            <h2 className="font-semibold text-lg">Chats</h2>
                            <Edit
                                onClick={() => navigate("/chatHome")}
                                className="cursor-pointer"
                            />
                        </div>
                        <Separator />
                        <ChatList />
                    </div>
                    <div>
                        <h2 className="font-semibold text-lg">Projects</h2>
                        <Separator />
                        <ProjectList />
                    </div>
                    <div></div>
                </div>
            </Card>
            <Card className="rounded-2 h-full min-w-[10vw] max-w-[100vw] md:max-w-[100vw] w-full">
                <div className="flex flex-col h-full items-center justify-center p-6">
                    <Chat loading={loading} />
                    <ChatInput loading={loading} setLoading={setLoading} />
                </div>
            </Card>
        </div>
    );
}
