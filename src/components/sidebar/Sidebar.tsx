import { FC } from "react";
import { User } from "@/lib/validators/user";
import SidebarBottomAvatar from "./SidebarBottomAvatar";
import { useGetFriendsByUserId } from "@/hooks/useGetFriendsByUserId";
import SidebarLogo from "./SidebarLogo";
import SidebarTabs from "./SidebarTabs";
import { userAPI } from "@/service/api/user";

type SidebarProps = {
  sessionUser: User;
};

const Sidebar: FC<SidebarProps> = async ({ sessionUser }) => {
  const friends = await useGetFriendsByUserId(sessionUser.id);
  const unseenRequests = await userAPI.getIncomingFriendRequests(
    sessionUser.id
  );
  return (
    <aside className="flex flex-col gap-y-4 bg-background pt-4 border-r w-full max-w-xs h-full overflow-y-auto grow">
      <SidebarLogo />

      <nav className="flex flex-col flex-1">
        <ul role="list" className="h-full">
          <SidebarTabs friends={friends} incomingRequests={unseenRequests} />
          <li className="bottom-0 left-0 sticky flex items-center bg-background mt-auto border w-full">
            <SidebarBottomAvatar />
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
