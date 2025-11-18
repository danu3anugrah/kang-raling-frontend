<template>
  <div class="login-page">
    <Navbar />

    <section class="login-section">
      <div class="login-container">
        <div class="login-content">
          <!-- Left Side - Illustration -->
          <div class="login-illustration">
            <div class="illustration-wrapper">
              <div class="lock-icon">
                <i class="bi bi-lock-fill"></i>
                <div class="user-badge">
                  <i class="bi bi-person-fill"></i>
                </div>
              </div>
              <h2>Selamat Datang Kembali!</h2>
              <p>Masuk ke dashboard Kang Raling untuk mengelola konten dan data</p>
            </div>
          </div>

          <!-- Right Side - Login Form -->
          <div class="login-form-section">
            <div class="form-wrapper">
              <div class="form-header">
                <img src="@/assets/images/logokangraling.png" alt="Logo Kang Raling" class="form-logo">
                <h3>Login Fasilitator</h3>
                <p>Silakan masuk dengan akun Anda</p>
              </div>

              <form @submit.prevent="handleLogin" class="login-form">
                <!-- Email Field -->
                <div class="form-group">
                  <label for="email">
                    <i class="bi bi-envelope"></i>
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    v-model="email"
                    class="form-input"
                    placeholder="Masukkan alamat email yang terdaftar"
                    required
                  >
                </div>

                <!-- Password Field -->
                <div class="form-group">
                  <label for="password">
                    <i class="bi bi-lock"></i>
                    Password
                  </label>
                  <div class="password-input-wrapper">
                    <input
                      :type="showPassword ? 'text' : 'password'"
                      id="password"
                      v-model="password"
                      class="form-input"
                      placeholder="Masukkan password yang sesuai"
                      required
                    >
                    <button
                      type="button"
                      class="toggle-password"
                      @click="showPassword = !showPassword"
                    >
                      <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                    </button>
                  </div>
                </div>

                <!-- Error Message -->
                <div v-if="errorMessage" class="error-alert">
                  <i class="bi bi-exclamation-circle"></i>
                  {{ errorMessage }}
                </div>

                <!-- Submit Button -->
                <button type="submit" class="btn-login" :disabled="loading">
                  <span v-if="loading">
                    <i class="bi bi-arrow-clockwise spin"></i>
                    Memproses...
                  </span>
                  <span v-else>
                    Masuk
                    <i class="bi bi-arrow-right"></i>
                  </span>
                </button>
              </form>

              <!-- Help Text -->
              <div class="form-footer">
                <p>Lupa akun Anda?</p>
                <p class="help-text">
                  Silakan menghubungi DLH Kota/Kabupaten setempat untuk memulihkan akun 
                  TPS 3R / TPST / PDU / POO / Pengelola Kawasan & Fasilitas
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const errorMessage = ref('')
const loading = ref(false)

const handleLogin = async () => {
  loading.value = true
  errorMessage.value = ''

  const result = await authStore.login(email.value, password.value)

  if (result.success) {
    router.push('/dashboard')
  } else {
    errorMessage.value = result.message
  }

  loading.value = false
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
@import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css');

/* === GLOBAL === */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.login-page {
  font-family: 'Poppins', sans-serif;
  background: #f8f9fa;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* === LOGIN SECTION === */
.login-section {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 120px 20px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e8f5f0 100%);
}

.login-container {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
}

.login-content {
  background: white;
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 600px;
}

/* === LEFT SIDE - ILLUSTRATION === */
.login-illustration {
  background: linear-gradient(135deg, #10a85d 0%, #0b613d 100%);
  padding: 60px 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.login-illustration::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.08) 0%, transparent 50%);
}

.illustration-wrapper {
  position: relative;
  z-index: 2;
  text-align: center;
  color: white;
}

.lock-icon {
  width: 150px;
  height: 150px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 30px;
  position: relative;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

.lock-icon i {
  font-size: 4rem;
  color: white;
}

.user-badge {
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 50px;
  height: 50px;
  background: #3b82f6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 4px solid white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.user-badge i {
  font-size: 1.5rem;
  color: white;
}

.illustration-wrapper h2 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 15px;
}

