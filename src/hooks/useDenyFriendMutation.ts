import { userAPI } from "@/service/api/user";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

/**
 * Custom hook for denying a friend request.
 *
 * @param removeFriendRequest - A function to remove the friend request from the UI.
 * @returns An object containing the mutation function and its associated properties.
 */
export const useDenyFriendMutation = (
  removeFriendRequest: (id: string) => void
) => {
  return useMutation({
    mutationKey: ["denyFriend"],
    mutationFn: userAPI.denyFriend,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (id) => {
      toast.info("Friend request denied");
      removeFriendRequest(id);
    },
  });
};
