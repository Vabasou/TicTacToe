const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessageElement = document.getElementById('winningMessage');
const restartButton = document.getElementById('restartButton');
const nextGameButton = document.getElementById('nextGameButton');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
const firstPlayerScore = document.getElementById('firstPlayerScore');
const secondPlayerScore = document.getElementById('secondPlayerScore');
const firstPlayerTextElement = document.getElementById('firstPlayer');
const secondPlayerTextElement = document.getElementById('secondPlayer');
const firstPlayer = document.getElementById('firstPlayerInput');
const secondPlayer = document.getElementById('secondPlayerInput');
const playGameButton = document.getElementById('playGame');
const firstPlayerSign = document.getElementById('current_left_sign');
const secondPlayerSign = document.getElementById('current_right_sign');

const navBar = document.querySelector('.navBar');
const loginForm = document.getElementById('loginBox');

let circleTurn;
let Player1 = false;
let Player2 = true;

let firstPlayerCurrentScore = 0;
let secondPlayerCurrentScore = 0;

function createNames() {
    firstPlayerTextElement.innerText = firstPlayer.value;
    secondPlayerTextElement.innerText = secondPlayer.value;
}

playGameButton.addEventListener('click', (event) => {
    event.preventDefault();
    createNames();
    document.body.style.background = 'none';
    loginForm.style.display = 'none';

    firstPlayerSign.classList.add(X_CLASS);
    secondPlayerSign.classList.add(CIRCLE_CLASS);

    navBar.classList.add('show');
    board.classList.add('show');
})

restartButton.addEventListener('click', restartGame);

function restartGame() {
    startGame();
    navBar.classList.remove('show');
    board.classList.remove('show');
    
    firstPlayerTextElement.innerText = '';
    secondPlayerTextElement.innerText = '';

    document.body.style.background = '#16151d';
    loginForm.style.display = 'flex';
}

startGame();

nextGameButton.addEventListener('click', startGame)

function startGame() {
    circleTurn = false
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once: true})
    });
    winningMessageElement.classList.remove('show');
}

function handleClick(e) {
    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;

    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
    }
}

function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = 'Draw!';
    } else {
        if (circleTurn) {
            if (circleTurn == Player2) {
                secondPlayerCurrentScore += 1;
            } else firstPlayerCurrentScore += 1;
        } else {
            if (circleTurn == Player1) {
                firstPlayerCurrentScore += 1;
            }
            else secondPlayerCurrentScore += 1;
        }
        if (firstPlayerSign.classList.contains(X_CLASS)) {
            firstPlayerSign.classList.remove(X_CLASS);
            secondPlayerSign.classList.remove(CIRCLE_CLASS);
            firstPlayerSign.classList.add(CIRCLE_CLASS);
            secondPlayerSign.classList.add(X_CLASS);
        } else {
            firstPlayerSign.classList.remove(CIRCLE_CLASS);
            secondPlayerSign.classList.remove(X_CLASS);
            firstPlayerSign.classList.add(X_CLASS);
            secondPlayerSign.classList.add(CIRCLE_CLASS);
        }
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Won!`;
        [Player1, Player2] = [Player2, Player1];
    }
    firstPlayerScore.innerText = firstPlayerCurrentScore;
    secondPlayerScore.innerText = secondPlayerCurrentScore;
    winningMessageElement.classList.add('show');
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

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {   //grazina true, jeigu combinations praeina pro visus variantus ir yra teisingai
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}