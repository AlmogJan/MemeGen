let images = [];

function getImages() {
  return images;
}

function createImages() {
  for (let i = 1; i <= 18; i++) {
    images.push(_createImage(i, `images/meme-imgs (square)/${i}.jpg`));
  }
}
function _createImage(id, src) {
  return {
    id,
    src,
  };
}

function createMeme(image) {
  return {
    selectedImgId: image.id,
    selectedLineIdx: 0,
    lines: [
      {
        txt: "I sometimes eat Falafel",
        size: "38px",
      },
    ],
  };
}
