// Wandering Circles
const colors = [[255, 0, 0, 127], [0, 0, 255, 127], [0, 255, 0, 127], [255, 255, 0, 127], [0, 255, 255, 127], [255, 255, 255, 127], [50, 50, 50, 127]];
let t = [];
let x;
let y;
let circleSize = 0;
let mode = "colors";
let modes = ["colors", "whiteStroke", "blackStroke"];
let modeIndex = 0;

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
  background(0, 18);

  // Settings
  switch (mode) {
    case "colors":
      noStroke();
      break;
    case "blackStroke":
      stroke(0);
      break;
    case "whiteStroke":
      stroke(255);
      break;
  }

  // Increment circle size
  circleSize += 0.1;

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
}
