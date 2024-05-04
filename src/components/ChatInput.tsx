"use client";

import { cn } from "@/lib/utils";
import React, { FC, HTMLAttributes, useContext, useState } from "react";
import TextareaAutoSize from "./TextareaAutoSize";
import { useMutation } from "@tanstack/react-query";
import { Message } from "@/lib/validators/message";
import { MessageContext } from "@/context/messages";
import { CornerDownLeftIcon, Loader2Icon } from "lucide-react";

type ChatInputProps = HTMLAttributes<HTMLDivElement>;

const ChatInput: FC<ChatInputProps> = ({ className, ...props }) => {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const [input, setInput] = useState<string>("");
  const { addMessage, removeMessage, updateMessage, setIsMessagePending } =
    useContext(MessageContext);

  const { mutate: sendMessage, isPending } = useMutation({
    mutationKey: ["sendMessage"],
    mutationFn: async (message: Message) => {
      const response = await fetch("/api/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [message] }),
      });

      if (!response.ok) throw new Error("Failed to send message");

      return response.body;
    },
    onMutate: (message: Message) => {
      addMessage(message);
    },
    onSuccess: async (stream) => {
      if (!stream) throw new Error("Stream not initialized");

      const id = Date.now().toString();
      const responseMessage: Message = {
        id,
        isUserMessage: false,
        text: "",
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
      setInput(message.text);
      removeMessage(message.id);
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 10);
    },
  });

  return (
    <div {...props} className={cn("border", className)}>
      <div className="relative flex-1 mt-4 border-none rounded-lg overflow-hidden outline-none">
        <TextareaAutoSize
          ref={textareaRef}
          rows={2}
          maxRows={4}
          disabled={isPending}
          value={input}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              const message: Message = {
                id: Date.now().toString(),
                isUserMessage: true,
                text: input,
              };
              sendMessage(message);
              setInput("");
            }
          }}
          onChange={(e) => setInput(e.target.value)}
          autoFocus
          placeholder="Type"
          className="m-4"
        />

        <div className="right-0 absolute inset-y-0 flex py-1.5 pr-1.5">
          <kbd className="inline-flex items-center border-gray-200 bg-white px-1 border rounded font-sans text-gray-400 text-xs">
            {isPending ? (
              <Loader2Icon className="w-3 h-3 animate-spin" />
            ) : (
              <CornerDownLeftIcon className="w-3 h-3" />
            )}
          </kbd>
        </div>
        <div
          className="bottom-0 absolute inset-x-0 border-gray-300 peer-focus:border-indigo-600 border-t peer-focus:border-t-2"
          aria-hidden="true"
        />
      </div>
    </div>
  );
};

export default ChatInput;
