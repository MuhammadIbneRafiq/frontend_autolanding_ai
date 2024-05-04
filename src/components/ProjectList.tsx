import { Link, useLocation } from "react-router-dom";

import { Loader } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { ScrollShadow } from "@nextui-org/react";
import { useProjects } from "@/hooks/useProjects";

export const ProjectList = () => {
    const { projects, isLoading, isError } = useProjects();

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
                    projects?.map((project) => (
                        <ScrollShadow
                            orientation="horizontal"
                            key={project.project_id}
                            className={`${
                                path.pathname.split("/")[2] ==
                                project.project_id
                                    ? "bg-muted"
                                    : ""
                            } w-full max-w-[100px] md:max-w-[210px] hover:bg-muted transition-colors pt-2 pb-2 rounded-lg cursor-pointer`}
                        >
                            <Link
                                key={project.project_id}
                                to={`/project/${project.project_id}`}
                                className="h-full rounded-lg text-sm"
                            >
                                <p className="w-[500px] ml-[-1px] pl-3 ">
                                    {project.title}
                                </p>
                            </Link>
                        </ScrollShadow>
                    ))}
            </div>
        </ScrollArea>
    );
};
