// Wandering Circles
const colors = [[255, 0, 0, 127], [0, 0, 255, 127], [0, 255, 0, 127], [255, 255, 0, 127], [0, 255, 255, 127], [255, 255, 255, 127], [50, 50, 50, 127]];
let t = [];
let x;
let y;
let circleSize = 0;
let mode = "colors";
let modes = ["colors", "whiteStroke", "blackStroke", "squareBackground", "circleBackground", "noReset", "colorBubbles", "mic", "party"];
let modeIndex = 0;
let circleSizeIncrement = 0.5;
let sizeIncrementDir = true;
let circleMaxSize = 200;

// Download screenshot
async function downloadImage(imageSrc) {
  const image = await fetch(imageSrc);
  const imageBlog = await image.blob();
  const imageURL = URL.createObjectURL(imageBlog);

  const link = document.createElement("a");
  link.href = imageURL;
  link.download = "wandering-color-screenshot";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Create circle
function createCircle(color, tele, num1, num2) {
  x = width * noise(tele + num1);
  y = height * noise(tele + num2);

  // Color setting
  fill(color[0], color[1], color[2], color[3]);

  // Add a zero to t array
  t.push(0);

  // Draw an ellipse with the variables for x and y passed in
  circle(x, y, circleSize);
}

// Create background
function createBackground(shapeSizeParam, marginParam, shape = "square") {
  fill(0);
  noStroke();
  let shapeSize = shapeSizeParam;
  let margin = marginParam;
  for (var x = 0; x < windowWidth; x += shapeSize + margin) {
    for (var y = 0; y < windowHeight; y += shapeSize + margin) {
      if (shape === "square") {
        square(x, y, shapeSize);
      } else {
        circle(x, y, shapeSize);
      }
    }
  }
}

// Setup
function setup() {
  // Create canvas
  createCanvas(windowWidth, windowHeight);

  // Frame rate
  frameRate(100);
}

// Draw
function draw() {
  // Reset background

  // Settings
  switch (mode) {
    case "colors":
      background(0, 18);
      circleSizeIncrement = 0.5;
      noStroke();
      break;
    case "blackStroke":
      background(0, 18);
      circleSizeIncrement = 0.5;
      stroke(0);
      break;
    case "whiteStroke":
      background(0, 18);
      circleSizeIncrement = 0.5;
      stroke(255);
      break;
    case "squareBackground":
      background(0, 18);
      circleSizeIncrement = 0.5;
      createBackground(10, 1);
      break;
    case "circleBackground":
      background(0, 18);
      circleSizeIncrement = 0.5;
      createBackground(10, 1, "circle");
      break;
    case "noReset":
      circleSizeIncrement = 0.5;
      break;
    case "party":
      background(0, 18);
      circleSizeIncrement = 8.7;
      break;
    case "colorBubbles":
      circleSizeIncrement = 40;
      break;
    case "mic":
      navigator.mediaDevices.getUserMedia({video: false, audio: true});
      break;
  }

  // Increment circle size
  circleSize += sizeIncrementDir ? circleSizeIncrement : -circleSizeIncrement;
  if (circleSize >= circleMaxSize || circleSize <= 0) {
    sizeIncrementDir = !sizeIncrementDir;
  }

  // Create circle
  for (var i = 0; i < colors.length; i++) {
    createCircle(colors[i], t[i], 100, 200);
  }

  // Increment the t variable to control the noise amount
  let noise1 = 0.004;
  const noiseAdd = 0.0005;
  for (var i = 0; i < t.length - 2; i++) {
    t[i] += noise1 + i * noiseAdd;
  }

  // Increment t for the different white circle
  let noise2 = 10;
  let noise3 = 15;
  t[t.length - 1] += noise2;
  t[t.length - 2] += noise3;
}

// Input
function mousePressed() {
  modeIndex++;
  if (modeIndex >= modes.length) {
    modeIndex = 0;
  }
  mode = modes[modeIndex];
  if (mode === "party") {
    document.getElementById("audio").play();
    circleSize = 10;
  } else {
    document.getElementById("audio").pause();
    document.getElementById("audio").currentTime = 0;
    if (mode === "mic") {
      navigator.mediaDevices.getUserMedia({video: false, audio: true}).then((stream) => {
        const audio = new AudioContext();
        const analyser = audio.createAnalyser();
        const microphone = audio.createMediaStreamSource(stream);
        const scriptProcessor = audio.createScriptProcessor(2048, 1, 1);
        microphone.connect(analyser);
        analyser.connect(scriptProcessor);
        scriptProcessor.connect(audio.destination);
        scriptProcessor.onaudioprocess = () => {
          const array = new Uint8Array(analyser.frequencyBinCount);
          analyser.getByteFrequencyData(array);
          const arraySum = array.reduce((a, value) => a + value, 0);
          const average = arraySum / array.length;
          console.log(Math.round(average));
        }
      });
    }
  }
}
