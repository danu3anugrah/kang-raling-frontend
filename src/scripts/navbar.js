// src/scripts/navbar.js
export function initNavbarInteractions() {
  const hamburger = document.querySelector("#hamburger-btn");
  const navMenu = document.querySelector(".nav-menu");
  const dropdowns = document.querySelectorAll(".dropdown");

  if (!hamburger || !navMenu) return;

  // ============ HAMBURGER MENU ============
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("show");
  });

  // Tutup menu saat klik di luar
  document.addEventListener("click", (e) => {
    if (
      !e.target.closest(".nav-menu") &&
      !e.target.closest("#hamburger-btn")
    ) {
      hamburger.classList.remove("active");
      navMenu.classList.remove("show");
    }
  });

  // ============ DROPDOWN MENU ============
  document.querySelectorAll(".dropdown-toggle").forEach((toggle) => {
    toggle.addEventListener("click", function (e) {
      e.preventDefault();

      const parent = this.parentElement;
      const open = parent.classList.contains("open");

      dropdowns.forEach((d) => d.classList.remove("open"));

      if (!open) parent.classList.add("open");
    });
  });

  // Tutup dropdown kalau klik di luar
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".dropdown")) {
      dropdowns.forEach((d) => d.classList.remove("open"));
    }
  });

  // ============ SCROLL EFFECT ============
  window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 20) navbar.classList.add("scrolled");
    else navbar.classList.remove("scrolled");
  });
}
