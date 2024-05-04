import { Project } from "@/types/Project";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

interface ProjectProps {
    id: string;
}

/*
Makes an api call to the backend and return the list of conversations.
*/
export const useProject = ({ id }: ProjectProps) => {
    const {
        data: project,
        isError,
        isLoading,
        refetch: refetchProject,
    } = useQuery({
        queryKey: ["project", id],
        queryFn: async () => {
            const token = localStorage.getItem("accessToken");

            const response = await axios.get(
                "https://ai-freelance-be.onrender.com/projects/" + id,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log("Response Project: ", response.data);

            return response.data as Project;
        },
        refetchOnWindowFocus: false,
        retry: false,
    });

    return { project, isError, isLoading, refetchProject };
};
