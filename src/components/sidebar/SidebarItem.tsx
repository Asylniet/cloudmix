import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { FC } from "react";
import { Button } from "../ui/button";
import { CommandShortcut } from "../ui/command";

export type SidebarItemProps = LinkSidebarItemProps | ButtonSidebarItemProps;

type BaseSidebarItemProps = {
  name: string;
  Icon: React.ReactNode;
  isLast?: boolean;
  className?: string;
};

type LinkSidebarItemProps = BaseSidebarItemProps & {
  href: string;
};

type ButtonSidebarItemProps = BaseSidebarItemProps & {
  onClick: () => void;
  shortCut?: string;
};

const SidebarItem: FC<SidebarItemProps> = ({
  name,
  Icon,
  isLast,
  className,
  ...props
}) => {
  const Slot = "href" in props ? Link : "div";
  return (
    <Slot
      href={(props as LinkSidebarItemProps).href}
      onClick={(props as ButtonSidebarItemProps).onClick}
      className={cn(
        "flex items-center gap-4 hover:bg-accent px-2 py-3 font-semibold text-sm hover:text-primary leading-6 group cursor-pointer",
        {
          "border-b border-accent": !isLast,
        },
        className
      )}
    >
      {Icon}
      <span className="truncate">{name}</span>
      {"shortCut" in props && (
        <CommandShortcut>{props.shortCut}</CommandShortcut>
      )}
    </Slot>
  );
};

export default SidebarItem;
