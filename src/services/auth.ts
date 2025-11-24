import api from "./api";

export interface UserLoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  access: string;
  refresh: string;
}

export function isAuthenticated() {
  return Boolean(localStorage.getItem("access"));
}

export async function login(user: UserLoginRequest): Promise<LoginResponse> {
  try {
    const response = await api.post<LoginResponse>("users/login/", user);

    // salva tokens
    localStorage.setItem("access", response.data.access);
    localStorage.setItem("refresh", response.data.refresh);

    return response.data;
  } catch (error) {
    console.error("Erro no login:", error);
    throw error;
  }
}

export function logout() {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");

  window.location.href = "/login";
}
