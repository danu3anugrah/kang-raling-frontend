<template>
  <div class="dashboard-layout">
    <DashboardSidebar />

    <div class="dashboard-content">
      <DashboardHeader />

      <div class="content-wrapper">
        <section class="content-header">
          <div class="container-fluid">
            <div class="d-flex justify-content-between align-items-center">
              <h1>Kelola User</h1>
              <button class="btn btn-primary" @click="openCreateModal">
                <i class="bi bi-person-plus"></i> Tambah User
              </button>
            </div>
          </div>
        </section>

        <section class="content">
          <div class="container-fluid">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">
                  <i class="bi bi-people"></i> Daftar User
                </h3>
              </div>
              <div class="card-body">
                <!-- Loading -->
                <div v-if="loading" class="text-center py-5">
                  <div class="spinner-border text-primary"></div>
                  <p class="mt-3">Memuat data user...</p>
                </div>

                <!-- Table -->
                <div v-else class="table-responsive">
                  <table class="table table-hover table-striped">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Nama</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Bergabung</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-if="users.length === 0">
                        <td colspan="7" class="text-center text-muted">
                          Belum ada user
                        </td>
                      </tr>
                      <tr v-for="(user, index) in users" :key="user.id">
                        <td>{{ index + 1 }}</td>
                        <td>
                          <strong>{{ user.name }}</strong>
                          <span
                            v-if="user.id === currentUserId"
                            class="badge badge-info ms-2"
                            >You</span
                          >
                        </td>
                        <td>{{ user.email }}</td>
                        <td>
                          <span
                            class="badge"
                            :class="
                              user.role === 'admin'
                                ? 'badge-danger'
                                : 'badge-success'
                            "
                          >
                            {{
                              user.role === "admin" ? "Admin" : "Fasilitator"
                            }}
                          </span>
                        </td>
                        <td>
                          <button
                            class="btn btn-sm"
                            :class="
                              user.is_active ? 'btn-success' : 'btn-secondary'
                            "
                            @click="toggleActive(user)"
                          >
                            <i
                              class="bi"
                              :class="
                                user.is_active
                                  ? 'bi-check-circle'
                                  : 'bi-x-circle'
                              "
                            ></i>
                            {{ user.is_active ? "Aktif" : "Nonaktif" }}
                          </button>
                        </td>
                        <td>{{ formatDate(user.created_at) }}</td>
                        <td>
                          <div class="btn-group">
                            <button
                              class="btn btn-sm btn-warning"
                              @click="openEditModal(user)"
                              title="Edit"
                            >
                              <i class="bi bi-pencil"></i>
                            </button>
                            <button
                              class="btn btn-sm btn-info"
                              @click="openResetPasswordModal(user)"
                              title="Reset Password"
                            >
                              <i class="bi bi-key"></i>
                            </button>
                            <button
                              class="btn btn-sm btn-danger"
                              @click="deleteUser(user)"
                              :disabled="user.id === currentUserId"
                              title="Hapus"
                            >
                              <i class="bi bi-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>

    <!-- Modal Create/Edit User -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5>{{ isEdit ? "Edit User" : "Tambah User Baru" }}</h5>
            <button class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitForm">
              <div class="mb-3">
                <label class="form-label">Nama Lengkap</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="form.name"
                  placeholder="Masukkan nama lengkap"
                  required
                />
              </div>

              <div class="mb-3">
                <label class="form-label">Email</label>
                <input
                  type="email"
                  class="form-control"
                  v-model="form.email"
                  placeholder="email@example.com"
                  required
                />
              </div>

              <div class="mb-3" v-if="!isEdit">
                <label class="form-label">Password</label>
                <input
                  type="password"
                  class="form-control"
                  v-model="form.password"
                  placeholder="Minimal 8 karakter"
                  :required="!isEdit"
                  minlength="8"
                />
              </div>

              <div class="mb-3">
                <label class="form-label">Role</label>
                <select class="form-select" v-model="form.role" required>
                  <option value="fasilitator">Fasilitator</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div class="mb-3">
                <div class="form-check">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="isActive"
                    v-model="form.is_active"
                  />
                  <label class="form-check-label" for="isActive">
                    Akun Aktif
                  </label>
                </div>
              </div>

              <div class="alert alert-danger" v-if="error">
                {{ error }}
              </div>

              <div class="d-flex gap-2 justify-content-end">
                <button
                  type="button"
                  class="btn btn-secondary"
                  @click="closeModal"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  class="btn btn-primary"
                  :disabled="submitting"
                >
                  <span v-if="submitting">Menyimpan...</span>
                  <span v-else>{{ isEdit ? "Update" : "Tambah" }}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Reset Password -->
    <div
      v-if="showResetPasswordModal"
      class="modal-overlay"
      @click.self="closeResetPasswordModal"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5>Reset Password - {{ selectedUser?.name }}</h5>
            <button class="btn-close" @click="closeResetPasswordModal"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitResetPassword">
              <div class="mb-3">
                <label class="form-label">Password Baru</label>
                <input
                  type="password"
                  class="form-control"
                  v-model="newPassword"
                  placeholder="Minimal 8 karakter"
                  required
                  minlength="8"
                />
              </div>

              <div class="alert alert-warning">
                <i class="bi bi-exclamation-triangle"></i>
                Password akan direset dan user harus login ulang dengan password
                baru.
              </div>

              <div class="alert alert-danger" v-if="error">
                {{ error }}
              </div>

              <div class="d-flex gap-2 justify-content-end">
                <button
                  type="button"
                  class="btn btn-secondary"
                  @click="closeResetPasswordModal"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  class="btn btn-danger"
                  :disabled="submitting"
                >
                  <span v-if="submitting">Mereset...</span>
                  <span v-else>Reset Password</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useAuthStore } from "../../stores/auth";
