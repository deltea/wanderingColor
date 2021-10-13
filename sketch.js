// Wandering Circles
const colors = [[255, 0, 0, 150], [0, 0, 255, 150], [0, 255, 0, 150], [255, 255, 0, 150], [0, 255, 255, 150], [255, 255, 255, 255], [50, 50, 50, 255]];
let t = [];
let x;
let y;

// Create circle
function createCircle(color, a, tele, num1, num2) {
  x = width * noise(tele + num1);
  y = height * noise(tele + num2);

  // Color setting
  fill(color[0], color[1], color[2], color[3]);

  // Add a zero to t array
  t.push(0);

  // Draw an ellipse with the variables for x and y passed in
  circle(x, y, 50);
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
  background(0, 16);

  // Settings
  noStroke();

  // Create circle
  for (var i = 0; i < colors.length; i++) {
    createCircle(colors[i], 150, t[i], 100, 200);
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
