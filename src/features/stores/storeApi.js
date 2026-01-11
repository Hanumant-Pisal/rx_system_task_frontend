import api from "../../utils/apiClient";

export const storeApi = {
  userList: (params) => api.get("/stores", { params }).then((r) => r.data),
  getById: (id) => api.get(`/stores/${id}`).then((r) => r.data),
 
  adminCreate: (payload) => api.post("/admin/stores", payload).then((r) => r.data),
  adminList: (params) => api.get("/admin/stores", { params }).then((r) => r.data),
};
