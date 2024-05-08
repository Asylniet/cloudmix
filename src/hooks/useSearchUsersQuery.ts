import { userAPI } from "@/service/api/user";
import { useQuery } from "@tanstack/react-query";

export const useSearchUsersQuery = (query: string) => {
  return useQuery({
    queryKey: ["searchUsers", query],
    queryFn: () => userAPI.searchUsers(query),
    enabled: !!query,
  });
};
