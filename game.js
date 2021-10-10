
let canvas = document.getElementById("gameCanvas");
canvas.width = 500;
canvas.height = 500;
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
let ctx = canvas.getContext("2d");

//Define game main variables: Background, hero, 3 planets, 2 obstacles
let spaceReady, heroReady, mercuryReady, plutoReady, saturnReady, fireballReady, meteorReady; 
let spaceImage, heroImage, mercuryImage, plutoImage, saturnImage, fireballImage, meteorImage;

//Set initial state
let score = 0;
let highScore = localStorage.getItem("userhighscore") || 0;
let gameState = {
    isOver: false,
    count: 15,
};
//Load game components images
function loadImage() {
    //Space background with dimensions 500x500px
    spaceImage = new Image();
    spaceImage.onload = function() {
        spaceReady = true;
    };
    spaceImage.src = "images/background.png";
    //Hero is spaceship with dimensions 60x60px
    heroImage = new Image();
    heroImage.onload = function() {
        heroReady = true;
    };
    heroImage.src = "images/hero.png";
    //3 planets as rewards to get points, dimentions 40x40px for all
    mercuryImage = new Image();
    mercuryImage.onload = function() {
        mercuryReady = true;
    };
    mercuryImage.src = "images/mercury.png";
    
    plutoImage = new Image();
    plutoImage.onload = function() {
        plutoReady = true;
    };
    plutoImage.src = "images/pluto.png";
    
    saturnImage = new Image();
    saturnImage.onload = function() {
        saturnReady = true;
    };
    saturnImage.src = "images/saturn.png";
    //2 obstacles as game killers: meteor & fireball 40x40px
    meteorImage = new Image();
    meteorImage.onload = function() {
        meteorReady = true;
    };
    meteorImage.src = "images/meteor.png";
    
    fireballImage = new Image();
    fireballImage.onload = function() {
        fireballReady = true;
    };
    fireballImage.src = "images/fireball.png";
}

//Setting up locations of game components within the game canvas for later "draw fuction"
let heroX = (canvasWidth/2) - 30;
let heroY = canvasHeight - 65;

let mercuryX = Math.floor(Math.random() * (canvasWidth - 40));
let mercuryY = -100; 

let plutoX = Math.floor(Math.random() * (canvasWidth - 40));
let plutoY = 0; 

let saturnX = Math.floor(Math.random() * (canvasWidth - 40));
let saturnY = -50; 

let fireballX = Math.floor(Math.random() * (canvasWidth - 40));
let fireballY = -20; 

let meteorX = Math.floor(Math.random() * (canvasWidth - 40));
let meteorY = 0; 

//Draw function
function draw() {
    if (spaceReady) {
        ctx.drawImage(spaceImage, 0, 0);
    }
    if (heroReady) {
       ctx.drawImage(heroImage, heroX, heroY);
    }
    if (mercuryReady) {
        ctx.drawImage(mercuryImage, mercuryX, mercuryY);
    }
    if (plutoReady) {
        ctx.drawImage(plutoImage, plutoX, plutoY);
    }
    if (saturnReady) {
        ctx.drawImage(saturnImage, saturnX, saturnY);
    }
    if (fireballReady) {
        ctx.drawImage(fireballImage, fireballX, fireballY);
    }
    if (meteorReady) {
        ctx.drawImage(meteorImage, meteorX, meteorY);
    }

    document.getElementById("timeArea").innerHTML = `Remaining Time: ${gameState.count}`;
    document.getElementById("scoreArea").innerHTML = `Current score: ${score}`;
    document.getElementById("highscoreArea").innerHTML = `Highest Score: ${highScore}`;

    if (gameState.isOver == true) {
        ctx.font = "25px 'Press Start 2P', cursive";
        ctx.fillStyle = "#D2F6DA";
        ctx.fillText(`Game Over`, 150, 250);
    }
};

//Keypressed function
let keyPressed = {};
function setKeyBoardListeners () {
    document.addEventListener(
        'keydown',
        function (e) {
            keyPressed[e.key] = true;
        },
        false
    );
    document.addEventListener(
        'keyup',
        function (e) {
            delete keyPressed[e.key];
        },
        false
    );
}

