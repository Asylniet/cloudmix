import { userAPI } from "@/service/api/user";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

/**
 * Custom hook for accepting a friend request.
 *
 * @param removeFriendRequest - A function to remove the friend request from the UI.
 * @returns An object containing the mutation function and its related properties.
 */
export const useAcceptFriendMutation = (
  removeFriendRequest: (id: string) => void
) => {
  return useMutation({
    mutationKey: ["acceptFriend"],
    mutationFn: userAPI.acceptFriend,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (id) => {
      toast.success("Friend request accepted");
      removeFriendRequest(id);
    },
  });
};
