import {
  SNAKE_SPEED,
  updateGame as updateSnake,
  drawElement as drawSnake,
  getSnakeHead,
  snakeIntersection,
} from "./snake.js";
import { updateGame as updateFood, drawElement as drawFood } from "./food.js";
import { outsideGrid } from "./grid.js";

const gameBoard = document.getElementById("game-board");

let lastRenderTime = 0;
let gameOver = false;

function main(currentTime) {
  if (gameOver) {
    if (confirm("You lose, Press OK to restart.")) {
      window.location = "/Snake_Game";
    }
    return;
  }

  window.requestAnimationFrame(main);
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;

  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;

  lastRenderTime = currentTime;

  updateGame();
  drawElement();
}

window.requestAnimationFrame(main);

function updateGame() {
  updateSnake();
  updateFood();
  checkDeath();
}

function drawElement() {
  gameBoard.innerHTML = "";
  drawSnake(gameBoard);
  drawFood(gameBoard);
}

function checkDeath() {
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}
