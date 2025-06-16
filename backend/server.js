const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

const suits = ['♠', '♥', '♦', '♣'];
const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

let currentDeck = createDeck();

function createDeck() {
  const deck = [];
  suits.forEach(suit => {
    ranks.forEach(rank => {
      deck.push({ suit, rank, value: getRankValue(rank) });
    });
  });
  return deck;
}

function getRankValue(rank) {
  if (rank === 'A') return 1;
  if (rank === 'J') return 11;
  if (rank === 'Q') return 12;
  if (rank === 'K') return 13;
  return parseInt(rank);
}

function shuffleDeck(deck) {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function bubbleSort(deck) {
  const sorted = [...deck];
  const n = sorted.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (sorted[j].value > sorted[j + 1].value) {
        [sorted[j], sorted[j + 1]] = [sorted[j + 1], sorted[j]];
      }
    }
  }
  return sorted;
}

function mergeSort(deck) {
  if (deck.length <= 1) return deck;

  const mid = Math.floor(deck.length / 2);
  const left = mergeSort(deck.slice(0, mid));
  const right = mergeSort(deck.slice(mid));

  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex].value <= right[rightIndex].value) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }

  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

app.get('/api/deck', (req, res) => {
  res.json({
    success: true,
    deck: currentDeck,
    message: 'Current deck state'
  });
});

app.get('/api/cards', (req, res) => {
  res.json({
    success: true,
    deck: currentDeck,
    message: 'Current deck state (from /api/cards)'
  });
});

app.post('/api/shuffle', (req, res) => {
  try {
    currentDeck = shuffleDeck(currentDeck);
    res.json({
      success: true,
      deck: currentDeck,
      message: 'Deck shuffled successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error shuffling deck',
      error: error.message
    });
  }
});

app.post('/api/sort', (req, res) => {
  try {
    const sortingMethods = [bubbleSort, mergeSort];
    const selectedMethod = sortingMethods[Math.floor(Math.random() * sortingMethods.length)];
    const methodName = selectedMethod === bubbleSort ? 'Bubble Sort' : 'Merge Sort';

    currentDeck = selectedMethod(currentDeck);

    res.json({
      success: true,
      deck: currentDeck,
      message: `Deck sorted using ${methodName}`,
      algorithm: methodName
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error sorting deck',
      error: error.message
    });
  }
});

app.post('/api/reset', (req, res) => {
  try {
    currentDeck = createDeck();
    res.json({
      success: true,
      deck: currentDeck,
      message: 'Deck reset to initial state'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error resetting deck',
      error: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
