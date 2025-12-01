import api from "./api";

export interface User {
  id: number;
  username: string;
  email: string;
  tipo_usuario: string;
  is_staff: boolean;
  is_superuser: boolean;
}


export interface UserLoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  access: string;
  refresh: string;
  user: User;
}

export interface RegisterPayload {
  nome_completo: string;
  email: string;
  username: string;
  siape?: string | "";
  password: string;
}

export function getUser() {
  const raw = localStorage.getItem("user");
  return raw ? JSON.parse(raw) : null;
}

export function isAuthenticated() {
  return !!getUser();
}

export function hasRole(role: string) {
  const user = getUser();
  return user?.tipo_usuario === role;
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

export async function createUser(payload: Omit<RegisterPayload, "siape">) {
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
