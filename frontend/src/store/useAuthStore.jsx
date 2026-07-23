import { create } from "zustand";
import axios from "axios";

//lets create the base url
const api = axios.create({
  baseURL: "/api",
});

//lets now attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const useAuthStore = create((set) => ({
  //lets set and initialize the states
  user: null,
  token: localStorage.getItem("token") || null,
  loading: true,
  error: "",

  register: async (data) => {
    set({ error: "" });
    try {
      const res = await api.post("/auth/register", data);
      localStorage.setItem("token", res.data.token);
      set({
        user: res.data.user,
        token: res.data.token,
      });
      return true;
    } catch (error) {
      set({ error: error.response?.data?.message || "Registration Failed" });
      return false;
    }
  },

  login: async (data) => {
    set({ error: "" });
    try {
      const res = await api.post("/auth/login", data);
      localStorage.setItem("token", res.data.token);
      set({
        user: res.data.user,
        token: res.data.token,
      });
      return true;
    } catch (error) {
      set({ error: error.response?.data?.message || "Login Failed" });
    }
  },

  checkAuth: async (data) => {
    const token = localStorage.getItem("token");
    if (!token) {
      set({ loading: false });
      return;
    }
    try {
      const res = await api.get("/auth/me");
      set({
        user: res.data.user,
        token,
        loading: false,
      });
    } catch (error) {
      localStorage.removeItem("token");
      set({
        user: null,
        token: null,
        loading: false,
      });
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null });
  },

  clearError: () => {
    set({ error: "" });
  },
}));

export default useAuthStore;
