import { cn, formatTimestamp } from "@/lib/utils";
import { Message as MessageType } from "@/lib/validators/message";
import { User } from "@/lib/validators/user";
import { FC } from "react";
import Avatar from "../Avatar";
import { useSessionContext } from "@/hooks/useSessionContext";

type MessageProps = {
  message: MessageType;
  hasNextMessageFromSameUser?: boolean;
  hasPreviousMessageFromSameUser?: boolean;
  chatPartner: User;
};

const Message: FC<MessageProps> = ({
  message,
  hasNextMessageFromSameUser,
  hasPreviousMessageFromSameUser,
  chatPartner,
}) => {
  const session = useSessionContext();
  const isCurrentUser = message.senderId === session.user.id;
  return (
    <div
      className={cn("flex items-end", {
        "justify-end": isCurrentUser,
      })}
    >
      <div
        className={cn("flex flex-col max-w-[45%] mx-2", {
          "order-1 items-end": isCurrentUser,
          "order-2 items-start": !isCurrentUser,
        })}
      >
        <span
          className={cn(
            "px-4 py-2 rounded-lg flex flex-wrap items-end justify-end",
            {
              "bg-primary text-primary-foreground": isCurrentUser,
              "bg-background text-background-foreground": !isCurrentUser,
              "rounded-br-none": hasNextMessageFromSameUser && isCurrentUser,
              "rounded-bl-none": hasNextMessageFromSameUser && !isCurrentUser,
              "rounded-tr-none":
                hasPreviousMessageFromSameUser && isCurrentUser,
              "rounded-tl-none":
                hasPreviousMessageFromSameUser && !isCurrentUser,
            }
          )}
        >
          {message.text}{" "}
          <span className="ml-2 text-xs" suppressHydrationWarning>
            {formatTimestamp(message.timestamp)}
          </span>
        </span>
      </div>
      <Avatar
        image={
          hasNextMessageFromSameUser
            ? ""
            : isCurrentUser
            ? session.user.image
            : chatPartner.image || ""
        }
        name={isCurrentUser ? session.user.name : chatPartner.name}
        className={cn("relative w-6 h-6", {
          "order-2": isCurrentUser,
          "order-1": !isCurrentUser,
          invisible: hasNextMessageFromSameUser,
        })}
      />
    </div>
  );
};

export default Message;
