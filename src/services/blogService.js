import apiClient from "./api";

export default {
  // Get all blogs (Public)
  getAll() {
    return apiClient.get("/blogs");
  },

  // Get single blog by ID (Public)
  getById(id) {
    return apiClient.get(`/blogs/${id}`);
  },

  // Create blog (Fasilitator only)
  create(formData) {
    return apiClient.post("/blogs", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  // Update blog (Fasilitator only)
  update(id, formData) {
    return apiClient.post(`/blogs/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  // Delete blog (Fasilitator only)
  delete(id) {
    return apiClient.delete(`/blogs/${id}`);
  },
};
