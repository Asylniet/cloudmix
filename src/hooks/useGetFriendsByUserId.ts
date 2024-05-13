import { getFriendsByUserId } from "@/helpers/getFriendsByUserId";

/**
 * Retrieves the friends of a user by their user ID.
 *
 * @param userId - The ID of the user.
 * @returns A Promise that resolves to an array of friends.
 */
export const useGetFriendsByUserId = async (userId: string) => {
  const friends = await getFriendsByUserId(userId);
  return friends;
};
