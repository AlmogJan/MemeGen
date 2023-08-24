"use strict";
let gCanvas;
let gCtx;
let gImg;
let gMeme;
let gLine;
const PIXEL_RATIO = Math.max(1, window.devicePixelRatio),
  SCREEN_WIDTH = 600,
  SCREEN_HEIGHT = 600;
function onInit() {
  renderGallery();
  document.querySelector(".nav-gallery").click();
  addEventListeners();
  createCanvas();
}

function addEventListeners() {
  document
    .querySelectorAll(".gallery-img")
    .forEach((elImage) => (elImage.onclick = () => renderMeme(elImage)));
}
function createCanvas() {
  gCanvas = document.createElement("canvas");
  gCanvas.width = SCREEN_WIDTH * PIXEL_RATIO;
  gCanvas.height = SCREEN_HEIGHT * PIXEL_RATIO;
  gCanvas.style.cursor = "grab";
  gCanvas.style.width = SCREEN_WIDTH + "px";
  gCanvas.style.height = SCREEN_HEIGHT + "px";
  gCanvas.classList.add("canvas-item");
  document.querySelector(".canvas-container").appendChild(gCanvas);
  gCtx = gCanvas.getContext("2d");
}

function renderGallery() {
  createImages();
  const images = getImages();
  const elContainer = document.querySelector(".img-container");
  images.forEach((image) => {
    const img = document.createElement("img");
    img.src = image.src;
    img.classList.add("gallery-img");
    elContainer.appendChild(img);
  });
}

function onSearchChange(elSearch) {
  setSearchQuery(elSearch.value);
  renderGallery();
}
function renderMeme(elImg) {
  document.querySelector(".nav-memes").click();
  gImg = elImg;
  gCtx.drawImage(
    elImg,
    0,
    0,
    SCREEN_WIDTH * PIXEL_RATIO,
    SCREEN_HEIGHT * PIXEL_RATIO
  );

  onCreateMeme(elImg);
}

function onCreateMeme(elImg) {
  gMeme = getMeme(elImg);
}
