import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useEffect, useRef } from "react";

import { Loader } from "lucide-react";
import { Logo } from "./Logo";
import { ProjectStatus } from "@/types/Project";
import { ScrollShadow } from "@nextui-org/react";
import { motion } from "framer-motion";
import { useChat } from "@/hooks/useChat";
import { useLocation } from "react-router-dom";
import { useProject } from "@/hooks/useProject";

interface ChatProps {
    loading: boolean;
}

export default function Chat({ loading }: ChatProps) {
    const path = useLocation();

    const conversation = useChat({ id: path?.pathname.split("/")[2] });
    const { project } = useProject({ id: path?.pathname.split("/")[2] });

    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            // Scroll to the bottom
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [conversation.chatHistory]); // Trigger whenever chat history changes

    return (
        <div className="h-full w-full">
            <ScrollShadow
                orientation="vertical"
                className="h-full"
                ref={scrollRef}
            >
                <div className="flex flex-col gap-2 h-full">
                    {path.pathname === "/" ? (
                        <div className="flex flex-col h-full justify-center items-center">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1.5 }}
                            >
                                <div className="flex flex-col gap-2 items-center">
                                    <Logo height="200" width="340" />
                                    {loading ? (
                                        <Loader
                                            className="animate-spin"
                                            size={36}
                                        />
                                    ) : (
                                        <p className="text-xl font-bold uppercase">
                                            Meet Autolance AI 🤖, your personal
                                            agent to get you FREELANCERS👩🏿‍💻 OR CLIENTS👨🏻‍💼!
                                        </p>
                                    )}
                                </div>
                            </motion.div>
                        </div>
                    ) : path.pathname.split("/")[1] === "project" && project ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1.5 }}
                            className="flex flex-col gap-4 h-full"
                        >
                            <div className="h-full">
                                <div className="flex flex-col items-center h-full max-h-[150px] justify-center">
                                    <h1 className="text-xl font-extrabold lg:text-5xl text-center">
                                        {project?.title ?? "No title found."}
                                    </h1>
                                    <h2 className="pb-2 text-xl font-semibold tracking-tight first:mt-0 text-center">
                                        {new Date(
                                            project?.created_at ?? ""
                                        ).toDateString()}
                                    </h2>
                                </div>

                                <div className="w-full text-center h-full max-h-[250px] justify-center flex flex-col">
                                    <h2 className="text-md lg:text-lg font-semibold tracking-tight first:mt-0 text-center">
                                        Description
                                    </h2>
                                    <p className="text-center text-sm md:text-lg max-w-[800px] self-center">
                                        {project?.description ??
                                            "No description found."}
                                    </p>
                                </div>

                                <div className="w-full flex text-center justify-around items-center">
                                    <div>
                                        <h2 className="text-md lg:text-xl font-semibold tracking-tight first:mt-0 text-center">
                                            Status
                                        </h2>
                                        <p className="text-center text-sm md:text-lg">
                                            {
                                                ProjectStatus[
                                                    //@ts-expect-error ignore this error
                                                    project?.status ??
                                                        "not_started"
                                                ]
                                            }
                                        </p>
                                    </div>
                                    <div className="max-w-[100px] md:max-w-[200px]">
                                        <h2 className=" text-md lg:text-xl font-semibold tracking-tight first:mt-0 text-center">
                                            Attachments
                                        </h2>
                                        <p className="text-center text-sm md:text-lg">
                                            {project?.attachments_link
                                                ?.length == 0
                                                ? "No attachments found."
                                                : project?.attachments_link}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-col items-center pb-8">
                                    <Logo height="100" width="100" />
                                    <h2 className="scroll-m-20 text-xl mt-2 font-semibold tracking-tight first:mt-0 text-center">
                                        Thank you for using Autolance AI!
                                    </h2>
                                    <h2 className="scroll-m-20 text-xl font-semibold tracking-tight first:mt-0 text-center">
                                        One of our team members will be in touch
                                        with you shortly.
                                    </h2>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            className="flex flex-col gap-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                        >
                            {!conversation.isError &&
                                conversation?.chatHistory?.map((message) => (
                                    <div
                                        key={message.message_id}
                                        className={`pt-4 pb-4`}
                                    >
                                        <div className={`flex gap-1`}>
                                            {message.from === "user" ? (
                                                <Avatar className="h-[32px] w-[32px]">
                                                    <AvatarImage
                                                        src="https://github.com/shadcn.png"
                                                        alt="@shadcn"
                                                    />
                                                    <AvatarFallback>
                                                        CN
                                                    </AvatarFallback>
                                                </Avatar>
                                            ) : (
                                                <Logo height="60" width="60" />
                                            )}
                                            <div className="flex flex-col items-center justify-center">
                                                <span className="font-semibold">
                                                    {message.from === "user"
                                                        ? "You"
                                                        : "Autolance AI"}
                                                </span>
                                            </div>
                                        </div>
                                        <div>
                                            <p>{message.message}</p>
                                        </div>
                                    </div>
                                ))}
                        </motion.div>
                    )}
                </div>
            </ScrollShadow>
        </div>
    );
}
