"use strict";
let gCanvas;
let gCtx;
let gImg;
const PIXEL_RATIO = Math.max(1, window.devicePixelRatio);
const SCREEN_WIDTH = 600,
  SCREEN_HEIGHT = 600;

function onInit() {
  createImages();
  renderGallery();
  renderSavedMemes();
  document.querySelector(".nav-gallery").click();
  addEventListeners();
  createCanvas();
  createFontSelect();
  addEditorEventListeners(gCanvas);
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
  const images = getImages();
  const elContainer = document.querySelector(".img-container");
  elContainer.innerHTML = "";
  images.forEach((image) => {
    const img = document.createElement("img");
    img.id = image.id;
    img.src = image.src;
    img.classList.add("gallery-img");
    elContainer.appendChild(img);
  });
  addEventListeners();
}
function renderSavedMemes() {
  const savedMemes = getSavedMemes();
  const elContainer = document.querySelector(".saved-meme-gallery");
  const elNoMemes = document.querySelector(".saved-meme-gallery-headers h4");
  if (savedMemes) {
    elNoMemes.classList.add("display-none");
    savedMemes.forEach((meme) => {
      const img = document.createElement("img");
      img.id = meme.id;
      img.src = meme.src;
      img.classList.add("gallery-img");
      elContainer.appendChild(img);
    });
  } else {
    elNoMemes.classList.toggle("display-none");
  }
}
function createFontSelect() {
  const elSelect = document.querySelector(".font-family");
  Object.keys(fonts).forEach((font) => {
    const option = elSelect.appendChild(document.createElement("option"));
    option.value = font;
    option.innerText = font.charAt(0).toUpperCase() + font.slice(1);
  });
}

function onSearchChange(elSearch) {
  setSearch(elSearch.value);
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
  onAddLine();
}

function onCreateMeme(elImg) {
  setMeme(elImg);
}
