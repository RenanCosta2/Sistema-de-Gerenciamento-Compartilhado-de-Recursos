import api from "./api";

export interface UserLoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  access: string;
  refresh: string;
  user: JSON;
}

export interface RegisterPayload {
  nome: string;
  email: string;
  username: string;
  siape?: string | "";
  password: string;
  departamento: string;
  cargo: string;
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

    localStorage.setItem("user", JSON.stringify(response.data.user));

    return response.data;
  } catch (error) {
    console.error("Erro no login:", error);
    throw error;
  }
}

export async function createUser(payload: Omit<RegisterPayload, "nome" | "siape" | "departamento" | "cargo">) {
  try {
    const response = await api.post("users/register/", payload);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar um usuário:", error);
    throw error;
  }
}

export function logout() {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  localStorage.removeItem("user");

  window.location.href = "/login";
}
