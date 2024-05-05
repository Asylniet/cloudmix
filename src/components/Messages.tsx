"use client";

import { cn } from "@/lib/utils";
import { Message } from "@/lib/validators/message";
import { FC, useRef, useState } from "react";

type MessagesProps = {
  initialMessages: Message[];
  sessionId: string;
};

const Messages: FC<MessagesProps> = ({ initialMessages, sessionId }) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const scrollDownRef = useRef<HTMLDivElement>(null);
  return (
    <div className="flex flex-col-reverse flex-1 gap-4 scrollbar-thumb-blue p-3 scrollbar-thumb-rounded scrollbar-w-2 h-full overflow-y-auto scrollbar-track-blue-lighter scrolling-touch">
      <div ref={scrollDownRef} />
      {messages.map((message, index) => {
        const isCurrentUser = message.senderId === sessionId;
        const hasNextMessageFromSameUser =
          messages[index - 1]?.senderId === message.senderId;

        return (
          <div key={`${message.id}-${message.timestamp}`}>
            <div
              className={cn("flex items-end", {
                "justify-end": isCurrentUser,
              })}
            >
              <div
                className={cn(
                  "fkex flex-col space-y-2 text-base max-w-xs mx-2",
                  {
                    "order-1 items-end": isCurrentUser,
                    "order-2 items-start": !isCurrentUser,
                  }
                )}
              >
                <span
                  className={cn("px-4 py-2 rounded-lg inline-block", {
                    "bg-primary text-primary-foreground": isCurrentUser,
                    "bg-accent text-accent-foreground": !isCurrentUser,
                    "rounded-br-none":
                      hasNextMessageFromSameUser && isCurrentUser,
                    "rounded-bl-none":
                      hasNextMessageFromSameUser && !isCurrentUser,
                  })}
                >
                  {message.text}{" "}
                  <span className="ml-2 text-accent text-xs">
                    {message.timestamp}
                  </span>
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Messages;
