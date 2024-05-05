import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { FC } from "react";

type DashboardPageProps = {};

const DashboardPage: FC<DashboardPageProps> = async ({}) => {
  const session = await getServerSession(authOptions);
  return <div>Dashboard</div>;
};

export default DashboardPage;
