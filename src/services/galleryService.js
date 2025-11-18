import apiClient from "./api";

export default {
  getAll() {
    return apiClient.get("/galleries");
  },

  getById(id) {
    return apiClient.get(`/galleries/${id}`);
  },

  create(formData) {
    return apiClient.post("/galleries", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  update(id, formData) {
    return apiClient.post(`/galleries/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  delete(id) {
    return apiClient.delete(`/galleries/${id}`);
  },
};
