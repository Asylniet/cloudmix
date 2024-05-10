"use client";

import { pusherClient } from "@/lib/pusherClient";
import { chatHRefConstructor, cn, convertToPusherKey } from "@/lib/utils";
import { Message, MessageNotification } from "@/lib/validators/message";
import { User } from "@/lib/validators/user";
import { usePathname, useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { useSessionContext } from "@/hooks/useSessionContext";
import { usePusherClientSubscribe } from "@/hooks/usePusherClientSubscribe";
import Avatar from "../Avatar";
import SidebarItem from "./SidebarItem";

type SidebarChatListProps = {
  friends: User[];
};

const SidebarChatList: FC<SidebarChatListProps> = ({ friends }) => {
  const session = useSessionContext();
  const router = useRouter();
  const pathname = usePathname();
  const [unseenMessages, setUnseenMessages] = useState<Message[]>([]);

  usePusherClientSubscribe({
    bindKey: "new_message",
    handler: (message: MessageNotification) => {
      const shouldNotify =
        pathname !==
        `/dashboard/chat/${chatHRefConstructor(
          session.user.id,
          message.senderId
        )}`;

      if (!shouldNotify) return;

      toast(
        <a
          href={`/dashboard/chat/${chatHRefConstructor(
            session.user.id,
            message.senderId
          )}`}
        >
          <div className="flex items-start">
            <Avatar
              name={message.senderName}
              image={message.senderImg}
              className="w-8 h-8"
            />
            <div className="flex-1 ml-3">
              <p className="font-medium text-gray-900 text-sm">
                {message.senderName}
              </p>
              <p
                className="mt-1 text-gray-500 text-sm truncate"
                suppressHydrationWarning
              >
                {message.text}
              </p>
            </div>
          </div>
        </a>
      );
    },
    subscribeKey: convertToPusherKey(`user:${session.user.id}:chats`),
  });

  usePusherClientSubscribe({
    bindKey: "new_friend",
    handler: () => {
      toast.success("You have a new friend!");
    },
    subscribeKey: convertToPusherKey(`user:${session.user.id}:friends`),
  });

  useEffect(() => {
    if (pathname?.includes("chat")) {
      setUnseenMessages((prev) => {
        return prev.filter((msg) => !pathname.includes(msg.senderId));
      });
    }
  }, [pathname]);

  return (
    <ul role="list" className="overflow-y-auto">
      <li>
        <SidebarItem
          href="/dashboard/chat/gpt"
          className={cn({
            "bg-accent": pathname?.includes("gpt"),
            "hover:bg-accent": !pathname?.includes("gpt"),
          })}
        >
          <>
            <Avatar name="GPT-3 " image="/gpt-3.jpg" className="w-8 h-8" />
            <div>
              <span className="truncate">GPT-3</span>
            </div>
          </>
        </SidebarItem>
      </li>
      {friends.sort().map((friend) => {
        const unseenMessagesCount = unseenMessages.filter(
          (msg) => msg.senderId === friend.id
        ).length;
        const isActive = pathname?.includes(friend.id);
        return (
          <li key={friend.id}>
            <SidebarItem
              href={`/dashboard/chat/${chatHRefConstructor(
                session.user.id,
                friend.id
              )}`}
              className={cn("justify-start gap-2", {
                "bg-accent": isActive,
                "hover:bg-accent": !isActive,
              })}
            >
              <Avatar
                className="w-8 h-8"
                image={friend.image}
                name={friend.name}
              />
              <div>
                <div className="flex justify-between item-center">
                  <span className="truncate">{friend.name}</span>
                  <span
                    className="text-secondary text-xs leading-loose"
                    suppressHydrationWarning
                  >
                    {new Date().toLocaleTimeString("ru-RU", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <p className="line-clamp-2 w-full text-secondary text-xs">
                  Something and so on Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Placeat quisquam accusamus illo animi
                  quaerat atque at ipsum quo nemo deserunt!
                </p>
              </div>
              <div>
                {unseenMessagesCount > 0 ? (
                  <div className="flex justify-center items-center bg-primary rounded-full w-4 h-4 font-medium text-primary-foreground text-xs">
                    {unseenMessagesCount}
                  </div>
                ) : null}
              </div>
            </SidebarItem>
          </li>
        );
      })}
    </ul>
  );
};

export default SidebarChatList;
