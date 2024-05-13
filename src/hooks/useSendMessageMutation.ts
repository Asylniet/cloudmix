import { messageAPI } from "@/service/api/message";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

type SendMessageMutationParams = {
  chatId: string;
  onMutate: () => void;
  onSuccess: () => void;
};

/**
 * Custom hook for sending a message mutation.
 *
 * @param params - The parameters for the mutation.
 * @returns The result of the mutation.
 */
export const useSendMessageMutation = (params: SendMessageMutationParams) => {
  return useMutation({
    mutationKey: ["sendMessage", params.chatId],
    mutationFn: messageAPI.sendMessage,
    onError: () => {
      toast.error("Something went wrong. Please try again.");
    },
    onMutate: params.onMutate,
    onSuccess: params.onSuccess,
  });
};
