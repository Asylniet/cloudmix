import SessionProvider from "@/components/SessionProvider";
import SearchUsersDialog from "@/components/searchUsers/SearchUsersDialog";
import Sidebar from "@/components/sidebar/Sidebar";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { FC } from "react";

type DashboardPageProps = {};

const DashboardPage: FC<DashboardPageProps> = async ({}) => {
  const session = await getServerSession(authOptions);
  if (!session) notFound();

  return (
    <SessionProvider session={session}>
      <div className="flex w-full h-screen">
        <SearchUsersDialog />
        <Sidebar sessionUser={session.user} />
        <section className="sm:block hidden">Dashboard</section>
      </div>
    </SessionProvider>
  );
};

export default DashboardPage;
