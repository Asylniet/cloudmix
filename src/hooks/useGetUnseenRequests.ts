import { fetchRedis } from "@/helpers/redis";
import { User } from "@/lib/validators/user";

export const useGetUnseenRequests = async (userId: string) => {
  const unseenRequests = (await fetchRedis(
    "smembers",
    `user:${userId}:incoming_friend_requests`
  )) as string[];

  unseenRequests.map((request) => {
    return JSON.parse(request) as User;
  });

  return unseenRequests;
};
