"use client";

import { pusherClient } from "@/lib/pusherClient";
import { chatHRefConstructor, convertToPusherKey } from "@/lib/utils";
import { Message, MessageNotification } from "@/lib/validators/message";
import { User } from "@/lib/validators/user";
import { usePathname, useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { useSessionContext } from "@/hooks/useSessionContext";
import { usePusherClientSubscribe } from "@/hooks/usePusherClientSubscribe";

type SidebarChatListProps = {
  friends: User[];
};

const SidebarChatList: FC<SidebarChatListProps> = ({ friends }) => {
  const session = useSessionContext();
  const router = useRouter();
  const pathname = usePathname();
  const [unseenMessages, setUnseenMessages] = useState<Message[]>([]);

  // usePusherClientSubscribe({
  //   bindKey: "new_message",
  //   handler: (message: MessageNotification) => {
  //     setUnseenMessages((prev) => [...prev, message]);
  //   },
  //   subscribeKey: convertToPusherKey(`user:${session.user.id}:chats`),
  // });

  usePusherClientSubscribe({
    bindKey: "new_friend",
    handler: () => {
      router.refresh();
    },
    subscribeKey: convertToPusherKey(`user:${session.user.id}:friends`),
  });

  useEffect(() => {
    pusherClient.subscribe(convertToPusherKey(`user:${session.user.id}:chats`));
    pusherClient.subscribe(
      convertToPusherKey(`user:${session.user.id}:friends`)
    );

    const newFriendHandler = () => {
      toast.success("New friend added");
      router.refresh();
    };

    const chatHandler = (message: MessageNotification) => {
      const shouldNotify =
        pathname !==
        `/dashboard/chat/${chatHRefConstructor(
          session.user.id,
          message.senderId
        )}`;

      if (!shouldNotify) return;

      toast(
        <a
          onClick={() => console.log("HELLO")}
          href={`/dashboard/chat/${chatHRefConstructor(
            session.user.id,
            message.senderId
          )}`}
        >
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              <div className="relative w-10 h-10">
                <Image
                  fill
                  referrerPolicy="no-referrer"
                  className="rounded-full"
                  src={message.senderImg}
                  alt={`${message.senderName}'s profile picture`}
                />
              </div>
            </div>

            <div className="flex-1 ml-3">
              <p className="font-medium text-gray-900 text-sm">
                {message.senderName}
              </p>
              <p className="mt-1 text-gray-500 text-sm truncate">
                {message.text}
              </p>
            </div>
          </div>
        </a>
      );
    };

    pusherClient.bind("new_message", chatHandler);
    pusherClient.bind("new_friend", newFriendHandler);

    return () => {
      pusherClient.unsubscribe(
        convertToPusherKey(`user:${session.user.id}:chats`)
      );
      pusherClient.unsubscribe(
        convertToPusherKey(`user:${session.user.id}:friends`)
      );

      pusherClient.unbind("new_message", chatHandler);
      pusherClient.unbind("new_friend", newFriendHandler);
    };
  }, [pathname, router, session.user.id]);

  useEffect(() => {
    if (pathname?.includes("chat")) {
      setUnseenMessages((prev) => {
        return prev.filter((msg) => !pathname.includes(msg.senderId));
      });
    }
  }, [pathname]);

  return (
    <ul role="list" className="space-y1 -mx-2 overflow-y-auto">
      {friends.sort().map((friend) => {
        const unseenMessagesCount = unseenMessages.filter(
          (msg) => msg.senderId === friend.id
        ).length;
        return (
          <li key={friend.id}>
            <a
              href={`/dashboard/chat/${chatHRefConstructor(
                session.user.id,
                friend.id
              )}`}
              className="flex items-center gap-x-3 hover:bg-accent p-2 rounded-md font-semibold text-sm hover:text-primary leading-6 group"
            >
              {friend.name}
              {unseenMessagesCount > 0 ? (
                <div className="flex justify-center items-center bg-primary rounded-full w-4 h-4 font-medium text-primary-foreground text-xs">
                  {unseenMessagesCount}
                </div>
              ) : null}
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default SidebarChatList;
