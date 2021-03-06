const canvas = $("#myCanvas").get(0);
const ctx = canvas.getContext('2d');
const overlay = $(".gameStartOverlay");
const overlayGameOver = $(".gameOverOverlay");
const arrowKeys = $(".arrowKeys");
const upKey = $(".up.arrow");
const downKey = $(".down.arrow");
const leftKey = $(".left.arrow");
const rightKey = $(".right.arrow");
const canvasContainer = $(".canvasContainer");
const mobileModeButton = $(".mobileModeButt");
const resetButton = $(".resetButt");

const canvasHeight = 240;
const canvasWidth = 350;
const scoreDisplay = $('.score'); 
const snakeInsideColor = "#19C8B8";
const snakeOutsideColor = "#073c37";

// Replaced by using sprites: 
    // const appleColor = "red";
    // const appleColorBorder = "#FFA000";

let snake = [
    {x: 70, y: 70},
    {x: 60, y: 70},
    {x: 50, y: 70},
    {x: 40, y: 70},
    {x: 30, y: 70},
  ];
let snakeSize = 10
let headCoorX;
let headCoorY;
let newHead;
let newTail;
let dx = 10;
let dy = 0;
let snakeSpeed = 100;
let foodX;
let foodY;
let gameOver = false;
let score = 0;
let hitFood = false;
let set = 0;
let activateKeys = 0;
let foodType;
let generatedFood = false;

// ******************* Core Functionality *******************

//DRAW THE SNAKE. TIGGER FUNCTION
function drawSnakePart(snakeParts) {
    ctx.fillStyle = snakeInsideColor;
    ctx.strokeStyle = snakeOutsideColor;
    ctx.strokeRect(snakeParts.x, snakeParts.y, snakeSize, snakeSize);
    ctx.fillRect(snakeParts.x, snakeParts.y, snakeSize, snakeSize);
}
function drawSnake(){
    snake.forEach(drawSnakePart)
}

// THE MOVING SNAKE - SHIFT LOGIC
function snakeShift() {
    detectWalls();
    newHead = {x: snake[0].x+dx, y: snake[0].y+dy}
    snake.unshift(newHead);
    // check if food is hit
    detectApple();
    // remove tail unless (1) hit all (2) hit apple
    if (snake[0].y < canvasHeight && snake[0].y > -10 && snake[0].x > -10 && snake[0].x < canvasWidth && hitFood === false){snake.pop();}
    // reset hit apple back to false   
    hitFood = false;
    clearCanvas();
    drawSnake();
    detectSelf();
    createNewFood();
}

// CHANGE DIRECTION ARROW KEYS
function snakeMovementKeys(){
        $(document).keydown(function(e) {
            if (activateKeys === 1){
                switch(e.which) {
                    case 37:
                        dx = -10;
                        dy = 0;
                    break;
                    case 38: // up
                        dx = 0;
                        dy = -10;
                    break;
                    case 39: // right
                        dx = 10;
                        dy = 0;
                    break;
                    case 40: // down
                        dx = 0;
                        dy = 10;
                    break;
                    default: return; // exit this handler for other keys
                }
                e.preventDefault(); // prevent the default action (scroll / move caret)
            }
        });
}

// CHANGE DIRECTION MOBILE ARROWS
function snakeMovementMobile() {
        arrowKeys.on("click", function(){
            mobileStart();
        })
        upKey.on("click", function(){
           dx = 0;
           dy = -10;
       })
       downKey.on("click", function(){
           dx = 0;
           dy = 10;
       })
       leftKey.on("click", function(){
           dx = -10;
           dy = 0;
       })
       rightKey.on("click", function(){
           dx = 10;
           dy = 0;
       })
   }

// CREATE RANDOM APPLE COORDINATES
function randomFoodCoor(){
    foodX = Math.floor(Math.random() * canvasWidth/10) * 10;  
    foodY = Math.floor(Math.random() * canvasHeight/10) * 10;
}
// DRAW APPLE
function createNewFood() {
    
    if (generatedFood === false) {
        //create the new beverage
        img = new Image();
        img.src = "assets/applesANDdrinkSpriteSheet.png"
        console.log("reset")
        foodNumber = Math.floor(Math.random() * 7);
        spriteSourceX = foodNumber * 82; // 82 is the width of each sprite
        //Draw the new beverage
        console.log("hello?")
        ctx.drawImage(img, spriteSourceX, 0, 82, 100, foodX, foodY, 10, 10);        
        generatedFood = true;
        //Record the new beverage type to eventually influence the snake speed
        if (foodNumber < 4) {
            foodType = "apple";
        } else {
            foodType = "martini";
        };
    } else if (set != 0) {
        ctx.drawImage(img, spriteSourceX, 0, 82, 100, foodX, foodY, 10, 10);
    }

    // Replaced by sprites
        // ctx.fillStyle = appleColor;
        // ctx.strokeStyle = appleColorBorder;
        // ctx.strokeRect(foodX, foodY, snakeSize, snakeSize);
        // ctx.fillRect(foodX, foodY, snakeSize, snakeSize);
}

