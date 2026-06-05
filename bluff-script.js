/* -------------------------------------------------
   Bluff (Cheat) – Game Engine
   ------------------------------------------------- */
(() => {
  // ----- Constants -------------------------------------------------
  const SUITS = ['♠', '♥', '♦', '♣'];
  const RANKS = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
  const COLORS = {
    blue:   getComputedStyle(document.documentElement).getPropertyValue('--accent-blue').trim(),
    green:  getComputedStyle(document.documentElement).getPropertyValue('--accent-green').trim(),
    purple: getComputedStyle(document.documentElement).getPropertyValue('--accent-purple').trim()
  };
  const MAX_CARDS_PLAY = 4; // per turn

  // ----- DOM cache -------------------------------------------------
  const $setup = document.getElementById('setup');
  const $game = document.getElementById('game');
  const $startBtn = document.getElementById('startBtn');
  const $botCount = document.getElementById('botCount');
  const $cardsPerPlayer = document.getElementById('cardsPerPlayer');
  const $playersContainer = document.getElementById('playersContainer');
  const $humanHand = document.getElementById('humanHand');
  const $actionBar = document.getElementById('actionBar');
  const $rankSelect = document.getElementById('rankSelect');
  const $playBtn = document.getElementById('playBtn');
  const $bluffBtn = document.getElementById('bluffBtn');
  const $passBtn = document.getElementById('passBtn');
  const $centerPile = document.getElementById('centerPile');
  const $claimOverlay = document.getElementById('claimOverlay');
  const $logToggle = document.getElementById('logToggle');
  const $gameLog = document.getElementById('gameLog');
  const $logList = document.getElementById('logList');

  // ----- Game state ------------------------------------------------
  let state = {
    players: [],          // array of player objects
    deck: [],             // remaining cards
    pile: [],             // cards currently on table (face‑down)
    currentRank: null,    // rank being claimed this round
    currentPlayerIdx: 0,  // index in players[]
    roundStarted: false, // true after first claim of a round
    awaitingChallenge: false, // true after a claim, before next turn
    log: []               // strings for UI log
  };

  // ----- Utility helpers -------------------------------------------
  const shuffle = arr => arr.sort(() => Math.random() - 0.5);
  const createDeck = () => {
    const deck = [];
    for (const s of SUITS) {
     /* -------------------------------------------------
   Bluff (Cheat) – Game Engine
   ------------------------------------------------- */
(() => {
  // ----- Constants -------------------------------------------------
  const SUITS = ['♠', '♥', '♦', '♣'];
  const RANKS = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
  const COLORS = {
    blue:   getComputedStyle(document.documentElement).getPropertyValue('--accent-blue').trim(),
    green:  getComputedStyle(document.documentElement).getPropertyValue('--accent-green').trim(),
    purple: getComputedStyle(document.documentElement).getPropertyValue('--accent-purple').trim()
  };
  const MAX_CARDS_PLAY = 4; // per turn

  // ----- DOM cache -------------------------------------------------
  const $setup = document.getElementById('setup');
  const $game = document.getElementById('game');
  const $startBtn = document.getElementById('startBtn');
  const $botCount = document.getElementById('botCount');
  const $cardsPerPlayer = document.getElementById('cardsPerPlayer');
  const $playersContainer = document.getElementById('playersContainer');
  const $humanHand = document.getElementById('humanHand');
  const $actionBar = document.getElementById('actionBar');
  const $rankSelect = document.getElementById('rankSelect');
  const $playBtn = document.getElementById('playBtn');
  const $bluffBtn = document.getElementById('bluffBtn');
  const $passBtn = document.getElementById('passBtn');
  const $centerPile = document.getElementById('centerPile');
  const $claimOverlay = document.getElementById('claimOverlay');
  const $logToggle = document.getElementById('logToggle');
  const $gameLog = document.getElementById('gameLog');
  const $logList = document.getElementById('logList');

  // ----- Game state ------------------------------------------------
  let state = {
    players: [],          // array of player objects
    deck: [],             // remaining cards
    pile: [],             // cards currently on table (face‑down)
    currentRank: null,    // rank being claimed this round
    currentPlayerIdx: 0,  // index in players[]
    roundStarted: false, // true after first claim of a round
    awaitingChallenge: false, // true after a claim, before next turn
    log: []               // strings for UI log
  };

  // ----- Utility helpers -------------------------------------------
  const shuffle = arr => arr.sort(() => Math.random() - 0.5);
  const createDeck = () => {
    const deck = [];
    for (const s of SUITS) {
     
