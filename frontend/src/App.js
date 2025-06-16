import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CardDeck from './components/CardDeck';
import Controls from './components/Controls';
import StatusMessage from './components/StatusMessage';
import './App.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

function App() {
  const [deck, setDeck] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [algorithm, setAlgorithm] = useState('');

  useEffect(() => {
    fetchDeck();
  }, []);

  const fetchDeck = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/deck`);
      setDeck(response.data.deck);
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error fetching deck');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const shuffleDeck = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${API_BASE_URL}/api/shuffle`);
      setDeck(response.data.deck);
      setMessage(response.data.message);
      setAlgorithm('');
    } catch (error) {
      setMessage('Error shuffling deck');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const sortDeck = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${API_BASE_URL}/api/sort`);
      setDeck(response.data.deck);
      setMessage(response.data.message);
      setAlgorithm(response.data.algorithm);
    } catch (error) {
      setMessage('Error sorting deck');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetDeck = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${API_BASE_URL}/api/reset`);
      setDeck(response.data.deck);
      setMessage(response.data.message);
      setAlgorithm('');
    } catch (error) {
      setMessage('Error resetting deck');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Card Shuffling & Sorting Application</h1>
        <StatusMessage message={message} algorithm={algorithm} />
      </header>
      
      <main className="App-main">
        <Controls
          onShuffle={shuffleDeck}
          onSort={sortDeck}
          onReset={resetDeck}
          loading={loading}
        />
        
        <CardDeck deck={deck} loading={loading} />
      </main>
    </div>
  );
}

export default App;