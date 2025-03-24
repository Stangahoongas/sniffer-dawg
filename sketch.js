let ball, floor;
let speed = 0;
let maxSpeed = 6;
let acceleration = 2;
let sprintmulti = 2;
let isJumping = false;
let canWallJump = false;
let wallJumpDirection = null;
let coin;
let score = 0; 
let coinScore = 0;
let tileSize = 32;
let map, ground, brick, wall,food;
let ice; 
let musicStarted = false;
let music;
let isGameOver = false;
let endScreenImg;


function preload() {
    bg2 = loadImage('snow place.jpg');
    bg3 = loadImage('background 2.jpg');
    bg = loadImage('heck grr.png');
    groundImg = loadImage('snowy tile wowie.png');
    brickImg = loadImage('brick.png');
    coinImg = loadImage('coin.png');
    playerImg = loadImage('cat.png');
    wallImg = loadImage('wall.png');
    heckgroundImg = loadImage('ground2.png');
    heckbrickImg = loadImage('brick2.png');
    heckwallImg = loadImage('wall2.png');
    iceImg = loadImage('ice block.png');
   // music = loadSound('backgrouynd music.mp3');
    jump = loadSound('jump.mp3');
    foodImg = loadImage('food.png');

    endScreenImg = loadImage('cat happy.png');
  }
  

function draw() {
    if (isGameOver) return;
 translate(width / 2, height / 2);
 scale(1.2); 
 translate(-width / 2, -height / 2); 
 clear();




    if (ball.y < 620) {
    background(bg2);
    } else {
    background(bg);
 }

    textSize(50);
    fill('white');
    text(`Height: ${score}`, 180, 150); 
    text(`Coins: ${coinScore}`, 180, 200); 
 

    if (ball.y < 620) { 
    camera.y = 350;
    } else if (ball.y <= 1230) {
    camera.y = 1080;
    } else {
    camera.y = 1650;
 }

    if (ball.x > 1400) {
     camera.x = 1500;
     } else {
     camera.x = 600;
 }

    if (ball.y > 1900) {
    ball.x = 200;
    ball.y = 1740;
 }

 //console.log(ball.y);

 camera.on();
 camera.off();

 if (kb.pressing('up') && !isJumping) {
    ball.vel.y = -10;
    isJumping = true;
    ball.changeAni('spin');
     jump.play();

     if (kb.pressing('left')) {
    ball.vel.x = -maxSpeed;
    ball.mirror.x = false;
    ball.changeAni('spin');
     } else if (kb.pressing('right')) {
    ball.vel.x = maxSpeed;
     ball.mirror.x = true;
    }
 }

     if (kb.pressing('down') && isJumping) {
     ball.vel.y += 6; 
    ball.changeAni('idle');
 }

 if (ball.collides(ice) && kb.pressing('up')) {
    ball.vel.y = -10; // Jump force
    isJumping = true;
    ball.changeAni('spin');
    if (ball.collides(ice) && kb.pressing('left')) {
        ball.vel.x = -maxSpeed;
        ball.mirror.x = false;
        ball.changeAni('spin');
         } else if (ball.collides(ice) && kb.pressing('right')) {
        ball.vel.x = maxSpeed;
         ball.mirror.x = true;
        }
}

 if (ball.collides(ground) || ball.collides(brick) || ball.collides(ground2) || ball.collides(brick2)) {
 isJumping = false;
 ball.vel.y = 0; 
 ball.vel.x = 0; 
 ball.friction = 1;
 canWallJump = false;
 } else {
 ball.friction = 0;
 }
 
 for (let i = 0; i < coin.length; i++) {
    if (ball.overlapping(coin[i])) { 
        coin[i].remove();
        coinScore += 1; 
    }
}
for (let i = 0; i < food.length; i++) {
    if (ball.overlapping(food[i])) {
        endGame(); // Trigger the end game screen
    }
}

 score = Math.round(Math.max(0, 1830 - ball.y)/50);
}

