<template>
  <div class="dashboard-layout">
    <DashboardSidebar />

    <div class="dashboard-content">
      <DashboardHeader />

      <div class="content-wrapper">
        <section class="content-header">
          <div class="container-fluid">
            <h1>Pengaturan Akun</h1>
          </div>
        </section>

        <section class="content">
          <div class="container-fluid">
            <div class="row">
              <!-- Update Profil -->
              <div class="col-lg-6">
                <div class="card">
                  <div class="card-header">
                    <h3 class="card-title">
                      <i class="bi bi-person"></i> Informasi Profil
                    </h3>
                  </div>
                  <div class="card-body">
                    <form @submit.prevent="updateProfile">
                      <div class="mb-3">
                        <label class="form-label">Nama Lengkap</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="profileForm.name"
                          required
                        />
                      </div>

                      <div class="mb-3">
                        <label class="form-label">Email</label>
                        <input
                          type="email"
                          class="form-control"
                          v-model="profileForm.email"
                          required
                        />
                      </div>

                      <div class="mb-3">
                        <label class="form-label">Role</label>
                        <input
                          type="text"
                          class="form-control"
                          :value="
                            userRole === 'admin'
                              ? 'Administrator'
                              : 'Fasilitator'
                          "
                          disabled
                        />
                      </div>

                      <div class="alert alert-success" v-if="profileSuccess">
                        {{ profileSuccess }}
                      </div>

                      <div class="alert alert-danger" v-if="profileError">
                        {{ profileError }}
                      </div>

                      <button
                        type="submit"
                        class="btn btn-primary"
                        :disabled="profileSubmitting"
                      >
                        <span v-if="profileSubmitting">Menyimpan...</span>
                        <span v-else
                          ><i class="bi bi-save"></i> Simpan Perubahan</span
                        >
                      </button>
                    </form>
                  </div>
                </div>
              </div>

              <!-- Ganti Password -->
              <div class="col-lg-6">
                <div class="card">
                  <div class="card-header">
                    <h3 class="card-title">
                      <i class="bi bi-key"></i> Ganti Password
                    </h3>
                  </div>
                  <div class="card-body">
                    <form @submit.prevent="changePassword">
                      <div class="mb-3">
                        <label class="form-label">Password Baru</label>
                        <input
                          type="password"
                          class="form-control"
                          v-model="passwordForm.new_password"
                          placeholder="Minimal 8 karakter"
                          required
                          minlength="8"
                        />
                      </div>

                      <div class="mb-3">
                        <label class="form-label"
                          >Konfirmasi Password Baru</label
                        >
                        <input
                          type="password"
                          class="form-control"
                          v-model="passwordForm.confirm_password"
                          placeholder="Ketik ulang password baru"
                          required
                          minlength="8"
                        />
                      </div>

                      <div class="alert alert-success" v-if="passwordSuccess">
                        {{ passwordSuccess }}
                      </div>

                      <div class="alert alert-danger" v-if="passwordError">
                        {{ passwordError }}
                      </div>

                      <button
                        type="submit"
                        class="btn btn-danger"
                        :disabled="passwordSubmitting"
                      >
                        <span v-if="passwordSubmitting">Mengubah...</span>
                        <span v-else
                          ><i class="bi bi-shield-lock"></i> Ganti
                          Password</span
                        >
                      </button>
                    </form>
                  </div>
                </div>

                <!-- Info Card -->
                <div class="card bg-light">
                  <div class="card-body">
                    <h5><i class="bi bi-info-circle"></i> Tips Keamanan</h5>
                    <ul class="mb-0">
                      <li>Gunakan password minimal 8 karakter</li>
                      <li>Kombinasikan huruf besar, kecil, angka</li>
                      <li>Jangan gunakan password yang mudah ditebak</li>
                      <li>Ganti password secara berkala</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
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
const userRole = computed(() => authStore.userRole);
const currentUserId = computed(() => authStore.user?.id);

const profileForm = ref({
  name: "",
  email: "",
});

const passwordForm = ref({
  new_password: "",
  confirm_password: "",
});

const profileSubmitting = ref(false);
const passwordSubmitting = ref(false);
const profileSuccess = ref("");
const passwordSuccess = ref("");
const profileError = ref("");
const passwordError = ref("");

// Load current user data
onMounted(() => {
  profileForm.value.name = authStore.user?.name || "";
  profileForm.value.email = authStore.user?.email || "";
});

// Update Profile
// Update Profile
const updateProfile = async () => {
  try {
    profileSubmitting.value = true;
    profileError.value = "";
    profileSuccess.value = "";

    // 👇 GANTI INI - pakai updateProfile bukan update
    await userService.updateProfile({
      name: profileForm.value.name,
      email: profileForm.value.email,
    });

    // Update auth store
    authStore.user.name = profileForm.value.name;
    authStore.user.email = profileForm.value.email;

    profileSuccess.value = "Profil berhasil diperbarui!";

    setTimeout(() => {
      profileSuccess.value = "";
    }, 3000);
  } catch (err) {
    profileError.value =
      err.response?.data?.message || "Gagal memperbarui profil";
    console.error("Error updating profile:", err);
  } finally {
    profileSubmitting.value = false;
  }
};

// Change Password
const changePassword = async () => {
  try {
    passwordSubmitting.value = true;
    passwordError.value = "";
    passwordSuccess.value = "";

    // Validate password match
    if (
      passwordForm.value.new_password !== passwordForm.value.confirm_password
    ) {
      passwordError.value = "Password tidak cocok!";
      passwordSubmitting.value = false;
      return;
    }

    // 👇 GANTI INI - pakai updatePassword
    await userService.updatePassword(passwordForm.value.new_password);

    passwordSuccess.value =
      "Password berhasil diubah! Silakan login ulang dengan password baru.";

    // Clear form
    passwordForm.value.new_password = "";
    passwordForm.value.confirm_password = "";

    // Logout after 3 seconds
    setTimeout(async () => {
      await authStore.logout();
      window.location.href = "/login";
    }, 3000);
  } catch (err) {
    passwordError.value =
      err.response?.data?.message || "Gagal mengubah password";
    console.error("Error changing password:", err);
  } finally {
    passwordSubmitting.value = false;
  }
};
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
  margin-bottom: 20px;
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

.bg-light {
  background: #e9ecef !important;
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