//Update function
let update = function () {
    if (keyPressed['ArrowUp']) {
        heroY -= 5;
    }
    if (keyPressed['ArrowDown']) {
        heroY += 5;
    }
    if (keyPressed['ArrowLeft']) {
        heroX -= 5;
    }
    if (keyPressed['ArrowRight']) {
        heroX += 5;
    }
    mercuryY += 3;
    plutoY += 3;
    saturnY += 2;
    fireballY += 2.5;
    meteorY += 2.5;

    if (mercuryY === canvasHeight) {
        mercuryX = Math.floor(Math.random() * (canvasWidth - 42));
        mercuryY = -100; 
    }
    else if (plutoY === canvasHeight) {
        plutoX = Math.floor(Math.random() * (canvasWidth - 41));
        plutoY = -20;
    }
    else if (saturnY === canvasHeight) {
        saturnX = Math.floor(Math.random() * (canvasWidth - 44));
        saturnY = -50; 
    }
    else if (fireballY === canvasHeight) {
        fireballX = Math.floor(Math.random() * (canvasWidth - 50));
        fireballY = -50;
    }
    else if (meteorY === canvasHeight) {
        meteorX = Math.floor(Math.random() * (canvasWidth - 44));
        meteorY = -50; 
    }
    //Conditions to move hero in the canvas in the opposite directions if hero is moved beyond canvas;
    else if (heroX > canvasWidth) {
        heroX = 0;
    }  
    else if (heroX < 0) {
        heroX = canvasWidth;
    } 
    else if (heroY > canvasHeight) {
        heroY = 0;
    } 
    else if (heroY < 0) {
        heroY = canvasHeight;
    }
    //Touching conditions between hero object and others in the matrix
    if (
        heroX <= (mercuryX + 40) &&
        mercuryX <= (heroX + 60) &&
        heroY <= (mercuryY + 40) &&
        mercuryY <= (heroY + 60)
    ) {
        mercuryX = Math.floor(Math.random() * (canvasWidth - 40));
        mercuryY = -20;
        score += 5;
    }
    else if (
        heroX <= (saturnX + 40) &&
        saturnX <= (heroX + 60) &&
        heroY <= (saturnY + 40) &&
        saturnY <= (heroY + 60)
    ) {
        saturnX = Math.floor(Math.random() * (canvasWidth - 40));
        saturnY = -50;
        score += 5;
    }
    else if (
        heroX <= (plutoX + 40) &&
        plutoX <= (heroX + 60) &&
        heroY <= (plutoY + 40) &&
        plutoY <= (heroY + 60)
    ) {
        plutoX = Math.floor(Math.random() * (canvasWidth - 40));
        plutoY = -10;
        score += 5;
    }
    else if (
        heroX <= (meteorX + 40) &&
        meteorX <= (heroX + 60) &&
        heroY <= (meteorY + 40) &&
        meteorY <= (heroY + 60)
    ) {
        gameState.isOver = true;
        gameState.count = 0;
        //Hide all the components on canvas 
        heroReady = false;
        mercuryReady = false;
        saturnReady = false;
        plutoReady = false;
        fireballReady = false;
        meteorReady = false; 
    }
    else if (
        heroX <= (fireballX + 40) &&
        fireballX <= (heroX + 60) &&
        heroY <= (fireballY + 40) &&
        fireballY <= (heroY + 60)
    ) {
        gameState.isOver = true;
        gameState.count = 0;
        //Hide all the components on canvas 
        heroReady = false;
        mercuryReady = false;
        saturnReady = false;
        plutoReady = false;
        fireballReady = false;
        meteorReady = false; 
    }
    if (score > highScore) {
        highScore = score;
        localStorage.setItem("userhighscore", highScore);
    }
};

//Main function
function main() {
    if (!gameState.isOver) {
        update();
        draw();
    }
    requestAnimationFrame(main);
}

//Setting time for each round
let timeCount = function() {
    gameState.count --
    if (gameState.count < 0) {
        clearInterval(timeCount);
        gameState.isOver = true;
        gameState.count = 0;
        heroReady = false;
        mercuryReady = false;
        saturnReady = false;
        plutoReady = false;
        fireballReady = false;
        meteorReady = false; 
    }
};

setInterval(timeCount, 1000);
loadImage();
setKeyBoardListeners();
main();

var w = window;
requestAnimationFrame =
  w.requestAnimationFrame ||
  w.webkitRequestAnimationFrame ||
  w.msRequestAnimationFrame ||
  w.mozRequestAnimationFrame;

function reset() {
    gameState.isOver = false;
    gameState.count = 15;
    score = 0;
    heroReady = true;
    mercuryReady = true;
    saturnReady = true;
    plutoReady = true;
    fireballReady = true;
    meteorReady = true; 
    //Setting back initial positions of the elements
    heroX = (canvasWidth/2) - 30;
    heroY = canvasHeight - 65;

    mercuryX = Math.floor(Math.random() * (canvasWidth - 40));
    mercuryY = -100; 

    plutoX = Math.floor(Math.random() * (canvasWidth - 40));
    plutoY = 0; 

    saturnX = Math.floor(Math.random() * (canvasWidth - 40));
    saturnY = -50; 

    fireballX = Math.floor(Math.random() * (canvasWidth - 40));
    fireballY = -20; 

    meteorX = Math.floor(Math.random() * (canvasWidth - 40));
    meteorY = 0; 
}



