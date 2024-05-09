"use client";

import { User } from "@/lib/validators/user";
import { FC, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { Button } from "../ui/button";
import { SendHorizonalIcon } from "lucide-react";
import { useSendMessageMutation } from "@/hooks/useSendMessageMutation";

interface ChatInputProps {
  chatPartner: User;
  chatId: string;
}

const ChatInput: FC<ChatInputProps> = ({ chatPartner, chatId }) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [input, setInput] = useState<string>("");

  const { mutate, isPending } = useSendMessageMutation({
    chatId,
    onMutate: () => textareaRef.current?.focus(),
    onSuccess: () => setInput(""),
  });

  return (
    <div className="border-accent bg-background border-t">
      <div className="relative flex-1 overflow-hidden">
        <TextareaAutosize
          ref={textareaRef}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              mutate({ text: input, chatId });
            }
          }}
          rows={1}
          maxRows={10}
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
              onClick={() => mutate({ text: input, chatId })}
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
