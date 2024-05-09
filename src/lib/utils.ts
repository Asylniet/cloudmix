import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function chatHRefConstructor(
  userId: string,
  chatPartnerId: string
): string {
  const sortedIds = [userId, chatPartnerId].sort();
  return `${sortedIds[0]}--${sortedIds[1]}`;
}

export function convertToPusherKey(key: string): string {
  return key.replace(/:/g, "__");
}

export function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleTimeString("ru-ru", {
    hour: "2-digit",
    minute: "2-digit",
  });
}
