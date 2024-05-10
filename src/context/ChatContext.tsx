import { Message } from "@/lib/validators/message";
import { User } from "@/lib/validators/user";
import { createContext } from "react";

type ChatContextProps = {
  chatId: string;
  chatPartner: User;
  chatType: "friend" | "gpt";
  messages: Message[];
  addMessage: (message: Message) => void;
  removeMessage: (id: string) => void;
  updateMessage: (id: string, updateFn: (prevText: string) => string) => void;
  isMessagePending: boolean;
  setIsMessagePending: (isPending: boolean) => void;
};

export const ChatContext = createContext<ChatContextProps | undefined>(
  undefined
);
