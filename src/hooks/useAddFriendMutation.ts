import { userAPI } from "@/service/api/user";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { z } from "zod";

export const useAddFriendMutation = (setError: (error: string) => void) => {
  return useMutation({
    mutationKey: ["addFriend"],
    mutationFn: userAPI.addFriend,
    onError: (error) => {
      toast.error("Something went wrong");
      if (error instanceof z.ZodError) {
        setError(error.message);
        return;
      }
      if (error instanceof AxiosError) {
        setError(error.response?.data);
        return;
      }

      setError("Something went wrong");
    },
    onSuccess: () => {
      toast.success("Friend request sent");
    },
  });
};
