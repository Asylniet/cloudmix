import { UserPlusIcon } from "lucide-react";
import { FC, ReactNode } from "react";
import SidebarItem from "./SidebarItem";

type SidebarOptionsProps = {};

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
    Icon: <UserPlusIcon />,
  },
];

const SidebarOptions: FC<SidebarOptionsProps> = ({}) => {
  return (
    <>
      {sidebarOptions.map((option) => (
        <li key={option.id}>
          <SidebarItem {...option} />
        </li>
      ))}
    </>
  );
};

export default SidebarOptions;
