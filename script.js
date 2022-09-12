"use strict";

// Modal window -------------------->

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn-close-modal");
const btnsOpenModal = document.querySelectorAll(".btn-show-modal");
const allSections = document.querySelectorAll(".section");

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// tabs

const tabs = document.querySelectorAll(".deals-tab");
const tabsContainer = document.querySelector(".deals-tab-container");
const tabsContent = document.querySelectorAll(".deals-content");

tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".deals-tab");
  if (!clicked) return;

  // remove active casses
  tabs.forEach((t) => t.classList.remove("deals-tab-active"));
  tabsContent.forEach((c) => c.classList.remove("deals-content-active"));

  // activate tab
  clicked.classList.add("deals-tab-active");

  // activate content
  document
    .querySelector(`.deals-content-${clicked.dataset.tab}`)
    .classList.add("deals-content-active");
});

// reveal section
const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section-hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section-hidden");
});

// slide
const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider-btn-left");
const btnRight = document.querySelector(".slider-btn-right");
let curSlide = 0;
const maxSlide = slides.length;

const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - curSlide)}%)`)
  );
};
//  0 100% 200%
goToSlide(0);

// next slide
const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  goToSlide(curSlide);
};

const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  goToSlide(curSlide);
};

btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", prevSlide);
