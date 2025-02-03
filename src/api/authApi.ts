import { apiClient, setAuthToken } from "../config/apiConfig";

interface LoginResponse {
  access_token: string;
  token_type: string;
}

export const loginApi = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>("/login", { email, password });
  setAuthToken(response.data.access_token);
  return response.data;
};

export const registerApi = async (first_name: string, last_name: string, email: string, password: string) => {
    await apiClient.post("/register", {
      first_name,
      last_name,
      email,
      password,
    });
};

export const logoutApi = () => {
    setAuthToken(null);
  };
  