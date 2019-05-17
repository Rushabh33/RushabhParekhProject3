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
let dx = 10;
let dy = 0;
let snakeSpeed = 100;
let canvasHeight = 320;
let canvasWidth = 480;
let foodX = Math.floor(Math.random() * canvas.width/10) * 10;  
let foodY = Math.floor(Math.random() * canvas.height/10) * 10;




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

// ADD HEAD & REMOVE TAIL
function snakeShift() {
    // add a set of coordinates to the snake array
    detectWalls();
    newHead = {x: snake[0].x+dx, y: snake[0].y+dy}
    snake.unshift(newHead);
    snake.pop();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    createNewFood();
    drawSnake();
}

function snakeMovement() {
    //When I click on the up arrow
    $(".up.arr").on("click", function(){
        // add a block +10 y above the head
        dx = 0;
        dy = -10;
        // snakeShift(); // bug detection
    })
    $(".down.arr").on("click", function(){
        // add a block +10 y above the head
        dx = 0;
        dy = 10;  
        // snakeShift(); // bug detection
    })
    $(".left.arr").on("click", function(){
        // add a block +10 y above the head
        dx = -10;
        dy = 0; 
        // snakeShift(); // bug detection
    })
    $(".right.arr").on("click", function(){
        // add a block +10 y above the head
        dx = 10;
        dy = 0;
        // snakeShift(); // bug detection
    })
}

// COLLISION DETECTION  || snake[0].y == 10 || snake[0].x == 410 || snake[0].x == 310
function detectWalls(){
console.log("checking for collision");
   if (snake[0].x == 10 || snake[0].y == 310 || snake[0].x == 470 || snake[0].y == 10){
       clearInterval(set);
       console.log("working?!");
   }
// tried putting it inside of the snakemovement but should be  snakshift...
// tough to detect walls because the top of the head begins a the top left corner. so I have to set the coundary -20 instead of -10
}

// CREATE APPLE + Check if head touch apple
function createNewFood() {
    //randomly create 10x10 red square within the canvas 
    // foodX = Math.floor(Math.random() * canvas.width);
    // foodY = Math.floor(Math.random() * canvas.height); 
    ctx.fillStyle = 'red';
    ctx.strokeStyle = 'darkgreen';
    ctx.strokeRect(foodX, foodY, snakeSize, snakeSize);
    ctx.fillRect(foodX, foodY, snakeSize, snakeSize);
}

snakeMovement();
drawSnake();
createNewFood();    

let set = setInterval(snakeShift, snakeSpeed);



// function noBackwards()
// function detectSelf(){}





