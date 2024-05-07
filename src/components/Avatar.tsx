import { FC } from "react";
import {
  AvatarFallback,
  AvatarImage,
  Avatar as AvatarWrapper,
} from "./ui/avatar";
import { getNameInitials } from "@/helpers/getNameInitials";

type AvatarProps = {
  image?: string;
  name: string;
  className?: string;
};

const Avatar: FC<AvatarProps> = ({ image, name, className }) => {
  return (
    <AvatarWrapper className={className}>
      <AvatarImage src={image || ""} referrerPolicy="no-referrer" />
      <AvatarFallback>{getNameInitials(name)}</AvatarFallback>
    </AvatarWrapper>
  );
};

export default Avatar;
