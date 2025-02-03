import { apiClient } from "../config/apiConfig";

interface UserProfile {
  first_name: string;
  last_name: string;
  email: string;
}

export const getUserProfile = async (): Promise<UserProfile> => {
  const response = await apiClient.get<UserProfile>("/me");
  return response.data;
};
