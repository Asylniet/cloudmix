import { userAPI } from "@/service/api/user";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { z } from "zod";

/**
 * Custom hook for adding a friend.
 *
 * @param setError - A function to set the error message.
 * @param id - The ID of the friend to add.
 * @returns The result of the mutation.
 */
export const useAddFriendMutation = (
  setError: (error: string) => void,
  id: string
) => {
  return useMutation({
    mutationKey: ["addFriend", id],
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
