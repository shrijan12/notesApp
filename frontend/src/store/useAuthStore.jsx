import { create } from "zustand";

const useAuthStore = create((set) => ({
  //lets set and initialize the states
  user: null,
  token: localStorage.getItem("token") || null,
  loading: true,
  error: "",
}));
