import { FC } from "react";
import Logo from "@/components/svg/logo";
import { fetchRedis } from "@/helpers/redis";
import { User } from "@/lib/validators/user";
import FriendRequestSidebarOptions from "@/components/FriendRequestsSidebarOptions";
import { getFriendsByUserId } from "@/helpers/getFriendsByUserId";
import SidebarChatList from "@/components/SidebarChatList";
import SidebarOptions from "./SidebarOptions";
import SidebarBottomAvatar from "./SidebarBottomAvatar";
import { useGetFriendsByUserId } from "@/hooks/useGetFriendsByUserId";
import { useGetUnseenRequests } from "@/hooks/useGetUnseenRequests";
import SidebarItem from "./SidebarItem";

type SidebarProps = {
  sessionUser: User;
};

const Sidebar: FC<SidebarProps> = async ({ sessionUser }) => {
  const friends = await useGetFriendsByUserId(sessionUser.id);
  const unseenRequests = await useGetUnseenRequests(sessionUser.id);
  return (
    <div className="flex flex-col gap-y-5 bg-background pt-2 border-r w-full max-w-xs h-full overflow-y-auto grow">
      <div className="flex items-center gap-2 px-2">
        <Logo />
        <span className="text-xl">
          Cloud
          <span className="text-primary">Mix</span>
        </span>
      </div>

      <nav className="flex flex-col flex-1">
        <ul role="list" className="flex flex-col flex-1 gap-y-7">
          {friends.length > 0 ? (
            <li>
              <div className="px-2 font-semibold text-secondary text-xs leading-6">
                Your Messages
              </div>
            </li>
          ) : null}
          <li>
            <SidebarChatList sessionId={sessionUser.id} friends={friends} />
          </li>
          <li>
            <div className="px-2 font-semibold text-secondary text-xs leading-6">
              Overview
            </div>
            <ul role="list" className="mt-2">
              <SidebarOptions />
              <li>
                <FriendRequestSidebarOptions
                  sessionId={sessionUser.id}
                  initialUnseenRequestCount={unseenRequests.length}
                />
              </li>
            </ul>
          </li>

          <li className="bottom-0 left-0 sticky flex items-center bg-background mt-auto border w-full">
            <SidebarBottomAvatar />
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
