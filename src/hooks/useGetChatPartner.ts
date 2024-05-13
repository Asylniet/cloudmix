import { userAPI } from "@/service/api/user";
import { notFound } from "next/navigation";

/**
 * Retrieves the chat partner for a given chat ID and current user ID.
 * @param chatId - The ID of the chat.
 * @param currentUserId - The ID of the current user.
 * @returns A Promise that resolves to the chat partner.
 * @throws If the current user is not a participant in the chat.
 */
export const useGetChatPartner = async (
  chatId: string,
  currentUserId: string
) => {
  const [userId1, userId2] = chatId.split("--");
  if (![userId1, userId2].includes(currentUserId)) notFound();

  const chatPartnerId = userId1 === currentUserId ? userId2 : userId1;
  const chatPartner = await userAPI.getUser(chatPartnerId);
  return chatPartner;
};