function setup(){
 new Canvas(windowWidth,1000);
 displayMode('centered');
 world.gravity.y = 30;

// window.addEventListener('keydown', startMusic);
// window.addEventListener('mousedown', startMusic);
// music.setVolume(0.5);

 ball = new Sprite(200,1830);
 ball.friction = 0;
 ball.rotationLock = true;
 ball.w = 30;
 ball.h = 34;
 ball.spriteSheet = playerImg;
 ball.addAnis({
 spin: { row: 0, frames: 4, frameDelay:5 }, 
 idle: { row: 1, frame: 1,}
 });
 ball.anis.spin.scale = 2; 
 ball.anis.idle.scale = 2;
 ball.scale = 1;

 ground = new Group();
 ground.collider = 's';
 ground.tile = '1';
 ground.image = groundImg;
 ground.w = tileSize;
 ground.h = tileSize;
 groundImg.scale = 0.7;

 ground2 = new Group();
 ground2.collider = 's';
 ground2.tile = '=';
 ground2.image = heckgroundImg;
 heckgroundImg.scale = 4;
 ground2.w = tileSize;
 ground2.h = tileSize;

 wall = new Group();
 wall.collider = 's';
 wall.tile = 'w';
 wall.w = tileSize;
 wall.image = wallImg;
 wallImg.scale = 4.2;
 wall.h = tileSize;

 wall2 = new Group();
 wall2.collider = 's';
 wall2.tile = 'h';
 wall2.w = tileSize;
 wall2.image = heckwallImg;
 heckwallImg.scale = 4.2;
 wall2.h = tileSize;

 brick = new Group();
 brick.collider = 's'; 
 brick.tile = '2';
 brick.image = brickImg;
 brick.w = tileSize;
 brick.h = tileSize;

 brick2 = new Group();
 brick2.collider = 's'; 
 brick2.tile = 'b';
 brick2.image = heckbrickImg;
 heckbrickImg.scale = 4;
 brick2.w = tileSize;
 brick2.h = tileSize;

 coin = new Group();
 coin.w = 16;
 coin.h = 15;
 coin.spriteSheet = coinImg;
 coin.addAnis({
 spin: { row: 0, frames: 4, frameDelay:5 }
 });
 coin.tile = "c";
 coin.collider = 'none';
 coin.scale = 4;

 food = new Group();
 food.w = tileSize;
 food.h = tileSize;
 food.image = foodImg;
 food.tile = "f";
 food.collider = 'none';
 food.scale = 0.7;

 ice = new Group();
  ice.collider = 's';
  ice.tile = 'i';
  ice.image = iceImg;
  ice.w = tileSize;
  ice.h = tileSize;
  iceImg.scale = 0.7;

 new Tiles(
 [
'......................................',
'.........................11...........................................',
'......................................................................',
'...................................................................f..',
'.....................1...........1111111111111111111111111111111111111',
'......................................',
'......................................',
'.................iiiiiiiii............',
'.............................11.......',
'......................................',
'......................................',
 '...................................1.',
 '.....................................',
 '........11..................11.......',
 '..2..............iiiiii..............',
 '..2..................................',
 '..2..................................',
 '..2..................................',
 '.......11............................',
 '.............iiiii...................',
 '.......................11............',
 '.....................................',
 '..............................11.....',
 '.....................................',
 '........................11...........',
 '........................bb...........',
 '.................11..................',
 '.....................................',
 '.............=1......................',
 '......b..............................',
 '......b..............................',
 '......b..............................',
 '......b..............................',
 '...........==........................',
 '................==...................',
 '...................................................................c',
 '.......................==.....==.==.....==....==..==......==......===.',
 '.....................................',
 '...................==................',
 '.....................................',
 '.....................................',
 '.............==......................',
 '.............bb......................',
 '.....................................',
 '...................==....=...........',
 '.....................................',
 '.............................==......',
 '.....................................',
 '....................................................c..',
 '............c....................======================',
 '.....................==..........bbbbbbbbbbbbbbbbbbbbbbb',
 '.....................................',
 '.................=........===........',
 '.................b...................',
 '.........===.....b...................',
 '............=....b...................',
 '.................b...................',
 '.................b...................',
 '.................b...................',
 '.................b...................',
 '.....============b...................',
 '.....................................',
 '.....................................',
 '.....................................',
 ],
 0,
 16,
 tileSize,
 tileSize - 1
 );
}

function checkCollisions() {
    if (ball.collides(ground) || ball.collides(brick) || ball.collides(ground2) || ball.collides(brick2) || ball.collides(wall) || ball.collides(wall2)) {
        isJumping = false;
        ball.vel.y = 0;
        ball.vel.x = 0;
        ball.friction = 1;
    } 
    else if (ball.collides(ice)) {
        isJumping = false;
        ball.vel.y = 0;
        ball.friction = 0.05; // Keep sliding effect
    } 
    else {
        ball.friction = 0;
    }
}


//function startMusic() {
//    if (!musicStarted) {
//        music.play(); // Start music
//        musicStarted = true;
//
        // Remove event listeners once music has started
//        window.removeEventListener('keydown', startMusic);
   //     window.removeEventListener('mousedown', startMusic);
 //   }
//}

function endGame() {
    isGameOver = true; // Set the game over state
    ground.removeAll();
    ground2.removeAll();
    wall.removeAll();
    wall2.removeAll();
    brick.removeAll();
    brick2.removeAll();
    coin.removeAll();
    food.removeAll();
    ice.removeAll();
    ball.scale = 0.00001;
    clear(); // Clear the canvas
    background(0); // Set a black background
    image(endScreenImg, width / 2 - 200, height / 2, 400, 400);
    textSize(100);
    fill('orange');
    textAlign(CENTER, CENTER);
    text('The Cat got the food!', width / 2, height / 2 - 40);
    textSize(50);
    text('Thank you for climbing!!', width / 2, height / 2 + 30);
    noLoop(); // Stop the draw loop
}
