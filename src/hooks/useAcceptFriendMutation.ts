import { userAPI } from "@/service/api/user";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

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
