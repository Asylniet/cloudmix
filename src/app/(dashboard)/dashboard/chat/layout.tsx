import { notFound } from "next/navigation";
import { PropsWithChildren } from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
type LayoutProps = PropsWithChildren & {};

const Layout = async ({ children }: LayoutProps) => {
  const session = await getServerSession(authOptions);
  if (!session) notFound();

  return (
    <>
      <Sidebar className="sm:flex hidden" sessionUser={session.user} />
      {children}
    </>
  );
};

export default Layout;
