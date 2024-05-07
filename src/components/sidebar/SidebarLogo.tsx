import { FC } from "react";
import Logo from "../svg/logo";

type SidebarLogoProps = {};

const SidebarLogo: FC<SidebarLogoProps> = ({}) => {
  return (
    <div className="flex items-center gap-2 px-2">
      <Logo />
      <span className="text-xl">
        Cloud
        <span className="text-primary">Mix</span>
      </span>
    </div>
  );
};

export default SidebarLogo;
