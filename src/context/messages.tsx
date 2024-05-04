import { Message } from "@/lib/validators/message";
import { ReactNode, createContext, useState } from "react";

export const MessageContext = createContext<{
  messages: Message[];
  addMessage: (message: Message) => void;
  removeMessage: (id: string) => void;
  updateMessage: (id: string, updateFn: (prevText: string) => string) => void;
  isMessagePending: boolean;
  setIsMessagePending: (isPending: boolean) => void;
}>({
  messages: [],
  addMessage: () => {},
  removeMessage: () => {},
  updateMessage: () => {},
  isMessagePending: false,
  setIsMessagePending: () => {},
});

export function MessagesProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      isUserMessage: false,
      text: "Hello! How can I help you today?",
    },
  ]);
  const [isMessagePending, setIsMessagePending] = useState<boolean>(false);

  const addMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
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
    <MessageContext.Provider
      value={{
        messages,
        addMessage,
        removeMessage,
        updateMessage,
        isMessagePending,
        setIsMessagePending,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
}
