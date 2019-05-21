const canvas = $("#myCanvas").get(0);
const ctx = canvas.getContext('2d');
const overlay = $(".overlay");
const arrowKeys = $(".arrowKeys");
let snake = [
    {x: 150, y: 150},
    {x: 140, y: 150},
    {x: 130, y: 150},
    {x: 120, y: 150},
    {x: 110, y: 150},
  ];
let snakeHead = snake[0];
let snakeSize = 10
let headCoorX;
let headCoorY;
let newHead;
let newTail;
let dx = 10;
let dy = 0;
let snakeSpeed = 100;
let canvasHeight = 320;
let canvasWidth = 480;
let foodX;
let foodY;
let gameOver = false;
let score = 0;
let scoreDisplay = $('.score'); 
let scoreUpdate = () =>{
    scoreDisplay.text(score);  
} 
let hitApple = false;
let set = 0;
let activateKeys = true;


// REPEAT THIS TO MOVE SNAKE
function snakeShift() {
    detectWalls();
    newHead = {x: snake[0].x+dx, y: snake[0].y+dy}
    snake.unshift(newHead);
    detectApple();
    if (snake[0].y < 320 && snake[0].y > -10 && snake[0].x > -10 && snake[0].x < 480 && hitApple == false){
        snake.pop();
    }   
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hitApple = false;
    drawSnake();
    detectSelf1();
    createNewFood();
}

// COLLISION DETECTION
function detectWalls(){
    if (snake[0].x == -10 || snake[0].y == 320 || snake[0].x == 480 || snake[0].y == -10){
       clearInterval(set);
       console.log("checking for collision");
       console.log("working?!");
       gameOver = true;
   }
}

//DRAW THE SNAKE. TIGGER FUNCTION
function drawSnakePart(snakeParts) {
    ctx.fillStyle = 'lightgreen';
    ctx.strokeStyle = 'darkgreen';
    ctx.strokeRect(snakeParts.x, snakeParts.y, snakeSize, snakeSize);
    ctx.fillRect(snakeParts.x, snakeParts.y, snakeSize, snakeSize);
}
function drawSnake(){
    snake.forEach(drawSnakePart)
}

// DRAW APPLE + Check if head touch apple
function createNewFood() {
    ctx.fillStyle = 'red';
    ctx.strokeStyle = 'darkgreen';
    ctx.strokeRect(foodX, foodY, snakeSize, snakeSize);
    ctx.fillRect(foodX, foodY, snakeSize, snakeSize);
}

// CREATE APPLE COORDINATES
function randomFoodCoor(){
    foodX = Math.floor(Math.random() * canvas.width/10) * 10;  
    foodY = Math.floor(Math.random() * canvas.height/10) * 10;
}

// EAT APPLE
function detectApple(){
    if (snake[0].x === foodX && snake[0].y === foodY){
        // clearInterval(set);
        score++;
        scoreUpdate();
        hitApple = true;
        randomFoodCoor();
        createNewFood();
    }
}

// SELF DETECTION
function detectSelf1(){
    for (i=1; i < snake.length; i++){
        headCoorX = snake[0].x;
        headCoorY = snake[0].y;
        if (headCoorX == snake[i].x && headCoorY == snake[i].y) {
                clearInterval(set);
                console.log("detectSelf");
        }
    }    
}

// CHANGE DIRECTION
function snakeMovement() {
   if (activateKeys = true){
       $(".up.arr").on("click", function(){
           dx = 0;
           dy = -10;
           // snakeShift();
       })
       $(".down.arr").on("click", function(){
           dx = 0;
           dy = 10;
           // snakeShift();
       })
       $(".left.arr").on("click", function(){
           dx = -10;
           dy = 0;
           // snakeShift();
       })
       $(".right.arr").on("click", function(){
           dx = 10;
           dy = 0;
           // snakeShift();
       })
   }
}

function snakeMovementArrows(){
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

$(".container").on('keydown', function(e){
    if (e.which == 32 && set == 0){
        e.preventDefault(); // prevent the default
        overlay.attr("id", "destroy");
        set = setInterval(snakeShift,snakeSpeed);
    }
});

$(".hardModeButt").click(function(){
    arrowKeys.toggleClass("destroy");
})

$(".resetButt").click(function(){
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
    clearInterval(set);
    set = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    randomFoodCoor();
    createNewFood(); 
})

// ****************************************************************
// ****************************************************************
snakeMovement();
snakeMovementArrows()
drawSnake();
randomFoodCoor();
createNewFood(); 
// ****************************************************************
// ****************************************************************




