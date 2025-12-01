// services/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
});

// --- Funções auxiliares -----------------------
function getAccess() {
  return localStorage.getItem("access");
}

function getRefresh() {
  return localStorage.getItem("refresh");
}

function saveTokens(access: string, refresh?: string) {
  localStorage.setItem("access", access);
  if (refresh) {
    localStorage.setItem("refresh", refresh);
  }
}

function clearAuth() {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
}

// Verifica se JWT expirou sem decodificar (só quando servidor responder 401)
let isRefreshing = false;
let failedQueue: any[] = [];

function processQueue(error: any, token: string | null = null) {
  failedQueue.forEach((req) => {
    if (error) req.reject(error);
    else req.resolve(token);
  });

  failedQueue = [];
}

// --- Interceptor de Request -----------------------
api.interceptors.request.use(
  (config) => {
    const access = getAccess();
    if (access) {
      config.headers.Authorization = `Bearer ${access}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// --- Interceptor de Response (refresh token) ------
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalReq = error.config;

    // 401 = token expirado
    if (error.response?.status === 401 && !originalReq._retry) {
      originalReq._retry = true;

      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalReq.headers.Authorization = `Bearer ${token}`;
            return api(originalReq);
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;

      try {
        const refresh = getRefresh();
        if (!refresh) {
          clearAuth();
          return Promise.reject(error);
        }

        const res = await axios.post("http://localhost:8000/users/token/refresh/", {
          refresh,
        });

        const newAccess = res.data.access;
        const newRefresh = res.data.refresh;

        saveTokens(newAccess, newRefresh);

        processQueue(null, newAccess);
        originalReq.headers.Authorization = `Bearer ${newAccess}`;

        return api(originalReq);
      } catch (err) {
        processQueue(err, null);
        clearAuth();
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