.illustration-wrapper p {
  font-size: 1.05rem;
  line-height: 1.6;
  opacity: 0.95;
}

/* === RIGHT SIDE - FORM === */
.login-form-section {
  padding: 60px 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-wrapper {
  width: 100%;
  max-width: 400px;
}

.form-header {
  text-align: center;
  margin-bottom: 35px;
}

.form-logo {
  width: 70px;
  height: 70px;
  margin-bottom: 20px;
  filter: drop-shadow(0 4px 10px rgba(16, 168, 93, 0.2));
}

.form-header h3 {
  font-size: 1.8rem;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 8px;
}

.form-header p {
  font-size: 0.95rem;
  color: #64748b;
}

/* === FORM STYLES === */
.login-form {
  margin-bottom: 25px;
}

.form-group {
  margin-bottom: 25px;
}

.form-group label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  color: #1a202c;
  margin-bottom: 10px;
}

.form-group label i {
  color: #10a85d;
  font-size: 1rem;
}

.form-input {
  width: 100%;
  padding: 14px 18px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 0.95rem;
  font-family: 'Poppins', sans-serif;
  transition: all 0.3s ease;
  background: #f8fafc;
}

.form-input:focus {
  outline: none;
  border-color: #10a85d;
  background: white;
  box-shadow: 0 0 0 4px rgba(16, 168, 93, 0.1);
}

.form-input::placeholder {
  color: #94a3b8;
}

/* Password Input Wrapper */
.password-input-wrapper {
  position: relative;
}

.password-input-wrapper .form-input {
  padding-right: 50px;
}

.toggle-password {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #64748b;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 5px;
  transition: color 0.3s ease;
}

.toggle-password:hover {
  color: #10a85d;
}

/* Error Alert */
.error-alert {
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #dc2626;
  padding: 14px 16px;
  border-radius: 10px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.9rem;
}

.error-alert i {
  font-size: 1.2rem;
  flex-shrink: 0;
}

/* Login Button */
.btn-login {
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #10a85d 0%, #0b613d 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  box-shadow: 0 4px 15px rgba(16, 168, 93, 0.3);
}

.btn-login:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(16, 168, 93, 0.4);
}

.btn-login:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Form Footer */
.form-footer {
  text-align: center;
  padding-top: 20px;
  border-top: 2px solid #e2e8f0;
}

.form-footer p {
  font-size: 0.9rem;
  color: #1a202c;
  font-weight: 600;
  margin-bottom: 8px;
}

.help-text {
  font-size: 0.85rem !important;
  color: #64748b !important;
  line-height: 1.6;
  font-weight: 400 !important;
  margin-top: 8px;
}

/* === RESPONSIVE === */
@media (max-width: 968px) {
  .login-content {
    grid-template-columns: 1fr;
  }

  .login-illustration {
    padding: 50px 30px;
    min-height: 300px;
  }

  .lock-icon {
    width: 120px;
    height: 120px;
  }

  .lock-icon i {
    font-size: 3rem;
  }

  .user-badge {
    width: 40px;
    height: 40px;
  }

  .user-badge i {
    font-size: 1.2rem;
  }

  .illustration-wrapper h2 {
    font-size: 1.75rem;
  }

  .illustration-wrapper p {
    font-size: 1rem;
  }

  .login-form-section {
    padding: 50px 30px;
  }
}

@media (max-width: 480px) {
  .login-section {
    padding: 30px 15px;
  }

  .login-illustration {
    padding: 40px 20px;
  }

  .login-form-section {
    padding: 40px 25px;
  }

  .form-header h3 {
    font-size: 1.5rem;
  }

  .illustration-wrapper h2 {
    font-size: 1.5rem;
  }

  .lock-icon {
    width: 100px;
    height: 100px;
  }

  .lock-icon i {
    font-size: 2.5rem;
  }
}

/* === SMOOTH SCROLL === */
html {
  scroll-behavior: smooth;
}
</style>