import { getFriendsByUserId } from "@/helpers/getFriendsByUserId";

export const useGetFriendsByUserId = async (userId: string) => {
  const friends = await getFriendsByUserId(userId);
  return friends;
};
