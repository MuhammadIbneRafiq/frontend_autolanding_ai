import { Project } from "@/types/Project";

import axios from "axios";
import { useUserSessionStore } from "@/services/state/useUserSessionStore";

export const useProjectActions = () => {
  const user = useUserSessionStore((state) => state.user);

  const createProject = async (
    chatId: string,
  ) => {
    if (!user) {
      throw new Error("User is not authenticated");
    }

    const response = await axios.post(
      `http://localhost:3000/projects/new`,
      {
        chatId: chatId
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );

    return response.data as Project;
  };

  return { createProject };
};
