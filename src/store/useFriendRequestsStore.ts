import { IncomingFriendRequest } from "@/lib/validators/incomingRequest";
import { User } from "@/lib/validators/user";
import { create } from "zustand";

interface FriendRequestsState {
  friendRequests: User[];
  addFriendRequest: (request: User) => void;
  removeFriendRequest: (senderId: string) => void;
  setFriendRequests: (requests: User[]) => void;
}

export const useFriendRequestsStore = create<FriendRequestsState>()((set) => ({
  friendRequests: [],
  addFriendRequest: (request) =>
    set((state) => ({ friendRequests: [...state.friendRequests, request] })),
  removeFriendRequest: (senderId) =>
    set((state) => ({
      friendRequests: state.friendRequests.filter((req) => req.id !== senderId),
    })),
  setFriendRequests: (requests) => set({ friendRequests: requests }),
}));
