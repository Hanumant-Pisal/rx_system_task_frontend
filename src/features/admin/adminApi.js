import api from "../../utils/apiClient";

export const adminApi = {
  
  createUser: (payload) => api.post("/admin/users", payload).then((r) => r.data),
  listUsers: (params) => api.get("/admin/users", { params }).then((r) => r.data),
  getUser: (id) => api.get(`/admin/users/${id}`).then((r) => r.data),
  
  stats: () => api.get("/admin/stats").then((r) => r.data),
};
