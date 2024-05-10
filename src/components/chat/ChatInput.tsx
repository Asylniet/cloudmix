"use client";

import { FC, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { Button } from "../ui/button";
import { SendHorizonalIcon } from "lucide-react";
import { useSendMessageMutation } from "@/hooks/useSendMessageMutation";
import { useChatContext } from "@/hooks/useChatContext";
import { nanoid } from "nanoid";
import { useSendGptMessageMutation } from "@/hooks/useSendGptMessageMutation";
import { useSessionContext } from "@/hooks/useSessionContext";

interface ChatInputProps {}

const ChatInput: FC<ChatInputProps> = ({}) => {
  const session = useSessionContext();
  const { chatId, chatPartner, chatType } = useChatContext();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [input, setInput] = useState<string>("");

  const { mutate: sendMessage, isPending: isMessagePending } =
    useSendMessageMutation({
      chatId,
      onMutate: () => textareaRef.current?.focus(),
      onSuccess: () => setInput(""),
    });

  const { mutate: sendGptMessage, isPending: isGptMessagePending } =
    useSendGptMessageMutation({
      user: session.user,
      setInput,
      textareaRef,
    });

  const handleSendMessage = () => {
    const params = { text: input, chatId, id: nanoid() };
    if (chatType === "friend") {
      sendMessage(params);
    } else {
      sendGptMessage(params);
    }
  };

  const isPending =
    chatType === "friend" ? isMessagePending : isGptMessagePending;

  return (
    <div className="border-accent bg-background border-t">
      <div className="relative flex-1 overflow-hidden">
        <TextareaAutosize
          ref={textareaRef}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
          rows={1}
          maxRows={10}
          disabled={chatType === "gpt" && isPending}
          value={input}
          autoFocus
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Message ${chatPartner.name}`}
          className="block border-0 bg-transparent rounded-none w-full placeholder:text-secondary resize-none focus:ring-0 px-2 py-3 text-sm ring-1 ring-accent ring-inset focus-within:ring-2 focus-within:ring-primary pr-12"
        />

        <div className="right-2 bottom-1 absolute flex justify-between">
          <div className="flex-shrink-0">
            <Button
              size="icon"
              isLoading={isPending}
              variant="ghost"
              onClick={() => handleSendMessage()}
              type="submit"
              className="text-secondary"
            >
              <SendHorizonalIcon />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
