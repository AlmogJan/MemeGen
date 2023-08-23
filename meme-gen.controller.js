"use strict";
let gCanvas;
let gCtx;
function onInit() {
  renderCanvas();
  //   renderGallery();
}

function renderCanvas() {
  gCtx = gCanvas.getContext("2d");
}
function onSearchChange(elSearch) {
  setSearchQuery(elSearch.value);
  //   renderGallery();
}
