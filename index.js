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
  const $rankSelect = document.getElementById('rankSelect');
  const $playBtn = document.getElementById('playBtn');
  const $passBtn = document.getElementById('passBtn');
  const $centerPile = document.getElementById('centerPile');
  const $log = document.getElementById('log');

  let state = {
    deck: [],
    players: [],
    human: [],
    currentRank: 'a'
  };

  const shuffle = arr => arr.sort(() => Math.random() - 0.5);
  const createDeck = () => SUITS.flatMap(s => RANKS.map(r => ({ rank: r, suit: s })));
  const cardLabel = card => `${card.rank}${card.suit}`;

  const renderCards = cards => cards.map(card => {
    const el = document.createElement('div');
    el.className = 'card';
    el.textContent = cardLabel(card);
    return el;
  });

  const updateHumanHand = () => {
    $humanHand.innerHTML = '';
    renderCards(state.human).forEach(el => $humanHand.appendChild(el));
  };

  const updatePlayers = () => {
    $players.innerHTML = '';
    state.players.forEach(player => {
      const item = document.createElement('div');
      item.className = 'player';
      item.textContent = `${player.name} · ${player.count}`;
      $players.appendChild(item);
    });
  };

  const deal = (count, bots) => {
    state.deck = shuffle(createDeck());
    state.human = state.deck.splice(0, count);
    state.players = Array.from({ length: bots }, (_, i) => ({
      name: `bot ${i + 1}`,
      count
    }));
  };

  const startGame = () => {
    const bots = Number($botCount.value) || 1;
    const cards = $cardsPerPlayer.value === 'auto' ? 5 : Number($cardsPerPlayer.value);
    deal(cards, bots);
    updateHumanHand();
    updatePlayers();
    $setup.hidden = true;
    $game.hidden = false;
    $actionBar.classList.remove('hidden');
    $rankSelect.value = state.currentRank;
    $centerPile.textContent = 'ready';
    $log.textContent = `started ${bots} bot${bots === 1 ? '' : 's'}`;
  };

  $startBtn.addEventListener('click', startGame);

  $playBtn.addEventListener('click', () => {
    state.currentRank = $rankSelect.value;
    $log.textContent = `play ${state.currentRank}`;
  });

  $passBtn.addEventListener('click', () => {
    $log.textContent = 'pass';
  });

  $rankSelect.innerHTML = RANKS.map(r => `<option value="${r}">${r}</option>`).join('');
})();
     
