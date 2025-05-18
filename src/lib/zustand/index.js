import { create } from "zustand";

const storedUser = JSON.parse(localStorage.getItem("user"));

export const useAppStore = create((set) => ({
  user: storedUser || null,
  setUser: (userData) => {
    localStorage.setItem("user", JSON.stringify(userData)); // localStorage ga saqlaymiz
    set({ user: userData });
  },
  logout: () => {
    localStorage.removeItem("user"); // chiqishda tozalash
    set({ user: null });
  },
}));
