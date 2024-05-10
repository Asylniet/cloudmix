"use client";

import { Message as MessageType } from "@/lib/validators/message";
import { FC, useRef } from "react";
import Message from "./Message";
import { usePusherClientSubscribe } from "@/hooks/usePusherClientSubscribe";
import { useChatContext } from "@/hooks/useChatContext";

type MessagesProps = {};

const Messages: FC<MessagesProps> = ({}) => {
  const { messages, addMessage, chatId, chatPartner } = useChatContext();
  const scrollDownRef = useRef<HTMLDivElement>(null);

  usePusherClientSubscribe({
    subscribeKey: `chat:${chatId}`,
    bindKey: "incoming_message",
    handler: (message: MessageType) => addMessage(message),
  });

  return (
    <div className="flex flex-col-reverse flex-1 gap-y-0.5 scrollbar-thumb-blue p-3 scrollbar-thumb-rounded scrollbar-w-2 h-full overflow-y-auto scrollbar-track-blue-lighter scrolling-touch">
      <div ref={scrollDownRef} />
      {messages.map((message, index) => {
        const hasNextMessageFromSameUser =
          messages[index - 1]?.senderId === message.senderId;
        const hasPreviousMessageFromSameUser =
          messages[index + 1]?.senderId === message.senderId;

        return (
          <Message
            key={`${message.id}-${message.timestamp}`}
            message={message}
            chatPartner={chatPartner}
            hasNextMessageFromSameUser={hasNextMessageFromSameUser}
            hasPreviousMessageFromSameUser={hasPreviousMessageFromSameUser}
          />
        );
      })}
    </div>
  );
};

export default Messages;
