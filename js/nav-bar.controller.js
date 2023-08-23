"use strict";

function onGalleryClick(elGalleryBtn) {
  document.querySelector(".nav-memes").classList.remove("nav-item-clicked");
  document.querySelector(".nav-about").classList.remove("nav-item-clicked");
  document.querySelector(".editor").classList.add("display-none");
  document.querySelector(".modal").classList.add("display-none");
  document.querySelector(".about-backdrop").classList.add("display-none");

  elGalleryBtn.classList.toggle("nav-item-clicked");
  document.querySelector(".gallery").classList.toggle("display-none");
}
function onMemesClick(elMemesBtn) {
  document.querySelector(".nav-gallery").classList.remove("nav-item-clicked");
  document.querySelector(".nav-about").classList.remove("nav-item-clicked");
  document.querySelector(".gallery").classList.add("display-none");
  document.querySelector(".modal").classList.add("display-none");
  document.querySelector(".about-backdrop").classList.add("display-none");

  elMemesBtn.classList.toggle("nav-item-clicked");
  document.querySelector(".editor").classList.toggle("display-none");
}

function toggleModal() {
  document.querySelector(".nav-memes").classList.remove("nav-item-clicked");
  document.querySelector(".nav-gallery").classList.remove("nav-item-clicked");
  document.querySelector(".gallery").classList.add("display-none");
  document.querySelector(".editor").classList.add("display-none");

  document.body.classList.toggle("no-overflow");
  document.querySelector(".about-backdrop").classList.toggle("display-none");
  document.querySelector(".modal").classList.toggle("display-none");
}
function toggleDarkMode(elModeBtn) {
  elModeBtn.innerText = elModeBtn.innerText === "☀️" ? "🌙" : "☀️";
  if (elModeBtn.classList.contains("light-mode")) {
    elModeBtn.classList.replace("light-mode", "dark-mode");
    document.body.style.backgroundColor = "#22252c";
  } else if (elModeBtn.classList.contains("dark-mode")) {
    elModeBtn.classList.replace("dark-mode", "light-mode");
    document.body.style.backgroundColor = "white";
  }
}
