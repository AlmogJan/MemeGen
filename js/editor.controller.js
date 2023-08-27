const fonts = {
  impact: `Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif`,
  poppins: "poppins,sans-serif",
  ariel: "Arial, Helvetica, sans-serif",
  "courier-New": "'Courier New', Courier, monospace",
  monospace: "monospace",
  serif: "serif",
};
let gStartPos;
const TOUCH_EVS = ["touchstart", "touchmove", "touchend"];

function addEditorEventListeners(canvas) {
  addMouseListeners(canvas);
  addTouchListeners(canvas);
}

function addMouseListeners(canvas) {
  canvas.addEventListener("mousedown", onDown);
  canvas.addEventListener("mousemove", onMove);
  canvas.addEventListener("mouseup", onUp);
}
function addTouchListeners(canvas) {
  canvas.addEventListener("touchstart", onDown);
  canvas.addEventListener("touchmove", onMove);
  canvas.addEventListener("touchend", onUp);
}
function onDown(ev) {
  let pos = getEvPos(ev);
  const meme = getMeme();
  const { line, lineIndex } = checkLineClicked(pos);
  if (lineIndex < 0 || !line) {
    meme.selectedLineIdx = 0;
    return;
  }
  setInput(line.txt);
  meme.selectedLineIdx = lineIndex;
  line.isDragging = true;
  gStartPos = pos;
  // if(TOUCH_EVS.includes(ev.type)){
  //   pos/
  // }
  document.body.style.cursor = "grabbing";
  onChangeText(line.txt);
}
function onMove(ev) {
  const { isDragging, txt } = getCurrentLine() || {
    isDragging: false,
    txt: "",
  };
  if (!isDragging) return;

  const pos = getEvPos(ev);
  const dx = pos.x - gStartPos.x;
  const dy = pos.y - gStartPos.y;

  moveText(dx, dy);

  gStartPos = pos;

  onChangeText(txt);
}
function onUp() {
  const currentLine = getCurrentLine();
  if (currentLine && currentLine.isDragging) {
    currentLine.isDragging = false;
    document.body.style.cursor = "grab";
    onChangeText(currentLine.txt);
  }
}
function getEvPos(ev) {
  let pos = {
    x: ev.offsetX * 2,
    y: ev.offsetY * 2,
  };
  if (TOUCH_EVS.includes(ev.type)) {
    ev.preventDefault();
    ev = ev.changedTouches[0];
    pos = {
      x: (ev.pageX - ev.target.offsetLeft - ev.target.clientLeft) * 3,
      y: (ev.pageY - ev.target.offsetTop - ev.target.clientTop) * 3,
    };
  }
  return pos;
}

function checkLineClicked(pos) {
  const lines = getMeme().lines;
  const lineIndex = lines.findIndex(
    (line) =>
      line.rectPos &&
      pos.x >= line.rectPos.x &&
      pos.x <= line.rectPos.x + line.rectPos.width &&
      pos.y >= line.rectPos.y &&
      pos.y <= line.rectPos.y + line.rectPos.height
  );
  return { line: lines[lineIndex], lineIndex };
}

function moveText(dx, dy) {
  const currentLine = getCurrentLine();
  currentLine.pos.x += dx;
  currentLine.pos.y += dy;
  onChangeText(currentLine.txt);
}

function onChangeText(value) {
  const meme = getMeme();
  const currentLine = getCurrentLine();
  currentLine.txt = value;
  const lines = meme.lines;
  gCtx.save();
  gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
  gCtx.drawImage(
    gImg,
    0,
    0,
    SCREEN_WIDTH * PIXEL_RATIO,
    SCREEN_HEIGHT * PIXEL_RATIO
  );

  lines.forEach((line) => {
    drawText(
      line,
      line.txt,
      line.color,
      line.strokeColor,
      line.size,
      line.textFont,
      line.pos
    );
  });

  gCtx.restore();
}
function drawText(
  line,
  text,
  fillStyle,
  strokeStyle,
  fontSize,
  textFont,
  position
) {
  const meme = getMeme();
  gCtx.lineWidth = 2;
  gCtx.fillStyle = fillStyle;
  gCtx.strokeStyle = strokeStyle;
  gCtx.font = `${fontSize}px ${textFont}`;
  gCtx.textAlign = "left";
  gCtx.textBaseline = "top";
  gCtx.fillText(text, position.x, position.y);
  gCtx.strokeText(text, position.x, position.y);
  resetCurrentLineRect(line, gCtx);
  if (
    meme.lines.findIndex(
      (l) => l.rectPos.x === line.rectPos.x && l.rectPos.y === line.rectPos.y
    ) === meme.selectedLineIdx &&
    getCurrentLine().isDragging
  ) {
    gCtx.strokeRect(
      line.rectPos.x,
      line.rectPos.y,
      line.rectPos.width,
      line.rectPos.height
    );
  }
}

