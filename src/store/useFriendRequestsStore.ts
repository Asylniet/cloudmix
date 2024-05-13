import { User } from "@/lib/validators/user";
import { create } from "zustand";

interface FriendRequestsState {
  friendRequests: User[];
  addFriendRequest: (request: User) => void;
  removeFriendRequest: (senderId: string) => void;
  setFriendRequests: (requests: User[]) => void;
}

/**
 * A custom hook for managing friend requests state.
 */
export const useFriendRequestsStore = create<FriendRequestsState>()((set) => ({
  friendRequests: [],

  /**
   * Adds a new friend request to the state.
   * @param request - The friend request to add.
   */
  addFriendRequest: (request) =>
    set((state) => ({ friendRequests: [...state.friendRequests, request] })),

  /**
   * Removes a friend request from the state.
   * @param senderId - The ID of the sender of the friend request to remove.
   */
  removeFriendRequest: (senderId) => {
    set((state) => ({
      friendRequests: state.friendRequests.filter((req) => req.id !== senderId),
    }));
  },

  /**
   * Sets the friend requests state to the provided array of requests.
   * @param requests - The array of friend requests to set.
   */
  setFriendRequests: (requests) => set({ friendRequests: requests }),
}));
