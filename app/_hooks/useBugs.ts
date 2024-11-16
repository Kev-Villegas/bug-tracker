import axios from "axios";
import { Bug } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

const fetchBugs = async (): Promise<Bug[]> => {
  const response = await axios.get<Bug[]>("/api/bugs");
  return response.data;
};

const useBugs = () => {
  return useQuery<Bug[]>({
    queryKey: ["bugs"],
    queryFn: fetchBugs,
    staleTime: 15 * 1000,
    refetchInterval: 15 * 1000,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    retry: 3,
  });
};

export default useBugs;
