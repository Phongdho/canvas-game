
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
let gameState = {
    isOver: false,
    level: 1,
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
let heroY = canvasHeight - 30;

let mercuryX = Math.floor(Math.random() * (canvasWidth - 42));
let mercuryY = 40; 

let plutoX = Math.floor(Math.random() * (canvasWidth - 42));
let plutoY = 40; 

let saturnX = Math.floor(Math.random() * (canvasWidth - 42));
let saturnY = 40; 

let fireballX = Math.floor(Math.random() * (canvasWidth - 42));
let fireballY = 40; 

let meteorX = Math.floor(Math.random() * (canvasWidth - 42));
let meteorY = 40; 

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
};

//Main function
function main() {
    if (!gameState.isOver) {
        draw();
    }
    requestAnimationFrame(main);
}

loadImage();
main();


var w = window;
requestAnimationFrame =
  w.requestAnimationFrame ||
  w.webkitRequestAnimationFrame ||
  w.msRequestAnimationFrame ||
  w.mozRequestAnimationFrame;







