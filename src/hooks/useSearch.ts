import axios from "axios";
import { useState } from "react";

interface ResultItemProps {
  id: number;
  name: string;
  tweet: string;
  profile: string;
  url: string;
}

export const useSearch = () => {
  const [searchResults, setSearchResults] = useState<ResultItemProps[]>([]);
  const search = async (query: string) => {
    const response = await axios.post(
      `https://backend-autolanding-ai.vercel.app/search`,
      {
        sender: "assistant",
        query: query,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        timeout: 30000, // 30 seconds
      }
    );

    const responseMessage = response.data as ResultItemProps[];
    setSearchResults(responseMessage);
    return responseMessage;
  };

  return {
    search,
    searchResults,
  };
};
