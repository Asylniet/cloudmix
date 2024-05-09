"use client";
import { FC, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import SidebarChatList from "./SidebarChatList";
import SidebarFriendRequests from "./SidebarFriendRequests";
import { User } from "@/lib/validators/user";
import { useFriendRequestsStore } from "@/store/useFriendRequestsStore";
import SidebarItem from "./SidebarItem";
import { useSearchUsersDialogStore } from "@/store/useSearchUsersDialog";
import { UserPlusIcon } from "lucide-react";
import { usePusherClientSubscribe } from "@/hooks/usePusherClientSubscribe";
import { toast } from "sonner";
import { useSessionContext } from "@/hooks/useSessionContext";

type SidebarTabsProps = {
  incomingRequests: User[];
  friends: User[];
};

const SidebarTabs: FC<SidebarTabsProps> = ({ friends, incomingRequests }) => {
  const { setFriendRequests, friendRequests, addFriendRequest } =
    useFriendRequestsStore();
  const { setIsOpen } = useSearchUsersDialogStore();
  const session = useSessionContext();
  useEffect(() => {
    setFriendRequests(incomingRequests);
  }, [incomingRequests, setFriendRequests]);

  usePusherClientSubscribe({
    bindKey: "incoming_friend_requests",
    handler: (friend: User) => {
      addFriendRequest(friend);
      toast.info("New friend request");
    },
    subscribeKey: `user:${session.user.id}:incoming_friend_requests`,
  });

  return (
    <Tabs defaultValue="messages" className="w-full h-full">
      <TabsList className="-top-4 left-0 sticky rounded-none w-full">
        <TabsTrigger value="messages" className="flex-1">
          Messages
        </TabsTrigger>
        <TabsTrigger value="friends" className="flex-1">
          Friends
          {friendRequests.length > 0 && ` (${friendRequests.length})`}
        </TabsTrigger>
      </TabsList>
      <TabsContent value="messages" className="h-full">
        <li>
          <SidebarChatList friends={friends} />
        </li>
      </TabsContent>
      <TabsContent value="friends">
        <ul role="list" className="flex flex-col flex-1">
          <li>
            <SidebarItem
              name="Add friend"
              Icon={<UserPlusIcon />}
              onClick={() => setIsOpen(true)}
              shortCut="⌘K"
            />
          </li>
          <li className="mt-6">
            <div className="px-2 font-semibold text-secondary text-xs leading-6">
              New Friend Requests
              {friendRequests.length > 0 && ` (${friendRequests.length})`}
            </div>
          </li>
          <li>
            <SidebarFriendRequests />
          </li>
        </ul>
      </TabsContent>
    </Tabs>
  );
};

export default SidebarTabs;
