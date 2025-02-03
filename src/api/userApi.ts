import { apiClient } from "../config/apiConfig";

interface UserProfile {
  email: string;
  id: string;
}

export const getUserProfile = async (): Promise<UserProfile> => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Пользователь не авторизован");
  const response = await apiClient.get<UserProfile>("/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};