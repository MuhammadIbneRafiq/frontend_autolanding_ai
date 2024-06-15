import { Project } from "@/types/Project";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

/*
Makes an api call to the backend and return the list of chats.
*/
export const useProjects = () => {
  const {
    data: projects,
    isError,
    isLoading,
    refetch: refetchProjectsList,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const token = localStorage.getItem("accessToken");

      const response = await axios.get(
        "https://backend-autolanding-ai.vercel.app/projects",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);

      return response.data as Project[];
    },
    refetchOnWindowFocus: false,
    retry: false,
  });

  return { projects, isError, isLoading, refetchProjectsList };
};