import DashboardSidebar from "../../components/Dashboard/DashboardSidebar.vue";
import DashboardHeader from "../../components/Dashboard/DashboardHeader.vue";
import userService from "../../services/userService";

const authStore = useAuthStore();
const currentUserId = computed(() => authStore.user?.id);

const users = ref([]);
const loading = ref(true);
const showModal = ref(false);
const showResetPasswordModal = ref(false);
const isEdit = ref(false);
const submitting = ref(false);
const error = ref(null);
const selectedUser = ref(null);
const newPassword = ref("");

const form = ref({
  id: null,
  name: "",
  email: "",
  password: "",
  role: "fasilitator",
  is_active: true,
});

const fetchUsers = async () => {
  try {
    loading.value = true;
    const response = await userService.getAll();
    users.value = response.data;
  } catch (err) {
    console.error("Error fetching users:", err);
    error.value = "Gagal memuat data user";
  } finally {
    loading.value = false;
  }
};

const openCreateModal = () => {
  isEdit.value = false;
  resetForm();
  showModal.value = true;
};

const openEditModal = (user) => {
  isEdit.value = true;
  form.value = {
    id: user.id,
    name: user.name,
    email: user.email,
    password: "",
    role: user.role,
    is_active: user.is_active,
  };
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  resetForm();
  error.value = null;
};

const resetForm = () => {
  form.value = {
    id: null,
    name: "",
    email: "",
    password: "",
    role: "fasilitator",
    is_active: true,
  };
};

const submitForm = async () => {
  try {
    submitting.value = true;
    error.value = null;

    const payload = {
      name: form.value.name,
      email: form.value.email,
      role: form.value.role,
      is_active: form.value.is_active,
    };

    if (!isEdit.value) {
      payload.password = form.value.password;
    }

    if (isEdit.value) {
      await userService.update(form.value.id, payload);
      alert("User berhasil diupdate!");
    } else {
      await userService.create(payload);
      alert("User berhasil ditambahkan!");
    }

    closeModal();
    fetchUsers();
  } catch (err) {
    console.error("Error submitting form:", err); // CEK CONSOLE INI

    // Tampilkan error lebih detail
    if (err.response?.data?.errors) {
      const errors = err.response.data.errors;
      const errorMessages = Object.values(errors).flat().join("\n");
      error.value = errorMessages;
    } else if (err.response?.data?.message) {
      error.value = err.response.data.message;
    } else if (err.response?.data?.error) {
      error.value = err.response.data.error;
    } else {
      error.value = "Terjadi kesalahan: " + err.message;
    }
  } finally {
    submitting.value = false;
  }
};

