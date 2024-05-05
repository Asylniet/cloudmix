"use client";

import { chatHRefConstructor } from "@/lib/utils";
import { Message } from "@/lib/validators/message";
import { User } from "@/lib/validators/user";
import { usePathname, useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";

type SidebarChatListProps = {
  friends: User[];
  sessionId: string;
};

const SidebarChatList: FC<SidebarChatListProps> = ({ friends, sessionId }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [unseenMessages, setUnseenMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (pathname?.includes("chat")) {
      setUnseenMessages((prev) => {
        return prev.filter((msg) => !pathname.includes(msg.senderId));
      });
    }
  }, [pathname]);

  return (
    <ul role="list" className="space-y1 -mx-2 max-h-[25rem] overflow-y-auto">
      {friends.sort().map((friend) => {
        const unseenMessagesCount = unseenMessages.filter(
          (msg) => msg.senderId === friend.id
        ).length;
        return (
          <li key={friend.id}>
            <a
              href={`/dashboard/chat/${chatHRefConstructor(
                sessionId,
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
