"use client";

import { cn, convertToPusherKey } from "@/lib/utils";
import { Message } from "@/lib/validators/message";
import { FC, useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { getNameInitials } from "@/helpers/getNameInitials";
import { User } from "@/lib/validators/user";
import { pusherClient } from "@/lib/pusherClient";
import { IncomingFriendRequest } from "@/lib/validators/incomingRequest";

type MessagesProps = {
  initialMessages: Message[];
  chatId: string;
  sessionId: string;
  chatPartner: User;
  sessionImg: string;
  sessionName: string;
};

const Messages: FC<MessagesProps> = ({
  initialMessages,
  chatId,
  sessionId,
  sessionImg,
  chatPartner,
  sessionName,
}) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const scrollDownRef = useRef<HTMLDivElement>(null);
  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("ru-ru", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  useEffect(() => {
    pusherClient.subscribe(convertToPusherKey(`chat:${chatId}`));

    const messageHandler = (message: Message) => {
      setMessages((prev) => {
        return [message, ...prev];
      });
    };

    pusherClient.bind("incoming_message", messageHandler);

    return () => {
      pusherClient.unsubscribe(convertToPusherKey(`chat:${chatId}`));
      pusherClient.unbind("incoming_message", messageHandler);
    };
  }, [sessionId, chatId]);

  return (
    <div className="flex flex-col-reverse flex-1 gap-2 scrollbar-thumb-blue p-3 scrollbar-thumb-rounded scrollbar-w-2 h-full overflow-y-auto scrollbar-track-blue-lighter scrolling-touch">
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
                  <span
                    className="ml-2 text-foreground text-xs"
                    suppressHydrationWarning
                  >
                    {formatTimestamp(message.timestamp)}
                  </span>
                </span>
              </div>
              <Avatar
                className={cn("relative w-6 h-6", {
                  "order-2": isCurrentUser,
                  "order-1": !isCurrentUser,
                  invisible: hasNextMessageFromSameUser,
                })}
              >
                <AvatarImage
                  src={isCurrentUser ? sessionImg : chatPartner.image || ""}
                  referrerPolicy="no-referrer"
                />
                <AvatarFallback>
                  {getNameInitials(
                    isCurrentUser ? sessionName : chatPartner.name
                  )}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Messages;
