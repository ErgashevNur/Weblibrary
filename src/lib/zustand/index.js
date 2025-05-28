import { create } from "zustand";

const storedUser = JSON.parse(localStorage.getItem("user"));

export const useAppStore = create((set) => ({
  user: storedUser || null,
  setUser: (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    set({ user: userData });
  },
  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("refreshToken");
    set({ user: null, refreshToken: null });
  },
}));
