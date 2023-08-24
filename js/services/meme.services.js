let images = [];

function getMeme(image) {
  return _createMeme(image);
}

function getImages() {
  return images;
}

function createImages() {
  for (let i = 1; i <= 18; i++) {
    images.push(_createImage(`images/meme-imgs (square)/${i}.jpg`));
  }
}
function _createImage(src) {
  return {
    id: makeId(),
    src,
  };
}

function _createMeme(image) {
  return {
    selectedImgId: image.id,
    selectedLineIdx: 0,
    lines: [_createLine("I sometimes eat Falafel", "white", "black", 50)],
  };
}

function _createLine(txt, color, strokeColor, size) {
  return {
    txt,
    color,
    strokeColor,
    size,
  };
}