// EAT APPLE
function detectApple(){
    if (snake[0].x === foodX && snake[0].y === foodY){
        console.log(foodType)
        if (foodType === "apple"){
            snakeSpeed = 100;
            settingInterval();
        } else if(foodType === "martini") {
            snakeSpeed = 50;
            settingInterval();
        }
        generatedFood = false;
        score++;
        scoreUpdate();
        hitFood = true;
        randomFoodCoor();
        createNewFood();
    }
}

// SELF DETECTION
function detectSelf(){
    //i = 1 so that you skip the head (x,y)
    for (i=1; i < snake.length; i++){
        headCoorX = snake[0].x;
        headCoorY = snake[0].y;
        if (headCoorX === snake[i].x && headCoorY === snake[i].y) {
                clearInterval(set);
                gameOver = true
                checkGameOver();
        }
    }    
}

// COLLISION DETECTION
function detectWalls(){
    if (snake[0].x === -10 || snake[0].y === canvasHeight || snake[0].x === canvasWidth || snake[0].y === -10){
       clearInterval(set);
       gameOver = true;
       checkGameOver();
   }
}

// GAME OVER OVERLAY
function checkGameOver(){
    if (gameOver === true){
        overlayGameOver.removeClass("destroy");
    }
    if (gameOver === false){
        overlayGameOver.addClass("destroy");
    }
}

// MOBILE START ACTION
let mobileStart = () => {
    if (set === 0){
        // Can't make the set = .... into a variable
        set = setInterval(snakeShift,snakeSpeed);
        overlay.attr("id", "destroy");
    }  
}

// DESKTOP START ACTION
let desktopStart = () => {
        ctx.scale(2, 2);
    canvasContainer.on('keydown', function(e){
        if (e.which === 32 && set === 0){
            e.preventDefault(); // prevent the default
            overlay.attr("id", "destroy");
            set = setInterval(snakeShift,snakeSpeed);
            activateKeys = 1;
            snakeMovementKeys(); //prevent keys affecting UNTILL game begins
        }
    });
}

// Set interval and Snake Speed
function settingInterval () {
    clearInterval(set)
    set = setInterval(snakeShift,snakeSpeed);
}

// BUTTON FUNCTION - MOBILE MODE
let mobileModeFunc = () => {
        mobileModeButton.click(function(){
            arrowKeys.toggleClass("destroy");
            $(this).toggleClass("buttonPressed");
        })
}

// BUTTON FUNCTION - RESET GAME
let resetButtonFunc = () => {
    resetButton.click(function(){
        score = 0;
        foodType = false;
        
        snakeSpeed = 100;
        scoreUpdate();
        snake = [
            {x: 70, y: 70},
            {x: 60, y: 70},
            {x: 50, y: 70},
            {x: 40, y: 70},
            {x: 30, y: 70},
          ];
        overlay.removeAttr("id");
        clearInterval(set); // stop setInverval
        set = 0; // force set = 0 to allow functionality of desktop and mobile start
        clearCanvas();
        drawSnake();
        randomFoodCoor();
        createNewFood(); 
        generatedFood = false;
        gameOver = false;
        activateKeys = 0;
        dx = 10;
        dy = 0;
        checkGameOver();
        mobileModeFunc();
        console.log(activateKeys)
    })
}

// UPDATE SCORE
let scoreUpdate = () =>{
    scoreDisplay.text(score);  
} 

// CLEAR ALL DRAWN ELEMENTS ON CANVAS
const clearCanvas = function(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
} 


// ****************************************************************
// ****************************************************************

$(function(){
    desktopStart();
    mobileModeFunc(); 
    snakeMovementMobile();
    resetButtonFunc();
    drawSnake();
    randomFoodCoor();
    createNewFood(); 
  });


// ****************************************************************
// ****************************************************************




 