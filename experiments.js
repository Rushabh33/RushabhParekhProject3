const canvas = $("#myCanvas").get(0);
const ctx = canvas.getContext('2d');

let snakeX = canvas.width/2;
let snakeY = canvas.height-30;
let dx = 2;
let dy = -2;
let snake1Coordinates = snakeX;
let acceleration = 1;
let snake = [
    {x: 150, y: 150},
    {x: 140, y: 150},
    {x: 130, y: 150},
    {x: 120, y: 150},
    {x: 110, y: 150},
  ];




function drawSnake() {
    ctx.beginPath();
    ctx.rect(snakeX, snakeY, 10, 10);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}

function detectWalls() {
    if(snakeX + dx > canvas.width || snakeX + dx < 0){
        dx = -dx;
    }
    if(snakeY + dy > canvas.height || snakeY + dy < 0){
        dy = -dy;
    }
}

function moveSnake() {
    // Create contstant X movement
    snakeX += acceleration;
    // Press on key go up
    $(document).keydown(function(e){
        if (e.which === 38){
            event.preventDefault()
            console.log(e)
        }
    });
}

function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawSnake();
        detectWalls();
        snakeX += acceleration;
        // MOVING FUNCTION
        // snakeX += dx;
        // snakeY += dy;
        $(document).keydown(function(e){
            if (e.which === 38){
                event.preventDefault()
                console.log(e)
            }
        });
    } 


setInterval(draw, 10);







// ATTEMPT 2

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

function printSnake(snakeParts){
    for (i = 0; i < snakeParts.length; i++) {
        ctx.beginPath();
        ctx.fillStyle = 'lightgreen';
        ctx.strokeStyle = 'darkgreen';
        ctx.strokeRect(snakeParts[i].x, snakeParts[i].y, snakeSize, snakeSize);
        ctx.fillRect(snakeParts[i].x, snakeParts[i].y, snakeSize, snakeSize);
        ctx.closePath();
    }
};

function newHeadMove() {
    // add a set of coordinates to the snake array
    newHead = {x: headCoorX, y: headCoorY}
    snake.unshift(newHead);
    ctx.beginPath();
    ctx.fillStyle = 'lightgreen';
    ctx.strokeStyle = 'darkgreen';
    ctx.strokeRect(headCoorX, headCoorY, snakeSize, snakeSize);
    ctx.fillRect(headCoorX, headCoorY, snakeSize, snakeSize);
    ctx.closePath();
}

function removeTailMove(){
    snake.pop();
}

function noBackwards() {

}
// function detectWalls(){}
// function detectSelf(){}

function snakeMovement() {
    //When I click on the up arrow
    $(".up.arr").on("click", function(){
        // add a block +10 y above the head
        headCoorY -= 10;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        newHeadMove();
        removeTailMove();
        printSnake(snake)
    })
    $(".down.arr").on("click", function(){
        // add a block +10 y above the head
        headCoorY += 10;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        newHeadMove();
        removeTailMove();
        printSnake(snake)
    })
    $(".left.arr").on("click", function(){
        // add a block +10 y above the head
        headCoorX -= 10;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        newHeadMove();
        removeTailMove();
        printSnake(snake)
    })
    $(".right.arr").on("click", function(){
        // add a block +10 y above the head
        headCoorX += 10;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        newHeadMove();
        removeTailMove();
        printSnake(snake)
    })
}


snakeMovement();
printSnake(snake);

// setInterval(, 10); 



// ATTEMPT 3
const canvas = $("#myCanvas").get(0);
const ctx = canvas.getContext('2d');

let snake = [
    {x: 150, y: 150},
    {x: 140, y: 150},
    {x: 130, y: 150},
    {x: 120, y: 150},
    {x: 110, y: 150},
  ];
let snakeSize = 10
let headCoorX = snake[0].x;
let headCoorY = snake[0].y;
let dx = 10;
let dy = 0;

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

//ADD NEW SNAKE HEAD + REMOVE SNAKE TAIL
function snakeShift() {
    // add a set of coordinates to the snake array
    let newHead = {x: headCoorX, y: headCoorY}
    snake.unshift(newHead);
    // remove snake tail
    snake.pop();
}

