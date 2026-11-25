document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Abrir menu");
      });
    });
  }

  document.querySelectorAll("[data-year]").forEach((element) => {
    element.textContent = new Date().getFullYear();
  });

  // Carrossel de rituais: mouse no desktop e toque/clique em qualquer tela.
  const ritualSlides = [...document.querySelectorAll(".ritual-slide")];
  const hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

  function activateRitual(selected) {
    ritualSlides.forEach((slide) => {
      const active = slide === selected;
      slide.classList.toggle("is-active", active);
      slide.setAttribute("aria-pressed", active ? "true" : "false");
    });
  }

  ritualSlides.forEach((slide) => {
    slide.addEventListener("click", () => {
      activateRitual(slide);
    });

    slide.addEventListener("pointerenter", (event) => {
      if (hasFinePointer.matches && event.pointerType === "mouse") {
        activateRitual(slide);
      }
    });

    slide.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        activateRitual(slide);
      }
    });
  });

});
