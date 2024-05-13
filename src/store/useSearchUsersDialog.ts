import { create } from "zustand";

interface SearchUsersDialogState {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  invert: () => void;
}

/**
 * Custom hook for managing the state of the search users dialog.
 */
export const useSearchUsersDialogStore = create<SearchUsersDialogState>()(
  (set) => ({
    /**
     * Indicates whether the search users dialog is open or not.
     */
    isOpen: false,

    /**
     * Sets the state of the search users dialog to open or closed.
     * @param open - A boolean value indicating whether the dialog should be open or closed.
     */
    setIsOpen: (open) => set({ isOpen: open }),

    /**
     * Inverts the state of the search users dialog.
     * If the dialog is currently open, it will be closed, and vice versa.
     */
    invert: () => set((state) => ({ isOpen: !state.isOpen })),
  })
);
