const canvas = $("#myCanvas").get(0);
const ctx = canvas.getContext('2d');

let snake = [
    {x: 150, y: 150},
    {x: 140, y: 150},
    {x: 130, y: 150},
    {x: 120, y: 150},
    {x: 110, y: 150},
  ];
let snakeHead = snake[0];
let snakeSize = 10
let headCoorX = snake[0].x;
let headCoorY = snake[0].y;
let newHead;
let newTail;
let dx = 10;
let dy = 0;
let snakeSpeed = 60;
let canvasHeight = 320;
let canvasWidth = 480;
let foodX;
let foodY;
let gameOver = false;




// REPEAT THIS TO MOVE SNAKE
function snakeShift() {
    detectWalls();
    newHead = {x: snake[0].x+dx, y: snake[0].y+dy}
    snake.unshift(newHead);
    if (snake[0].y < 320 && snake[0].y > -10 && snake[0].x > -10 && snake[0].x < 480){
        snake.pop();
    }   
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    createNewFood();
    console.log(newHead);
    detectApple();
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
        newHead = {x: snake[0].x+dx, y: snake[0].y+dy}
        snake.unshift(newHead);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawSnake();
        randomFoodCoor();
        createNewFood();
    }
}


// CHANGE DIRECTION
function snakeMovement() {
    $(".up.arr").on("click", function(){
        dx = 0;
        dy = -10;
    })
    $(".down.arr").on("click", function(){
        dx = 0;
        dy = 10;
    })
    $(".left.arr").on("click", function(){
        dx = -10;
        dy = 0;
    })
    $(".right.arr").on("click", function(){
        dx = 10;
        dy = 0;
    })
}


// ****************************************************************
// ****************************************************************
snakeMovement();
drawSnake();
randomFoodCoor();
createNewFood(); 
let set = setInterval(snakeShift, snakeSpeed);
// ****************************************************************
// ****************************************************************



// function noBackwards()
// function detectSelf(){}





