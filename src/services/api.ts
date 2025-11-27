import axios from "axios";
import { logout } from "./auth";

const api = axios.create({
  baseURL: "http://localhost:8000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercepta requisições e injeta o token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // só tenta refresh se for erro 401 e ainda não tentou
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      const refresh = localStorage.getItem("refresh");
      if (!refresh) {
        logout();
        return Promise.reject(error);
      }

      try {
        const refreshResponse = await api.post("users/token/refresh/", { refresh });

        localStorage.setItem("access", refreshResponse.data.access);

        // injeta o novo token na requisição que falhou
        originalRequest.headers.Authorization = `Bearer ${refreshResponse.data.access}`;
        // repete a requisição original
        return api(originalRequest);

      } catch (e) {
        logout();
        return Promise.reject(e);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
