const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector("#business-menu");
const productsItem = document.querySelector(".has-mega");
const portalDropdown = document.querySelector(".portal-dropdown");
const portalButton = document.querySelector(".portal-dropdown button");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

if (productsItem) {
  productsItem.querySelector("button").addEventListener("click", () => {
    productsItem.classList.toggle("open");
  });
}

if (portalDropdown && portalButton) {
  portalButton.addEventListener("click", () => {
    const isOpen = portalDropdown.classList.toggle("open");
    portalButton.setAttribute("aria-expanded", String(isOpen));
  });
}

const slides = Array.from(document.querySelectorAll(".hero-slide"));
const indicators = Array.from(document.querySelectorAll(".carousel-indicators button:not(.pause)"));
const prevButton = document.querySelector(".carousel-arrow.prev");
const nextButton = document.querySelector(".carousel-arrow.next");
const pauseButton = document.querySelector(".pause");
let currentSlide = 0;
let isPaused = false;

const showSlide = (index) => {
  currentSlide = (index + slides.length) % slides.length;

  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle("active", slideIndex === currentSlide);
  });

  indicators.forEach((indicator, indicatorIndex) => {
    indicator.classList.toggle("active", indicatorIndex === currentSlide);
  });
};

if (slides.length) {
  prevButton.addEventListener("click", () => showSlide(currentSlide - 1));
  nextButton.addEventListener("click", () => showSlide(currentSlide + 1));

  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => showSlide(index));
  });

  pauseButton.addEventListener("click", () => {
    isPaused = !isPaused;
    pauseButton.classList.toggle("paused", isPaused);
    pauseButton.setAttribute("aria-label", isPaused ? "Reproducir carrusel" : "Pausar carrusel");
  });

  setInterval(() => {
    if (!isPaused) {
      showSlide(currentSlide + 1);
    }
  }, 5000);
}
