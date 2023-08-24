function onChangeText(value) {
  gLine = value;
  gCtx.save();
  gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
  gCtx.drawImage(
    gImg,
    0,
    0,
    SCREEN_WIDTH * PIXEL_RATIO,
    SCREEN_HEIGHT * PIXEL_RATIO
  );
  drawText(
    gLine,
    gMeme.lines[gMeme.selectedLineIdx].color,
    gMeme.lines[gMeme.selectedLineIdx].strokeColor,
    gMeme.lines[gMeme.selectedLineIdx].size,
    400,
    300
  );

  gCtx.restore();
}
function drawText(text, fillStyle, strokeStyle, fontSize, x, y) {
  gCtx.lineWidth = 2;
  gCtx.fillStyle = fillStyle;
  gCtx.strokeStyle = strokeStyle;
  gCtx.font = fontSize + "px poppins,sans-sarif";
  gCtx.textAlign = "center";
  gCtx.textBaseline = "middle";

  gCtx.fillText(text, x, y);
  gCtx.strokeText(text, x, y);
}

function onUpdateSize(addToSize) {
  gMeme.lines[gMeme.selectedLineIdx].size += addToSize;
  onChangeText(gLine);
}

function onStrokeColorInput(elStrokePicker) {
  gMeme.lines[gMeme.selectedLineIdx].strokeColor = elStrokePicker.value;
  onChangeText(gLine);
}
function onTextColorInput(elTextPicker) {
  gMeme.lines[gMeme.selectedLineIdx].color = elTextPicker.value;
  onChangeText(gLine);
}

function downloadMeme(elDownload) {
  const dataUrl = gCanvas.toDataURL();
  elDownload.href = dataUrl;
  elDownload.download = "my-img";
}

function saveToGallery() {}

function shareMeme() {
  // Gets the image from the canvas
  const imgDataUrl = gCanvas.toDataURL("image/jpeg");

  function onSuccess(uploadedImgUrl) {
    // Handle some special characters
    const url = encodeURIComponent(uploadedImgUrl);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${url}`);
  }

  // Send the image to the server
  doUploadImg(imgDataUrl, onSuccess);
}

// Upload the image to a server, get back a URL
// call the function onSuccess when done
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
