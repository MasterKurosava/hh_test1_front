import { create } from "zustand";
import { loginApi, logoutApi } from "../api/authApi";

interface AuthState {
  token: string | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("token"),
  loading: false,
  error: null,

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const data = await loginApi(email, password);
      set({ token: data.access_token, loading: false });
      return true;
    } catch (error: any) {
      const errorMessage = error.response?.data?.detail || "Ошибка входа";
      set({ error: errorMessage, loading: false });
      return false;
    }
  },

  logout: () => {
    logoutApi();
    set({ token: null });
  },
}));
