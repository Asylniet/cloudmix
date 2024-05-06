import { GPTMessage } from "@/lib/validators/gptMessage";
import { ReactNode, createContext, useState } from "react";

export const GPTMessageContext = createContext<{
  messages: GPTMessage[];
  addMessage: (message: GPTMessage) => void;
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

export function GPTMessagesProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<GPTMessage[]>([
    {
      id: "1",
      isUserMessage: false,
      text: "Hello! How can I help you today?",
    },
  ]);
  const [isMessagePending, setIsMessagePending] = useState<boolean>(false);

  const addMessage = (message: GPTMessage) => {
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
    <GPTMessageContext.Provider
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
    </GPTMessageContext.Provider>
  );
}
