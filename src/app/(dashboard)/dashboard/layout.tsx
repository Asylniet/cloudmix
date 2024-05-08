import { notFound } from "next/navigation";
import { PropsWithChildren } from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import SessionProvider from "@/components/SessionProvider";
import SearchUsersDialog from "@/components/SearchUsersDialog";

type LayoutProps = PropsWithChildren & {};

const Layout = async ({ children }: LayoutProps) => {
  const session = await getServerSession(authOptions);
  if (!session) notFound();

  return (
    <SessionProvider session={session}>
      <div className="flex w-full h-screen">
        <SearchUsersDialog />
        <Sidebar sessionUser={session.user} />
        {children}
      </div>
    </SessionProvider>
  );
};

export default Layout;