const toggleActive = async (user) => {
  if (
    !confirm(
      `Yakin ingin ${user.is_active ? "menonaktifkan" : "mengaktifkan"} user ${
        user.name
      }?`
    )
  )
    return;

  try {
    await userService.toggleActive(user.id);
    alert("Status user berhasil diubah!");
    fetchUsers();
  } catch (err) {
    alert("Gagal mengubah status user");
    console.error("Error toggling active:", err);
  }
};

const openResetPasswordModal = (user) => {
  selectedUser.value = user;
  newPassword.value = "";
  showResetPasswordModal.value = true;
};

const closeResetPasswordModal = () => {
  showResetPasswordModal.value = false;
  selectedUser.value = null;
  newPassword.value = "";
  error.value = null;
};

const submitResetPassword = async () => {
  try {
    submitting.value = true;
    error.value = null;

    await userService.resetPassword(selectedUser.value.id, newPassword.value);
    alert("Password berhasil direset!");
    closeResetPasswordModal();
  } catch (err) {
    error.value = err.response?.data?.message || "Gagal reset password";
    console.error("Error resetting password:", err);
  } finally {
    submitting.value = false;
  }
};

const deleteUser = async (user) => {
  if (user.id === currentUserId.value) {
    alert("Tidak bisa menghapus akun sendiri!");
    return;
  }

  if (
    !confirm(
      `Yakin ingin menghapus user ${user.name}? Tindakan ini tidak bisa dibatalkan!`
    )
  )
    return;

  try {
    await userService.delete(user.id);
    alert("User berhasil dihapus!");
    fetchUsers();
  } catch (err) {
    alert("Gagal menghapus user");
    console.error("Error deleting user:", err);
  }
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

onMounted(() => {
  fetchUsers();
});
</script>

<style scoped>
.dashboard-layout {
  display: flex;
  min-height: 100vh;
  background: #f4f6f9;
}

.dashboard-content {
  flex: 1;
  margin-left: 250px;
}

.content-wrapper {
  padding: 0;
}

.content-header {
  padding: 20px 30px;
  background: white;
  border-bottom: 1px solid #dee2e6;
  margin-bottom: 20px;
}

.content-header h1 {
  font-size: 1.8rem;
  font-weight: 600;
  color: #343a40;
  margin: 0;
}

.content {
  padding: 0 30px 30px;
}

.card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-header {
  padding: 15px 20px;
  border-bottom: 1px solid #dee2e6;
  background: #f8f9fa;
  border-radius: 10px 10px 0 0;
}

.card-title {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
  color: #343a40;
  display: flex;
  align-items: center;
  gap: 10px;
}

.card-body {
  padding: 20px;
}

.table {
  margin: 0;
}

.badge {
  font-size: 0.75rem;
  padding: 5px 10px;
  border-radius: 5px;
  font-weight: 600;
}

.badge-danger {
  background: #dc3545;
  color: white;
}

.badge-success {
  background: #28a745;
  color: white;
}

.badge-info {
  background: #17a2b8;
  color: white;
}

.btn-group {
  display: flex;
  gap: 5px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
}

.modal-dialog {
  background: white;
  border-radius: 10px;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  padding: 20px;
  border-bottom: 1px solid #dee2e6;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h5 {
  margin: 0;
  font-weight: 600;
}

.modal-body {
  padding: 20px;
}

.btn-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #6c757d;
}

.btn-close:after {
  content: "×";
}

@media (max-width: 992px) {
  .dashboard-content {
    margin-left: 70px;
  }

  .content {
    padding: 0 15px 15px;
  }
}
</style>
