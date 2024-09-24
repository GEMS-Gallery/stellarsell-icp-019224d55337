import { backend } from 'declarations/backend';

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact-form');
  const startGameButton = document.getElementById('start-game');
  const gameBoard = document.getElementById('game-board');
  const gameTimer = document.getElementById('game-timer');
  const gameScore = document.getElementById('game-score');

  let gameInterval;
  let gameTime = 0;
  let score = 0;
  let flippedCards = [];
  let matchedPairs = 0;

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    try {
      await backend.submitContact(name, email, message);
      alert('Thank you for your message. We will get back to you soon!');
      contactForm.reset();
    } catch (error) {
      console.error('Error submitting contact form:', error);
      alert('There was an error submitting your message. Please try again later.');
    }
  });

  startGameButton.addEventListener('click', startGame);

  async function startGame() {
    gameBoard.innerHTML = '';
    gameTime = 0;
    score = 0;
    matchedPairs = 0;
    flippedCards = [];
    updateGameStats();

    const numbers = await backend.getRandomNumbers(8);
    const cards = [...numbers, ...numbers].sort(() => Math.random() - 0.5);

    cards.forEach((number, index) => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.dataset.cardIndex = index;
      card.dataset.cardValue = number;
      card.addEventListener('click', flipCard);
      gameBoard.appendChild(card);
    });

    startGameButton.disabled = true;
    gameInterval = setInterval(() => {
      gameTime++;
      updateGameStats();
    }, 1000);
  }

  function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
      this.classList.add('flipped');
      this.textContent = this.dataset.cardValue;
      flippedCards.push(this);

      if (flippedCards.length === 2) {
        setTimeout(checkMatch, 1000);
      }
    }
  }

  function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.cardValue === card2.dataset.cardValue) {
      card1.removeEventListener('click', flipCard);
      card2.removeEventListener('click', flipCard);
      matchedPairs++;
      score += 10;
    } else {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      card1.textContent = '';
      card2.textContent = '';
      score = Math.max(0, score - 1);
    }

    flippedCards = [];
    updateGameStats();

    if (matchedPairs === 8) {
      endGame();
    }
  }

  function updateGameStats() {
    gameTimer.textContent = `Time: ${gameTime}s`;
    gameScore.textContent = `Score: ${score}`;
  }

  function endGame() {
    clearInterval(gameInterval);
    startGameButton.disabled = false;
    alert(`Congratulations! You completed the game in ${gameTime} seconds with a score of ${score}.`);
  }
});
