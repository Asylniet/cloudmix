import { useMutation } from "@tanstack/react-query";
import { useChatContext } from "./useChatContext";
import { messageAPI } from "@/service/api/message";
import { Message, SendMessage } from "@/lib/validators/message";
import { nanoid } from "nanoid";
import { User } from "@/lib/validators/user";
import { chatbot } from "@/helpers/constants/chatbot";
import { toast } from "sonner";

type UseSendGptMessageMutationProps = {
  user: User;
  setInput: (value: string) => void;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
};

/**
 * Custom hook for sending GPT messages.
 *
 * @param {UseSendGptMessageMutationProps} options - The options for the mutation.
 * @returns {MutationResult} - The result of the mutation.
 */
export const useSendGptMessageMutation = ({
  user,
  setInput,
  textareaRef,
}: UseSendGptMessageMutationProps) => {
  const { addMessage, removeMessage, updateMessage, setIsMessagePending } =
    useChatContext();
  return useMutation({
    mutationKey: ["sendMessage"],
    mutationFn: messageAPI.sendGptMessage,
    onMutate: (message: SendMessage) => {
      const _message: Message = {
        id: nanoid(),
        senderId: user.id,
        receiverId: chatbot.id,
        text: message.text,
        timestamp: Date.now(),
      };
      addMessage(_message);
    },
    onSuccess: async (stream) => {
      if (!stream) throw new Error("Stream not initialized");

      const id = nanoid();
      const responseMessage: Message = {
        id,
        receiverId: user.id,
        senderId: chatbot.id,
        text: "",
        timestamp: Date.now(),
      };

      addMessage(responseMessage);
      setIsMessagePending(true);

      const reader = stream.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        updateMessage(id, (prev) => prev + chunkValue);
      }

      setIsMessagePending(false);
      setInput("");

      setTimeout(() => {
        textareaRef.current?.focus();
      }, 10);
    },
    onError: (_, message) => {
      toast.error("Something went wrong");
      setInput(message.text);
      removeMessage(message.id);
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 10);
    },
  });
};
