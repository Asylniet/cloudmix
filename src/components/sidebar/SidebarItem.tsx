import Link from "next/link";
import React, { FC } from "react";

export type SidebarItemProps = {
  name: string;
  Icon: React.ReactNode;
  href: string;
};

const SidebarItem: FC<SidebarItemProps> = ({ name, Icon, href }) => {
  return (
    <Link
      href={href}
      className="flex gap-4 hover:bg-accent px-2 py-3 font-semibold text-sm hover:text-primary leading-6 group"
    >
      {Icon}
      <span className="truncate">{name}</span>
    </Link>
  );
};

export default SidebarItem;
