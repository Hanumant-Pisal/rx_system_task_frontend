import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config || {};
    if (
      error.response &&
      error.response.status === 401 &&
      !original._retry &&
      !original.url.includes("/auth/login") &&
      !original.url.includes("/auth/signup")
    ) {
      original._retry = true;
      try {
        await api.post("/auth/refresh");
        return api(original);
      } catch (_) {
        // Handle refresh token failure
      }
    }
    return Promise.reject(error);
  }
);

api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

export default api;
