document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    let cardValues = [
      'images/card-one.png', 'images/card-one.png',
      'images/card-two.png', 'images/card-two.png',
      'images/card-three.png', 'images/card-three.png',
      'images/card-four.png', 'images/card-four.png',
      'images/card-five.png', 'images/card-five.png',
      'images/card-six.png', 'images/card-six.png',
      'images/card-seven.png', 'images/card-seven.png',
      'images/card-eight.png', 'images/card-eight.png',
      'images/card-nine.png', 'images/card-nine.png',
      'images/card-ten.png', 'images/card-ten.png'
    ];
    let flippedCards = [];
    let matchesFound = 0;
    let attempts = 0;
  
    function shuffleCards() {
      cardValues = shuffleArray(cardValues);
      gameBoard.innerHTML = ''; // clear spel hihi
      cardValues.forEach(value => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = value;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
      });
    }
  
    function flipCard() {
      if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        const imgElement = document.createElement('img');
        imgElement.src = this.dataset.value;
        imgElement.alt = "Memory card";
        this.appendChild(imgElement);
        flippedCards.push(this);
  
        if (flippedCards.length === 2) {
          attempts++;
          setTimeout(checkForMatch, 200); // even stop voordat je weer mag proberen
        }
      }
    }
  
    function checkForMatch() {
      const [card1, card2] = flippedCards;
      if (card1.dataset.value === card2.dataset.value) {
        matchesFound++;
        flippedCards = [];
        if (matchesFound === cardValues.length / 2) {
          setTimeout(endGame, 500);
        }
      } else {
        setTimeout(() => {
          card1.classList.remove('flipped');
          card2.classList.remove('flipped');
          card1.innerHTML = '';
          card2.innerHTML = '';
          flippedCards = [];
        }, 1000);
      }
    }
  
    function endGame() {
      document.getElementById('end-game-message').style.display = 'flex';
    }
  
    function resetGame() {
      document.getElementById('end-game-message').style.display = 'none';
      flippedCards = [];
      matchesFound = 0;
      attempts = 0;
      shuffleCards();
    }
  
    document.getElementById('restart-game').addEventListener('click', resetGame);
  
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
  
    shuffleCards(); 
  });