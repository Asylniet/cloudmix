import Logo from "@/components/svg/logo";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PropsWithChildren, ReactNode } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getNameInitials } from "@/helpers/getNameInitials";
import SignoutButton from "@/components/SignoutButton";
import { fetchRedis } from "@/helpers/redis";
import { User } from "@/lib/validators/user";
import FriendRequestSidebarOptions from "@/components/FriendRequestsSidebarOptions";
import { getFriendsByUserId } from "@/helpers/getFriendsByUserId";
import SidebarChatList from "@/components/SidebarChatList";

type LayoutProps = PropsWithChildren & {};

type SidebarOption = {
  id: number;
  name: string;
  href: string;
  Icon: ReactNode;
};

const sidebarOptions: SidebarOption[] = [
  {
    id: 1,
    name: "Add friend",
    href: "/dashboard/add",
    Icon: <PlusIcon />,
  },
];

const Layout = async ({ children }: LayoutProps) => {
  const session = await getServerSession(authOptions);
  if (!session) notFound();

  const friends = await getFriendsByUserId(session.user.id);

  const unseenRequestCount = (
    (await fetchRedis(
      "smembers",
      `user:${session.user.id}:incoming_friend_requests`
    )) as User[]
  ).length;

  return (
    <div className="flex w-full h-screen">
      <div className="flex flex-col gap-y-5 border-accent bg-background px-6 border-r w-full max-w-xs h-full overflow-y-auto grow">
        {friends.length > 0 ? (
          <div className="font-semibold text-accent text-xs leading-6">
            Your Messages
          </div>
        ) : null}

        <nav className="flex flex-col flex-1">
          <ul role="list" className="flex flex-col flex-1 gap-y-7">
            <li>
              <SidebarChatList sessionId={session.user.id} friends={friends} />
            </li>
            <li>
              <div className="font-semibold text-accent text-xs leading-6">
                Overview
              </div>
              <ul role="list" className="space-y-1 -mx-2 mt-2">
                {sidebarOptions.map((option) => (
                  <li key={option.id}>
                    <Link
                      href={option.href}
                      className="flex gap-4 hover:bg-accent p-2 rounded-md font-semibold text-accent text-sm hover:text-primary leading-6 group"
                    >
                      <span className="group-hover:text-primary flex justify-center items-center border-accent group-hover:border-primary bg-background border rounded-lg w-6 h-6 font-medium text-[0.625rem] text-accent shrink-0">
                        {option.Icon}
                      </span>
                      <span className="truncate">{option.name}</span>
                    </Link>
                  </li>
                ))}

                <li>
                  <FriendRequestSidebarOptions
                    sessionId={session.user.id}
                    initialUnseenRequestCount={unseenRequestCount}
                  />
                </li>
              </ul>
            </li>

            <li className="flex items-center -mx-6 mt-auto">
              <div className="flex flex-1 items-center gap-x-4 px-6 py-2 w-fit font-semibold text-sm">
                <Avatar>
                  <AvatarImage
                    src={session.user.image || ""}
                    referrerPolicy="no-referrer"
                  />
                  <AvatarFallback>
                    {getNameInitials(session.user.name)}
                  </AvatarFallback>
                </Avatar>

                <span className="sr-only">Your Profile</span>
                <div className="flex flex-col truncate">
                  {/* TODO: Limit the width of the text to prevent overflow */}
                  <span aria-hidden="true">{session.user.name}</span>
                  <span className="text-accent text-xs" aria-hidden="true">
                    {session.user.email}
                  </span>
                </div>
              </div>
              <SignoutButton className="mr-6" size="icon" />
            </li>
          </ul>
        </nav>
      </div>
      {children}
    </div>
  );
};

export default Layout;
