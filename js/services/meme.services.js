const keywordsList = [
  ["trump", "politics"],
  ["dog", "pet", "cute"],
  ["baby", "dog", "pet", "cute"],
  ["cat", "pet", "cute"],
  ["baby", "angry"],
  ["crazy", "funny"],
  ["funny", "baby", "surprised"],
  ["movie", "tell me more"],
  ["funny", "baby"],
  ["funny", "obama", "politics"],
  ["funny"],
  ["funny", "chaim"],
  ["movie", "salute", "leonardo"],
  ["movie", "matrix"],
  ["movie", "sean been"],
  ["movie", "starTreck", "patrick"],
  ["funny", "putin", "politics"],
  ["movie", "toy story"],
];

let images = [];
let savedMemes = [];
let gMeme;
let gSearchKeyword = "";
const textColor = "white";
const strokeColor = "black";
const fontSize = 50;
const textFont = `Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif`;
const pos = { x: 100, y: 100 };

function getSavedMemes() {
  return loadFromStorage("memesDB");
}

function addMeme(src, keywords) {
  const meme = _createImage(src, keywords);
  savedMemes.unshift(meme);
  _saveMemes();
}

function _saveMemes() {
  saveToStorage("memesDB", savedMemes);
}

function setCurrentLineTextColor(textColor) {
  getCurrentLine().color = textColor;
}

function setCurrentLineTextStrokeColor(strokeColor) {
  getCurrentLine().strokeColor = strokeColor;
}
function setCurrentLineTextSize(textSize) {
  getCurrentLine().size += textSize;
}

function setCurrentLineTextFont(textFont) {
  getCurrentLine().textFont = textFont;
}

function resetCurrentLineRect(line, context) {
  line.rectPos = _getRect(line.pos.x, line.pos.y, line.size, line.txt, context);
}

function getCurrentLine() {
  return gMeme.lines[gMeme.selectedLineIdx];
}

function getMeme() {
  return gMeme;
}

function setMeme(image) {
  gMeme = _createMeme(image);
}

function getImages() {
  return _getFilteredImagesByKeyword(gSearchKeyword);
}
function setSearch(txt) {
  gSearchKeyword = txt;
}
function getSearch() {
  return gSearchKeyword;
}

function createImages() {
  for (let i = 1; i <= 18; i++) {
    images.push(
      _createImage(`images/meme-imgs (square)/${i}.jpg`, keywordsList[i - 1])
    );
  }
}
function _createImage(src, keywords) {
  return {
    id: makeId(),
    src,
    keywords,
  };
}

function addLine(context) {
  const linesLength = gMeme.lines.length;
  const x = pos.x;
  const y = pos.y * (linesLength + 1);
  gMeme.lines.push(
    _createLine(
      "",
      textColor,
      strokeColor,
      fontSize,
      textFont,
      {
        x: x,
        y: y,
      },
      _getRect(x, y, fontSize, "", context)
    )
  );
  gMeme.selectedLineIdx = linesLength;
}

function deleteLine() {
  gMeme.lines.splice(gMeme.selectedLineIdx, 1);
}

function _getRect(x, y, lineFontSize, text, context) {
  const padding = 20;
  const lineHeight = lineFontSize * 1.286 + padding / 2;
  const textWidth = context.measureText(text).width + padding;
  const rectX = x - padding / 2;
  const rectY = y - padding / 2;

  return {
    x: rectX,
    y: rectY,
    width: textWidth,
    height: lineHeight,
  };
}

function _createMeme(image) {
  return {
    selectedImgId: image.id,
    selectedLineIdx: 0,
    lines: [],
  };
}

function _getFilteredImagesByKeyword(keyword) {
  let filteredImages = [];
  images.forEach((image) => {
    for (let i = 0; i < image.keywords.length; i++) {
      if (image.keywords[i].includes(keyword)) {
        filteredImages.push(image);
        break;
      }
    }
  });

  return filteredImages;
}

function _createLine(
  txt,
  color,
  strokeColor,
  size,
  textFont,
  pos,
  rectPos,
  isDragging = false
) {
  return {
    txt,
    color,
    strokeColor,
    size,
    textFont,
    pos,
    rectPos,
    isDragging,
  };
}
