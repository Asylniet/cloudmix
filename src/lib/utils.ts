import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function chatHRefConstructor(userId: string, chatPartnerId: string) {
  const sortedIds = [userId, chatPartnerId].sort();
  return `${sortedIds[0]}--${sortedIds[1]}`;
}

export function convertToPusherKey(key: string) {
  return key.replace(/:/g, "__");
}
