import { ChatContext } from "@/context/ChatContext";
import { useContext } from "react";

/**
 * Custom hook that provides access to the chat context.
 * @returns The chat context object.
 * @throws {Error} If used outside of a ChatProvider.
 */
export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }

  return context;
};