function onAddLine() {
  addLine(gCtx);
  setInput("");
}

function setInput(value) {
  const input = document.querySelector(".change-line");
  input.value = value;
}
function addLineInput() {
  const container = document.querySelector(".input-container");
  if (container.children.length === 0) {
    const input = document.createElement("input");
    input.type = "text";
    input.classList.add("change-line");
    input.placeholder = "Add Text Here";
    input.oninput = () => {
      onChangeText(input.value);
    };
    container.appendChild(input);
  }
}
function onDeleteLine() {
  const meme = getMeme();
  if (meme.lines.length > 1) {
    deleteLine();
    removeInput(meme);
    meme.selectedLineIdx = meme.lines.length - 1;
    onChangeText(getCurrentLine().txt);
  }
}
function removeInput(meme) {
  const input = document.getElementById(meme.selectedLineIdx);
  input.remove();
}

function onTextColorInput(elTextPicker) {
  const { txt } = getCurrentLine();
  setCurrentLineTextColor(elTextPicker.value);
  onChangeText(txt);
}
function onStrokeColorInput(elStrokePicker) {
  const { txt } = getCurrentLine();
  setCurrentLineTextStrokeColor(elStrokePicker.value);
  onChangeText(txt);
}
function onUpdateSize(addToSize) {
  const { txt } = getCurrentLine();
  setCurrentLineTextSize(addToSize);
  onChangeText(txt);
}
function onChangeFont(font) {
  const { txt } = getCurrentLine();
  setCurrentLineTextFont(fonts[font]);
  onChangeText(txt);
}
function onChangeTextAlign(pos) {
  if (pos === "center") {
    const currentLine = getCurrentLine();
    currentLine.pos.x = gCanvas.width / 2 - currentLine.rectPos.width / 2;
    onChangeText(currentLine.txt);
  } else if (pos === "start") {
    const currentLine = getCurrentLine();
    currentLine.pos.x = 30;
    onChangeText(currentLine.txt);
  } else if (pos === "end") {
    const currentLine = getCurrentLine();
    currentLine.pos.x = gCanvas.width - currentLine.rectPos.width;
    onChangeText(currentLine.txt);
  }
}

function downloadMeme(elDownload) {
  const dataUrl = gCanvas.toDataURL();
  elDownload.href = dataUrl;
  elDownload.download = "my-img";
}

function saveToGallery() {
  const img = gCanvas.toDataURL("image/png");
  addMeme(img, ["my", "meme"]);
  renderSavedMemes();
}

function shareMeme() {
  const imgDataUrl = gCanvas.toDataURL("image/jpeg");

  function onSuccess(uploadedImgUrl) {
    const url = encodeURIComponent(uploadedImgUrl);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${url}`);
  }
  doUploadImg(imgDataUrl, onSuccess);
}
function doUploadImg(imgDataUrl, onSuccess) {
  // Pack the image for delivery
  const formData = new FormData();
  formData.append("img", imgDataUrl);

  // Send a post req with the image to the server
  const XHR = new XMLHttpRequest();
  XHR.onreadystatechange = () => {
    // If the request is not done, we have no business here yet, so return
    if (XHR.readyState !== XMLHttpRequest.DONE) return;
    // if the response is not ok, show an error
    if (XHR.status !== 200) return console.error("Error uploading image");
    const { responseText: url } = XHR;
    // Same as
    // const url = XHR.responseText

    // If the response is ok, call the onSuccess callback function,
    // that will create the link to facebook using the url we got
    onSuccess(url);
  };
  XHR.onerror = (req, ev) => {
    console.error(
      "Error connecting to server with request:",
      req,
      "\nGot response data:",
      ev
    );
  };
  XHR.open("POST", "//ca-upload.com/here/upload.php");
  XHR.send(formData);
}
