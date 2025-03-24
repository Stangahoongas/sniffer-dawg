function setup() {
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    background(200); // Clear the screen

    // Title
    textSize(50);
    fill(0);
    textAlign(CENTER, CENTER);
    text('🐱 Cat Climb 🧗', width / 2, height / 4);

    // Draw buttons
    drawButton('Play', width / 2, height / 2, isOverButton(width / 2, height / 2));
    drawButton('Instructions', width / 2, height / 2 + 100, isOverButton(width / 2, height / 2 + 100));
    drawButton('Exit', width / 2, height / 2 + 200, isOverButton(width / 2, height / 2 + 200));
}

function drawButton(label, x, y, isHovering) {
    rectMode(CENTER);

    // Ensure consistent hover detection
    let buttonColor = isHovering ? color(150, 200, 255) : color(100, 150, 255);
    fill(buttonColor);
    noStroke();
    rect(x, y, 200, 60, 20);

    // Draw button label
    fill(255);
    textSize(30);
    textAlign(CENTER, CENTER);
    text(label, x, y);
}

function mousePressed() {
    if (isOverButton(width / 2, height / 2)) {
        window.location.href = 'sketch.html'; // Navigate to your main game
    } else if (isOverButton(width / 2, height / 2 + 100)) {
        showInstructions(); // Display instructions
    } else if (isOverButton(width / 2, height / 2 + 200)) {
        window.close(); // Exit the game
    }
}

function isOverButton(x, y) {
    return mouseX > x - 100 && mouseX < x + 100 && mouseY > y - 30 && mouseY < y + 30;
}

function showInstructions() {
    // Display the instructions in a modal or alert
    alert('Instructions:\n\n- Press W to Jump.\n- Hold A (left) or D (right) before pressing jump to jump in that direction. \n- Jump into a wall and then jump off of it in the opposite direction to wall jump. \n- Reach the top to win.\n- Find hidden coins around the map. ');
}