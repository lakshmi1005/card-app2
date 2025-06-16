const request = require('supertest');
server = require('./server'); 

let server;

beforeAll(() => {
});

afterAll((done) => {
  if (server && server.close) server.close(done);
  else done();
});

function isDeckValid(deck) {
  if (!Array.isArray(deck) || deck.length !== 52) return false;
  const seen = new Set();
  for (const card of deck) {
    if (!card.suit || !card.rank || typeof card.value !== 'number') return false;
    seen.add(card.suit + card.rank);
  }
  return seen.size === 52;
}

describe('Card Deck API', () => {
  let initialDeck;

  test('GET /api/deck returns a valid 52-card deck', async () => {
    const res = await request(server).get('/api/deck');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(isDeckValid(res.body.deck)).toBe(true);
    initialDeck = res.body.deck;
  });

  test('POST /api/shuffle shuffles the deck', async () => {
    const res = await request(server).post('/api/shuffle');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(isDeckValid(res.body.deck)).toBe(true);
    const shuffledDeck = res.body.deck;
    const sameOrder = shuffledDeck.every((card, i) =>
      initialDeck && card.suit === initialDeck[i].suit && card.rank === initialDeck[i].rank
    );
    expect(sameOrder).toBe(false);
  });

  test('POST /api/sort sorts the deck', async () => {
    const res = await request(server).post('/api/sort');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(isDeckValid(res.body.deck)).toBe(true);
    expect(['Bubble Sort', 'Merge Sort']).toContain(res.body.algorithm);
    const sortedDeck = res.body.deck;
    for (let i = 1; i < sortedDeck.length; i++) {
      expect(sortedDeck[i].value).toBeGreaterThanOrEqual(sortedDeck[i - 1].value);
    }
  });

  test('POST /api/reset resets the deck to initial state', async () => {
    const res = await request(server).post('/api/reset');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(isDeckValid(res.body.deck)).toBe(true);
    const freshRes = await request(server).get('/api/deck');
    expect(freshRes.body.deck).toEqual(res.body.deck);
  });

});