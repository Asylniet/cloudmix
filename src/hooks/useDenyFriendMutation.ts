import { userAPI } from "@/service/api/user";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

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