function userMovement() {
    //When I click on the up arrow
    $(".up.arr").on("click", function(){
        // add a block +10dy    
        dy = -10;
        dx = 0;
        snakeShift();
        drawSnake();
    })
    $(".down.arr").on("click", function(){
        // add a block +10 y above the head
    })
    $(".left.arr").on("click", function(){
        // add a block +10 y above the head
    })
    $(".right.arr").on("click", function(){
        // add a block +10 y above the head
        
    })
}

userMovement();
snakeShift();
drawSnake();

// function no backwards
// function detectWalls(){}
// function detectSelf(){}


//ATTEMPT 4

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

function printSnake(snakeParts){
    for (i = 0; i < snakeParts.length; i++) {
        ctx.beginPath();
        ctx.fillStyle = 'lightgreen';
        ctx.strokeStyle = 'darkgreen';
        ctx.strokeRect(snakeParts[i].x, snakeParts[i].y, snakeSize, snakeSize);
        ctx.fillRect(snakeParts[i].x, snakeParts[i].y, snakeSize, snakeSize);
        ctx.closePath();
    }
};

function newHeadMove() {
    // add a set of coordinates to the snake array
    newHead = {x: headCoorX+dx, y: headCoorY+dy}
    snake.unshift(newHead);
    ctx.beginPath();
    ctx.fillStyle = 'lightgreen';
    ctx.strokeStyle = 'darkgreen';
    ctx.strokeRect(headCoorX, headCoorY, snakeSize, snakeSize);
    ctx.fillRect(headCoorX, headCoorY, snakeSize, snakeSize);
    ctx.closePath();
}

function removeTailMove(){
    snake.pop();
}

// function noBackwards() {}
// function detectWalls(){}
// function detectSelf(){}

function constantMoveUp(){
    dy = 10
    dx = 0
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    newHeadMove();
    removeTailMove();
    printSnake(snake)
}
function constantMoveDown(){
    headCoorY += 10;
    headCoorX += 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    newHeadMove();
    removeTailMove();
    printSnake(snake)
}
function constantMoveLeft(){
    headCoorX -= 10;
    headCoorY += 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    newHeadMove();
    removeTailMove();
    printSnake(snake)
}
function constantMoveRight(){
    headCoorX += 10;
    headCoorY += 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    newHeadMove();
    removeTailMove();
    printSnake(snake)

}


function snakeMovement() {
    //When I click on the up arrow
    $(".up.arr").on("click", function(){
        // add a block +10 y above the head
        setInterval(constantMoveUp, 100);
    })
    $(".down.arr").on("click", function(){
        // add a block +10 y above the head
        setInterval(constantMoveDown, 100);
    })
    $(".left.arr").on("click", function(){
        // add a block +10 y above the head
        setInterval(constantMoveLeft, 100);
    })
    $(".right.arr").on("click", function(){
        // add a block +10 y above the head
        setInterval(constantMoveRight, 100);
    })
}


snakeMovement();
printSnake(snake);

// ATTEMPT 5

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
    newHead = {x: snake[0].x+dx, y: snake[0].y+dy}
    snake.unshift(newHead);
    snake.pop();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
}

// function removeTailMove()
// function noBackwards()
// function detectWalls(){}
// function detectSelf(){}

function snakeMovement() {
    //When I click on the up arrow
    $(".up.arr").on("click", function(){
        // add a block +10 y above the head
        dx = 0;
        dy = -10;
        
    })
    $(".down.arr").on("click", function(){
        // add a block +10 y above the head
        dx = 0;
        dy = 10;
        
    })
    $(".left.arr").on("click", function(){
        // add a block +10 y above the head
        dx = -10;
        dy = 0;
        
    })
    $(".right.arr").on("click", function(){
        // add a block +10 y above the head
        dx = 10;
        dy = 0;
        // snakeShift()//  
    })
}


let interval = setInterval(snakeShift, 100);

snakeMovement();
drawSnake();