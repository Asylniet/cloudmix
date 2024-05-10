import { userAPI } from "@/service/api/user";
import { notFound } from "next/navigation";

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
