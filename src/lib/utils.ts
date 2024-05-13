import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class names into a single string.
 *
 * @param inputs - The class names to be combined.
 * @returns The combined class names as a string.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Constructs a chat href based on the user ID and chat partner ID.
 * The chat href is a string that represents the chat between the user and the chat partner.
 * It is constructed by sorting the IDs in ascending order and concatenating them with "--" in between.
 *
 * @param userId - The ID of the user.
 * @param chatPartnerId - The ID of the chat partner.
 * @returns The constructed chat href.
 */
export function chatHRefConstructor(
  userId: string,
  chatPartnerId: string
): string {
  const sortedIds = [userId, chatPartnerId].sort();
  return `${sortedIds[0]}--${sortedIds[1]}`;
}

/**
 * Converts a string to a Pusher key by replacing all occurrences of ":" with "__".
 * @param key - The string to be converted.
 * @returns The converted Pusher key.
 */
export function convertToPusherKey(key: string): string {
  return key.replace(/:/g, "__");
}

/**
 * Formats a timestamp into a string representation of the time.
 * @param timestamp - The timestamp to format.
 * @returns A string representation of the formatted time.
 */
export function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleTimeString("ru-ru", {
    hour: "2-digit",
    minute: "2-digit",
  });
}
