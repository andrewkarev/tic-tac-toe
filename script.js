// Tic tac toe script
const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.querySelector('#board');
const winningMessageElement = document.querySelector('#winning-message');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
const restartButton = document.querySelector('#restart-button');
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const SCORE_X = document.querySelector('.score__element_x');
const SCORE_CIRCLE = document.querySelector('.score__element_circle');
let circleTurn;
let scoreCounterX = 0;
let scoreCounterCircle = 0;

startGame();

restartButton.addEventListener('click', startGame)

function startGame() {
  circleTurn = false;

  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
  })

  setBoardHoverClass();

  winningMessageElement.classList.remove('show');
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  placeMark(cell, currentClass);

  if (checkWin(currentClass)) {
    endgame(false)
  } else if (isDraw()) {
    endgame(true)
  } else {
    swapTurns();
    setBoardHoverClass();
  }
}

function endgame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = 'Ничья!'
  } else {
    winningMessageTextElement.innerText = `Победу одержал игрок '${circleTurn ? 'O' : 'X'}'!`;
    scoreUpdate();
  }

  winningMessageElement.classList.add('show');
}

function scoreUpdate() {
  circleTurn ? scoreCounterCircle++ : scoreCounterX++;
  SCORE_X.innerText = scoreCounterX;
  SCORE_CIRCLE.innerText = scoreCounterCircle;
}

function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
  })
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
  circleTurn = !circleTurn;
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);

  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass)
    })
  })
}


console.log(SCORE_X)
console.log(SCORE_CIRCLE)