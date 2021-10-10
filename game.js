
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
    count: 1,
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
let mercuryY = 0; 

let plutoX = Math.floor(Math.random() * (canvasWidth - 40));
let plutoY = 0; 

let saturnX = Math.floor(Math.random() * (canvasWidth - 40));
let saturnY = 0; 

let fireballX = Math.floor(Math.random() * (canvasWidth - 40));
let fireballY = 0; 

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
    mercuryY += 2.5;
    plutoY += 2;
    saturnY += 2;
    fireballY += 2.5;
    meteorY += 2.5;

    if (mercuryX === canvasHeight) {
        mercuryX = Math.floor(Math.random() * (canvasWidth - 40));
        mercuryY = 0; 
    }
    else if (plutoX === canvasHeight) {
        plutoX = Math.floor(Math.random() * (canvasWidth - 40));
        plutoY = -20;
    }
    else if (saturnX === canvasHeight) {
        saturnX = Math.floor(Math.random() * (canvasWidth - 40));
        saturnY = -50; 
    }
    else if (fireballX === canvasHeight) {
        fireballX = Math.floor(Math.random() * (canvasWidth - 40));
        fireballY = 0;
    }
    else if (meteorX === canvasHeight) {
        meteorX = Math.floor(Math.random() * (canvasWidth - 40));
        meteorY = 0; 
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
        heroX <= mercuryX + 40 &&
        heroX >= mercuryX - 60 &&
        heroY <= mercuryY + 40 &&
        heroY >= mercuryY - 60
    ) {
        mercuryX = Math.floor(Math.random() * (canvasWidth - 40));
        mercuryY = 0;
        score += 5;
    }
    else if (
        heroX <= saturnX + 40 &&
        heroX >= saturnX - 60 &&
        heroY <= saturnY + 40 &&
        heroY >= saturnY - 60
    ) {
        saturnX = Math.floor(Math.random() * (canvasWidth - 40));
        saturnY = 0;
        score += 5;
    }
    else if (
        heroX <= plutoX + 40 &&
        heroX >= plutoX - 60 &&
        heroY <= plutoY + 40 &&
        heroY >= plutoY - 60
    ) {
        plutoX = Math.floor(Math.random() * (canvasWidth - 40));
        plutoY = 0;
        score += 5;
    }
    else if (
        heroX <= meteorX + 40 &&
        heroX >= meteorX - 60 &&
        heroY <= meteorY + 40 &&
        heroY >= meteorY - 60
    ) {
        gameState.isOver = true;
        gameState.count += 1;
        //Hide all the components on canvas 
        heroReady = false;
        mercuryReady = false;
        saturnReady = false;
        plutoReady = false;
        fireballReady = false;
        meteorReady = false; 
    }
    else if (
        heroX <= fireballX + 40 &&
        heroX >= fireballX - 60 &&
        heroY <= fireballY + 40 &&
        heroY >= fireballY - 60
    ) {
        gameState.isOver = true;
        gameState.count += 1;
        //Hide all the components on canvas 
        heroReady = false;
        mercuryReady = false;
        saturnReady = false;
        plutoReady = false;
        fireballReady = false;
        meteorReady = false; 
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

loadImage();
setKeyBoardListeners();
main();


var w = window;
requestAnimationFrame =
  w.requestAnimationFrame ||
  w.webkitRequestAnimationFrame ||
  w.msRequestAnimationFrame ||
  w.mozRequestAnimationFrame;







