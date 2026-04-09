/*
  Lógica global compartida por todas las páginas:
  - botón de menú responsive
  - resaltado automático del enlace activo
*/

document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  const page = document.body.dataset.page;
  const activeLink = document.querySelector(`[data-link="${page}"]`);

  if (activeLink) {
    activeLink.classList.add("active");
  }

  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      nav.classList.toggle("is-open");
    });
  }
});
