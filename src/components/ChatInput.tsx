"use client";

import { User } from "@/lib/validators/user";
import axios from "axios";
import { FC, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

interface ChatInputProps {
  chatPartner: User;
  chatId: string;
}

const ChatInput: FC<ChatInputProps> = ({ chatPartner, chatId }) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const { toast } = useToast();

  const sendMessage = async () => {
    if (!input) return;
    setIsLoading(true);

    try {
      await axios.post("/api/message/send", { text: input, chatId });
      setInput("");
      textareaRef.current?.focus();
    } catch {
      toast({
        title: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="border-accent mb-2 sm:mb-0 px-4 pt-4 border-t">
      <div className="relative flex-1 shadow-sm rounded-lg overflow-hidden ring-1 ring-accent ring-inset focus-within:ring-2 focus-within:ring-primary">
        <TextareaAutosize
          ref={textareaRef}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Message ${chatPartner.name}`}
          className="block border-0 bg-transparent sm:py-1.5 w-full placeholder:text-accent sm:text-sm sm:leading-6 resize-none focus:ring-0"
        />

        <div className="right-0 bottom-0 absolute flex justify-between">
          <div className="flex-shrink-0">
            <Button isLoading={isLoading} onClick={sendMessage} type="submit">
              Post
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
