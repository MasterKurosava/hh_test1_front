import { apiClient, setAuthToken } from "../config/apiConfig";

interface LoginResponse {
  token: string;
  type: string;
}

export const loginApi = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>("/login", { email, password });
  setAuthToken(response.data.token);
  return response.data;
};

export const registerApi = async (email: string, password: string) => {
    await apiClient.post("/register", {
      email,
      password,
    });
};

export const logoutApi = () => {
    setAuthToken(null);
  };
  