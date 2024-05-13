import { userAPI } from "@/service/api/user";
import { useQuery } from "@tanstack/react-query";

/**
 * Custom hook to search for users based on a query.
 *
 * @param query - The search query string.
 * @returns The result of the search query.
 */
export const useSearchUsersQuery = (query: string) => {
  return useQuery({
    queryKey: ["searchUsers", query],
    queryFn: () => userAPI.searchUsers(query),
    enabled: !!query,
  });
};
