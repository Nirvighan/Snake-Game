// function setup() {
//   createCanvas(800,400);
//   createSprite(400, 200, 50, 50);
// }

// function draw() {
//   background(255,255,255);  
//   drawSprites();
// }







// the snake is divided into small segments, which are drawn and edited on each 'draw' call

let snakeNumSegments = 10;
let direction = 'right';

const startingX = 0; //starting x coordinate for snake
const startingY = 250; //starting y coordinate for snake
const difference = 10; // the size of snake's one segment


// x and y coordinate for the snake

let xCoordinate = [];
let yCoordinate = [];


//x and y coordinate for the food
let foodX = 0;
let foodY = 0;


let scoreText;

function setup()
{
  
  //show the score
  scoreText = createDiv('Score = 0');
  scoreText.position(20, 20);
  scoreText.id = 'score';
  scoreText.style('color', 'red');

  //create the canvas
  createCanvas(600, 600);
  
  //call the update food coordinate function
  frameRate(25);
  stroke(255);
  strokeWeight(10);
  updateFoodPosition();

  //run a for loop for the snake's starting position
  for (let i = 0; i < snakeNumSegments; i++) 
  {
    xCoordinate.push(startingX + i * difference);
    yCoordinate.push(startingY);
  }
}

function draw() 
{
  
  //clear the background
  background(0);
  
  // run a for loop for making the snake look like a moving line
  for (let i = 0; i < snakeNumSegments - 1; i++) 
  {
    line(xCoordinate[i], yCoordinate[i], xCoordinate[i + 1], yCoordinate[i + 1]);
  }
  
  //call all the functions
  updateSnakePosition();
  checkBoundaries();
  checkFoodCollision();
}



//create the function for the snake's last segement's coordinate update when the snake goes in different directions . this makes the snake's movement more attractive

function updateSnakePosition() 
{
  for (let i = 0; i < snakeNumSegments - 1; i++) 
  {
    xCoordinate[i] = xCoordinate[i + 1];
    yCoordinate[i] = yCoordinate[i + 1];
  }
  
  
  switch (direction)
  {
    case 'right':
      xCoordinate[snakeNumSegments - 1] = xCoordinate[snakeNumSegments - 2] + difference;
      yCoordinate[snakeNumSegments - 1] = yCoordinate[snakeNumSegments - 2];
      break;
      
      
    case 'up':
      xCoordinate[snakeNumSegments - 1] = xCoordinate[snakeNumSegments - 2];
      yCoordinate[snakeNumSegments - 1] = yCoordinate[snakeNumSegments - 2] - difference;
      break;
      
      
    case 'left':
      xCoordinate[snakeNumSegments - 1] = xCoordinate[snakeNumSegments - 2] - difference;
      yCoordinate[snakeNumSegments - 1] = yCoordinate[snakeNumSegments - 2];
      break;
      
      
    case 'down':
      xCoordinate[snakeNumSegments - 1] = xCoordinate[snakeNumSegments - 2];
      yCoordinate[snakeNumSegments - 1] = yCoordinate[snakeNumSegments - 2] + difference;
      break;
  }
}



//create a function to make  that if the snake's head is touching the game boundaries or if the snake hits itself so make the game end
function checkBoundaries()
{
  if (
    xCoordinate[xCoordinate.length - 1] > width ||
    xCoordinate[xCoordinate.length - 1] < 0 ||
    yCoordinate[yCoordinate.length - 1] > height ||
    yCoordinate[yCoordinate.length - 1] < 0 ||
    checkSnakeCollision()
  ) 
  {
    noLoop();
    const scoreVal = parseInt(scoreText.html().substring(8));
    scoreText.html('Game ended! Your score was : ' + scoreVal);
  }
}



//create a function to make the snake collision
function checkSnakeCollision() 
{
  const snakeHeadX = xCoordinate[xCoordinate.length - 1];
  const snakeHeadY = yCoordinate[yCoordinate.length - 1];
  
  
  for (let i = 0; i < xCoordinate.length - 1; i++) {
    if (xCoordinate[i] === snakeHeadX && yCoordinate[i] === snakeHeadY)     {
      return true;
    }
  }
}



//create a function for that when snake eats the food so its size becomes big and call the function here for the food to reappear randomly.


function checkFoodCollision() 
{
  point(foodX, foodY);
  
  
  if (xCoordinate[xCoordinate.length - 1] === foodX && yCoordinate[yCoordinate.length - 1] === foodY) 
  {
    const prevScore = parseInt(scoreText.html().substring(8));
    scoreText.html('Score = ' + (prevScore + 1));
    xCoordinate.unshift(xCoordinate[0]);
    yCoordinate.unshift(yCoordinate[0]);
    snakeNumSegments++;
    updateFoodPosition();
  }
}


// craetes a function to update the food position when snake eats it
function updateFoodPosition() 
{

  foodX = floor(random(10, (width - 100) / 10)) * 10;
  foodY = floor(random(10, (height - 100) / 10)) * 10;
}


//make the snake move with arrow keys

function keyPressed() 
{
  switch (keyCode) 
  {
    case 37:
      if (direction !== 'right') 
      {
        direction = 'left';
      }
      break;
      
    case 39:
      if (direction !== 'left') 
      {
        direction = 'right';
      }
      break;
      
    case 38:
      if (direction !== 'down')
      {
        direction = 'up';
      }
      break;
      
    case 40:
      if (direction !== 'up') {
        direction = 'down';
      }
      break;
  }
}
