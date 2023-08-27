"use strict";

function onGalleryClick() {
  document.querySelector(".nav-memes").classList.remove("nav-item-clicked");
  document.querySelector(".nav-about").classList.remove("nav-item-clicked");
  document.querySelector(".editor").classList.add("display-none");
  document.querySelector(".modal").classList.add("display-none");
  document.querySelector(".about-backdrop").classList.add("display-none");
  document.body.classList.remove("menu-open");
  document.querySelector(".menu-backdrop").classList.add("display-none");

  document.querySelector(".nav-gallery").classList.toggle("nav-item-clicked");
  document.querySelector(".gallery").classList.toggle("display-none");
}
function onMemesClick(elMemesBtn) {
  document.querySelector(".nav-gallery").classList.remove("nav-item-clicked");
  document.querySelector(".nav-about").classList.remove("nav-item-clicked");
  document.querySelector(".gallery").classList.add("display-none");
  document.querySelector(".modal").classList.add("display-none");
  document.querySelector(".about-backdrop").classList.add("display-none");
  document.body.classList.remove("menu-open");
  document.querySelector(".menu-backdrop").classList.add("display-none");

  elMemesBtn.classList.toggle("nav-item-clicked");
  document.querySelector(".editor").classList.toggle("display-none");
}

function toggleModal() {
  document.querySelector(".nav-memes").classList.remove("nav-item-clicked");
  document.querySelector(".nav-gallery").classList.remove("nav-item-clicked");
  document.querySelector(".gallery").classList.add("display-none");
  document.querySelector(".editor").classList.add("display-none");
  document.body.classList.remove("menu-open");
  document.querySelector(".menu-backdrop").classList.add("display-none");

  document.querySelector(".nav-about").classList.add("nav-item-clicked");
  document.body.classList.toggle("no-overflow");
  document.querySelector(".about-backdrop").classList.toggle("display-none");
  document.querySelector(".modal").classList.toggle("display-none");
}
function toggleDarkMode(elModeBtn) {
  document.body.classList.remove("menu-open");
  document.querySelector(".menu-backdrop").classList.add("display-none");
  elModeBtn.innerText = elModeBtn.innerText === "☀️" ? "🌙" : "☀️";
  if (elModeBtn.classList.contains("light-mode")) {
    elModeBtn.classList.replace("light-mode", "dark-mode");
    document.body.style.backgroundColor = "#22252c";
    document.body.style.color = "white";
  } else if (elModeBtn.classList.contains("dark-mode")) {
    elModeBtn.classList.replace("dark-mode", "light-mode");
    document.body.style.backgroundColor = "white";
    document.body.style.color = "#22252c";
  }
}

function toggleMenu(elbtn) {
  elbtn.innerText = elbtn.innerText === "X" ? "☰" : "X";
  document.body.classList.toggle("menu-open");
  document.querySelector(".menu-backdrop").classList.toggle("display-none");
}
