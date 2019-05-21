const canvas = $("#myCanvas").get(0);
const ctx = canvas.getContext('2d');
const overlay = $(".gameStartOverlay");
const overlayGameOver = $(".gameOverOverlay");
const arrowKeys = $(".arrowKeys");
const canvasContainer = $(".canvasContainer");
const mobileModeButton = $(".mobileModeButt");
const resetButton = $(".resetButt");

const canvasHeight = 700;
const canvasWidth = 800;
const scoreDisplay = $('.score'); 
const snakeInsideColor = "#19C8B8";
const snakeOutsideColor = "#073c37";
const appleColor = "red";
const appleColorBorder = "#FFA000";

let snake = [
    {x: 150, y: 150},
    {x: 140, y: 150},
    {x: 130, y: 150},
    {x: 120, y: 150},
    {x: 110, y: 150},
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
let hitApple = false;
let set = 0;
let activateKeys = false;

// ******************* MAJOR *******************

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
    // check if hitapple should be true
    detectApple();
    // remove tail unless (1) hit all (2) hit apple
    if (snake[0].y < canvasHeight && snake[0].y > -10 && snake[0].x > -10 && snake[0].x < canvasWidth && hitApple == false){snake.pop();}
    // reset hit apple back to false   
    hitApple = false;
    clearCanvas();
    drawSnake();
    detectSelf();
    createNewFood();
}

// CHANGE DIRECTION ARROW KEYS
function snakeMovementKeys(){
    if (activateKeys == true){
        $(document).keydown(function(e) {
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
        });
    }
}

// CHANGE DIRECTION MOBILE ARROWS
function snakeMovementMobile() {
    if (activateKeys == true){
       $(".up.arrow").on("click", function(){
           dx = 0;
           dy = -10;
           mobileStart();
       })
       $(".down.arrow").on("click", function(){
           dx = 0;
           dy = 10;
           mobileStart();
       })
       $(".left.arrow").on("click", function(){
           dx = -10;
           dy = 0;
           mobileStart();
       })
       $(".right.arrow").on("click", function(){
           dx = 10;
           dy = 0;
           mobileStart();
       })
   }
}

// CREATE RANDOM APPLE COORDINATES
function randomFoodCoor(){
    foodX = Math.floor(Math.random() * canvas.width/10) * 10;  
    foodY = Math.floor(Math.random() * canvas.height/10) * 10;
}
// DRAW APPLE
function createNewFood() {
    ctx.fillStyle = appleColor;
    ctx.strokeStyle = appleColorBorder;
    ctx.strokeRect(foodX, foodY, snakeSize, snakeSize);
    ctx.fillRect(foodX, foodY, snakeSize, snakeSize);
}
// EAT APPLE
function detectApple(){
    if (snake[0].x === foodX && snake[0].y === foodY){
        score++;
        scoreUpdate();
        hitApple = true;
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
        if (headCoorX == snake[i].x && headCoorY == snake[i].y) {
                clearInterval(set);
                gameOver = true
                checkGameOver();
        }
    }    
}

// COLLISION DETECTION
function detectWalls(){
    if (snake[0].x == -10 || snake[0].y == canvasHeight || snake[0].x == canvasWidth || snake[0].y == -10){
       clearInterval(set);
       gameOver = true;
       checkGameOver();
   }
}

// GAME OVER OVERLAY
function checkGameOver(){
    if (gameOver == true){
        overlayGameOver.removeClass("destroy");
    }
    if (gameOver == false){
        overlayGameOver.addClass("destroy");
    }
}

// MOBILE START ACTION
let mobileStart = () => {
    if (set == 0){
        // Can't make the set = .... into a variable
        set = setInterval(snakeShift,snakeSpeed);
        overlay.attr("id", "destroy");
        activateKeys = true;
        snakeMovementMobile(); // to prevent changing directions before game starts
        snakeMovementKeys(); // to prevent changing directions before game starts
    }  
}

// DESKTOP START ACTION
let desktopStart = () => {
    canvasContainer.on('keydown', function(e){
        if (e.which == 32 && set == 0){
            e.preventDefault(); // prevent the default
            overlay.attr("id", "destroy");
            set = setInterval(snakeShift,snakeSpeed);
            activateKeys = true;
            snakeMovementMobile(); // to prevent changing directions before game starts
            snakeMovementKeys();// to prevent changing directions before game starts
        }
    });
}

// BUTTON FUNCTION - MOBILE MODE
let mobileModeFunc = () => {
    if (gameOver == false){
        mobileModeButton.click(function(){
            arrowKeys.toggleClass("destroy");
            $(this).toggleClass("buttonPressed")
        })
    }
}

// BUTTON FUNCTION - RESET GAME
let resetButtonFunc = () => {
    resetButton.click(function(){
        score = 0;
        scoreUpdate();
        snake = [
            {x: 150, y: 150},
            {x: 140, y: 150},
            {x: 130, y: 150},
            {x: 120, y: 150},
            {x: 110, y: 150},
          ];
        overlay.removeAttr("id");
        clearInterval(set); // stop setInverval
        set = 0; // force set = 0 to allow functionality of desktop and mobile start
        clearCanvas();
        drawSnake();
        randomFoodCoor();
        createNewFood(); 
        gameOver = false;
        checkGameOver();
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
    desktopStart();  // includes movement init - mobile & desktop
    mobileModeFunc(); // includes movement init - mobile & desktop
    resetButtonFunc();
    drawSnake();
    randomFoodCoor();
    createNewFood(); 
  });


// ****************************************************************
// ****************************************************************




