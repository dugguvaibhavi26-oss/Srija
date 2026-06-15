import { create } from 'zustand';

type AppState = {
  isLoadingComplete: boolean;
  setLoadingComplete: (status: boolean) => void;
  isMenuOpen: boolean;
  setMenuOpen: (status: boolean) => void;
};

export const useAppStore = create<AppState>((set) => ({
  isLoadingComplete: false,
  setLoadingComplete: (status) => set({ isLoadingComplete: status }),
  isMenuOpen: false,
  setMenuOpen: (status) => set({ isMenuOpen: status }),
}));
