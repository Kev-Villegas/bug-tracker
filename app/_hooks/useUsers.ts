import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { User } from "@prisma/client";

const fetchUsers = async (): Promise<User[]> => {
  const response = await axios.get<User[]>("/api/users");
  return response.data;
};

const useUsers = () => {
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime: 15 * 1000, // cache for 15s
    refetchInterval: 15 * 1000, // 15s autorefetch
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    retry: 3,
  });
};

export default useUsers;
