"use client";
import { ChatContext } from "@/context/ChatContext";
import { Message } from "@/lib/validators/message";
import { User } from "@/lib/validators/user";
import { FC, PropsWithChildren, useState } from "react";

type ChatProviderProps = PropsWithChildren & {
  initialMessages: Message[];
  chatId: string;
  chatPartner: User;
  chatType: "friend" | "gpt";
};

const ChatProvider: FC<ChatProviderProps> = ({
  children,
  chatId,
  initialMessages,
  chatPartner,
  chatType,
}) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isMessagePending, setIsMessagePending] = useState<boolean>(false);

  const addMessage = (message: Message) => {
    setMessages((prev) => [message, ...prev]);
  };

  const removeMessage = (id: string) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
  };

  const updateMessage = (
    id: string,
    updateFn: (prevText: string) => string
  ) => {
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id === id) {
          return {
            ...msg,
            text: updateFn(msg.text),
          };
        }

        return msg;
      })
    );
  };

  return (
    <ChatContext.Provider
      value={{
        chatId,
        messages,
        chatPartner,
        chatType,
        addMessage,
        removeMessage,
        updateMessage,
        isMessagePending,
        setIsMessagePending,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
