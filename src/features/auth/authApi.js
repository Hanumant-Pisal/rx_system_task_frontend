import api from "../../utils/apiClient";

export const authApi = {
  signup: (payload) => api.post("/auth/signup", payload).then((r) => r.data),

  login: (payload) => api.post("/auth/login", payload).then((r) => r.data),

  logout: () => api.post("/auth/logout").then((r) => r.data),

  me: () => api.get("/auth/me").then((r) => r.data),
  
  changePassword: (payload) => api.patch("/users/me/password", payload).then((r) => r.data),
};
