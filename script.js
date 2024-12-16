'use strict';

// Constants
const INITIAL_SCORE = 20;
const MAX_NUMBER = 20;
const WINNING_COLOR = '#60b347';
const INITIAL_COLOR = '#000000';

// Game state
let currentScore = INITIAL_SCORE;
let highScore = 0;
const correctNumber = Math.trunc(Math.random() * MAX_NUMBER) + 1;

// DOM selectors
const selectors = {
  guess: '.guess',
  message: '.message',
  number: '.number',
  score: '.label-score',
  highscore: '.label-highscore',
};

// Game messages
const messages = {
  noNumber: '⛔ No Number!',
  tooLow: '📉 Too low!',
  tooHigh: '📉 Too high!',
  correct: '🎉 Correct Number!',
  lost: '💥 You lost the game!',
};

// Helper functions
const getElement = selector => document.querySelector(selector);
const updateText = (selector, text) =>
  (getElement(selector).textContent = text);
const updateScore = score => updateText(selectors.score, `💯 Score: ${score}`);

const handleGuess = () => {
  const guess = Number(getElement(selectors.guess).value);

  if (!guess || currentScore === 0) {
    updateText(selectors.message, messages.noNumber);
    return;
  }

  if (guess === correctNumber) {
    handleWin();
    return;
  }

  handleWrongGuess(guess);
};

const handleWin = () => {
  updateText(selectors.message, messages.correct);
  updateText(selectors.number, correctNumber);
  updateText(selectors.highscore, `🥇 Highscore: ${currentScore}`);
  getElement(selectors.number).style.width = '30rem';
  document.body.style.backgroundColor = WINNING_COLOR;
};

const handleWrongGuess = guess => {
  currentScore--;
  const message = guess < correctNumber ? messages.tooLow : messages.tooHigh;
  updateText(selectors.message, message);
  updateScore(currentScore);

  if (currentScore === 0) {
    updateText(selectors.message, messages.lost);
  }
};

const resetGame = () => {
  currentScore = INITIAL_SCORE;
  updateScore(currentScore);
  updateText(selectors.number, '?');
  document.body.style.backgroundColor = INITIAL_COLOR;
  getElement(selectors.guess).value = '';
};

// Event listeners
getElement('.check').addEventListener('click', handleGuess);
getElement('.again').addEventListener('click', resetGame);

// check correct number;
console.log('correctNumber is ' + correctNumber);
