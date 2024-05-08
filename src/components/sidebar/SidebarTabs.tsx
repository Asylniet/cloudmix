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

type SidebarTabsProps = {
  incomingRequests: User[];
  friends: User[];
};

const SidebarTabs: FC<SidebarTabsProps> = ({ friends, incomingRequests }) => {
  const { setFriendRequests, friendRequests } = useFriendRequestsStore();
  const { setIsOpen } = useSearchUsersDialogStore();
  useEffect(() => {
    setFriendRequests(incomingRequests);
  }, [incomingRequests, setFriendRequests]);
  return (
    <Tabs defaultValue="messages" className="w-full h-full">
      <TabsList className="-top-4 left-0 sticky rounded-none w-full">
        <TabsTrigger value="messages" className="flex-1">
          Messages
        </TabsTrigger>
        <TabsTrigger value="friends" className="flex-1">
          Friends
          {friendRequests.length > 0 && ` (${incomingRequests.length})`}
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
              {friendRequests.length > 0 && ` (${incomingRequests.length})`}
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
