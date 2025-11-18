import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import HomePage from "@/views/HomePage.vue";
import BlogPage from "@/views/BlogPage.vue";
import BlogDetailPage from "@/views/BlogDetailPage.vue";
import LoginPage from "@/views/LoginPage.vue";
import SukajayaPage from "../views/KangRalingSite/SukajayaPage.vue";
import MekargalihPage from "../views/KangRalingSite/MekargalihPage.vue";
import PakuwonPage from "../views/KangRalingSite/PakuwonPage.vue";
import SandingPage from "../views/KangRalingSite/SandingPage.vue";
import BanjarsariPage from "../views/KangRalingSite/BanjarsariPage.vue";
import PwaPage from "../views/KangRalingSite/PwaPage.vue";
import BinangkitPage from "../views/KangRalingSite/BinangkitPage.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/blog",
    name: "Blog",
    component: BlogPage,
  },
  {
    path: "/blog/:id",
    name: "BlogDetail",
    component: BlogDetailPage,
  },
  {
    path: "/login",
    name: "Login",
    component: LoginPage,
  },
  // DASHBOARD ROUTES (UNCOMMENT)
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("@/views/Dashboard/DashboardPage.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/dashboard/blog",
    name: "DashboardBlog",
    component: () => import("@/views/Dashboard/DashboardBlog.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/gallery",
    name: "Gallery",
    component: () => import("@/views/GalleryPage.vue"),
  },
  {
    path: "/dashboard/gallery",
    name: "DashboardGallery",
    component: () => import("@/views/Dashboard/DashboardGallery.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/dashboard/ecomap",
    name: "DashboardEcomap",
    component: () => import("@/views/Dashboard/DashboardEcomap.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/ecomap",
    name: "Ecomap",
    component: () => import("@/views/EcomapPage.vue"),
  },
  {
    path: "/sukajaya",
    name: "Sukajaya",
    component: SukajayaPage
  },
  {
    path: "/mekargalih",
    name: "Mekargalih",
    component: MekargalihPage
  },
  {
    path: "/pakuwon",
    name: "Pakuwon",
    component: PakuwonPage
  },
  {
    path: "/sanding",
    name: "Sanding",
    component: SandingPage
  },
  {
    path: "/banjarsari",
    name: "Banjarsari",
    component: BanjarsariPage
  },
  {
    path: "/pwa",
    name: "Peacesantren Welas Asih",
    component: PwaPage
  },
  {
    path: "/binangkit",
    name: "Bank Sampah Binangkit",
    component: BinangkitPage
  },
  {
    path: "/education",
    name: "Education",
    component: () => import("@/views/EducationPage.vue"),
  },
  {
    path: "/shop",
    name: "Shop",
    component: () => import("@/views/ShopPage.vue"),
  },
  {
    path: "/about",
    name: "About Us",
    component: () => import("@/views/AboutPage.vue"),
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

// Navigation Guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next("/login");
  } else if (to.name === "Login" && authStore.isAuthenticated) {
    next("/dashboard");
  } else {
    next();
  }
});

export default router;
