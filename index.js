(() => {
  const SUITS = ['♠', '♥', '♦', '♣'];
  const RANKS = ['a', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'j', 'q', 'k'];

  const $setup = document.getElementById('setup');
  const $game = document.getElementById('game');
  const $startBtn = document.getElementById('startBtn');
  const $botCount = document.getElementById('botCount');
  const $cardsPerPlayer = document.getElementById('cardsPerPlayer');
  const $players = document.getElementById('players');
  const $humanHand = document.getElementById('humanHand');
  const $actionBar = document.getElementById('actionBar');
  const $playBtn = document.getElementById('playBtn');
  const $passBtn = document.getElementById('passBtn');
  const $centerPile = document.getElementById('centerPile');
  const $log = document.getElementById('log');

  const state = {
    players: [],
    pile: [],
    currentIndex: 0,
    selected: null,
    active: false
  };

  const shuffle = array => {
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const createDeck = () => {
    const deck = [];
    SUITS.forEach(suit => {
      RANKS.forEach(rank => deck.push({ rank, suit }));
    });
    return deck;
  };

  const cardLabel = card => `${card.rank}${card.suit}`;

  const setMessage = text => {
    $log.textContent = text;
  };

  const getCurrentPlayer = () => state.players[state.currentIndex];

  const renderPlayers = () => {
    $players.innerHTML = '';
    state.players.forEach((player, index) => {
      const item = document.createElement('div');
      item.className = `player${index === state.currentIndex ? ' active' : ''}`;
      item.textContent = `${player.name} · ${player.hand.length}`;
      $players.appendChild(item);
    });
  };

  const renderHand = () => {
    $humanHand.innerHTML = '';
    const human = state.players[0] || { hand: [] };
    human.hand.forEach((card, index) => {
      const item = document.createElement('div');
      item.className = 'card';
      item.textContent = cardLabel(card);
      item.dataset.index = index;
      if (state.selected === index) {
        item.classList.add('selected');
      }
      item.addEventListener('click', () => {
        if (!state.active || state.currentIndex !== 0) {
          return;
        }
        state.selected = state.selected === index ? null : index;
        renderHand();
        updateControls();
      });
      $humanHand.appendChild(item);
    });
  };

  const updateControls = () => {
    const humanTurn = state.active && state.currentIndex === 0;
    $actionBar.classList.toggle('hidden', !humanTurn);
    $playBtn.disabled = !humanTurn || state.selected === null;
  };

  const animateCenter = value => {
    $centerPile.textContent = value;
    $centerPile.classList.add('pulse');
    window.setTimeout(() => $centerPile.classList.remove('pulse'), 300);
  };

  const finishGame = winnerIndex => {
    state.active = false;
    if (winnerIndex === 0) {
      setMessage('you win');
    } else {
      setMessage(`${state.players[winnerIndex].name} wins`);
    }
    updateControls();
  };

  const nextTurn = () => {
    state.selected = null;
    state.currentIndex = (state.currentIndex + 1) % state.players.length;
    render();
    if (state.active && state.currentIndex !== 0) {
      window.setTimeout(botTurn, 500);
    }
  };

  const render = () => {
    renderPlayers();
    renderHand();
    updateControls();
  };

  const dealHands = (playerCount, cardCount) => {
    const deck = shuffle(createDeck());
    state.players = [{ name: 'you', hand: deck.splice(0, cardCount) }];
    for (let i = 0; i < playerCount; i += 1) {
      state.players.push({ name: `bot ${i + 1}`, hand: deck.splice(0, cardCount) });
    }
  };

  const playCard = (playerIndex, cardIndex) => {
    const player = state.players[playerIndex];
    const card = player.hand.splice(cardIndex, 1)[0];
    state.pile.unshift(card);
    animateCenter(cardLabel(card));
    if (player.hand.length === 0) {
      finishGame(playerIndex);
      return;
    }
    setMessage(`${player.name} played ${cardLabel(card)}`);
    nextTurn();
  };

  const botTurn = () => {
    if (!state.active || state.currentIndex === 0) {
      return;
    }
    const bot = getCurrentPlayer();
    if (!bot.hand.length) {
      finishGame(state.currentIndex);
      return;
    }
    const choice = Math.floor(Math.random() * bot.hand.length);
    playCard(state.currentIndex, choice);
  };

  const startGame = () => {
    const botCount = Math.max(1, Math.min(3, Number($botCount.value)));
    let cardCount = $cardsPerPlayer.value === 'auto' ? Math.floor(52 / (botCount + 1)) : Number($cardsPerPlayer.value);
    cardCount = Math.max(3, Math.min(cardCount, 13));
    dealHands(botCount, cardCount);
    state.pile = [];
    state.currentIndex = 0;
    state.selected = null;
    state.active = true;
    setMessage(`started ${botCount} bot${botCount > 1 ? 's' : ''}`);
    $setup.classList.add('hidden');
    $game.classList.remove('hidden');
    render();
  };

  $startBtn.addEventListener('click', startGame);

  $playBtn.addEventListener('click', () => {
    if (state.currentIndex !== 0 || state.selected === null) {
      return;
    }
    playCard(0, state.selected);
  });

  $passBtn.addEventListener('click', () => {
    if (!state.active || state.currentIndex !== 0) {
      return;
    }
    setMessage('you passed');
    nextTurn();
  });

  render();
})();
     
