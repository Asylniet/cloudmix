import { create } from "zustand";

interface SearchUsersDialogState {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  invert: () => void;
}

export const useSearchUsersDialogStore = create<SearchUsersDialogState>()(
  (set) => ({
    isOpen: false,
    setIsOpen: (open) => set({ isOpen: open }),
    invert: () => set((state) => ({ isOpen: !state.isOpen })),
  })
);
