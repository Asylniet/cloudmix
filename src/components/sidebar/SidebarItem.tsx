import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { FC } from "react";

export type SidebarItemProps = {
  name: string;
  Icon: React.ReactNode;
  href: string;
  isLast?: boolean;
  className?: string;
};

const SidebarItem: FC<SidebarItemProps> = ({
  name,
  Icon,
  href,
  isLast,
  className,
}) => {
  return (
    <Link
      href={href}
      className={cn(
        "flex gap-4 hover:bg-accent px-2 py-3 font-semibold text-sm hover:text-primary leading-6 group",
        {
          "border-b border-accent": !isLast,
        },
        className
      )}
    >
      {Icon}
      <span className="truncate">{name}</span>
    </Link>
  );
};

export default SidebarItem;
