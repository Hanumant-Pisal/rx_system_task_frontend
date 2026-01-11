import api from "../../utils/apiClient";

export const ratingApi = {
  upsert: (storeId, value) => api.put(`/ratings/${storeId}`, { value }).then((r) => r.data),
};
