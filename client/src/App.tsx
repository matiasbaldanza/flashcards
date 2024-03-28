import './App.css'
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


import DeckCard, { DeckType } from './components/DeckCard';

const EMPTY_DECK: DeckType = {
  _id: '',
  title: '',
  description: '',
};

function App() {
  const [deckData, setDeckData] = useState<DeckType>(EMPTY_DECK);
  const [decks, setDecks] = useState<DeckType[]>([]);
  const navigate = useNavigate();

  async function handleCreateDeck(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5174/decks/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(deckData),
      });
      setDeckData(EMPTY_DECK);

      const newDeckData = await res.json();
      setDecks([...decks, newDeckData]);   // Optimistic update
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDeleteDeck(deckId: string) {
    await fetch(`http://localhost:5174/decks/${deckId}`, {
      method: 'DELETE',
    });
    // Optimistic update
    setDecks(decks.filter(deck => deck._id !== deckId));
  }

  function handleClickDeck(deckId: string) {
    navigate(`/decks/${deckId}`);
  }

  useEffect(() => {
    async function fetchDecks() {
      const response = await fetch('http://localhost:5174/decks/');
      const decks = await response.json();
      setDecks(decks);
    }
    fetchDecks();
  }, []);

  return (
    <div className='container mx-auto w-[80%] px-4'>
      <header>
        <h1 className='text-2xl font-bold text-black text-left'>
          Flashcards App
        </h1>
      </header>
      <main>
        <div
          className='grid grid-cols-3 gap-2 items-start mx-auto my-4'
        >
          {
            decks.map((deck: DeckType) => (
              <DeckCard
                key={deck._id}
                {...deck}
                actions={{
                  delete: handleDeleteDeck,
                  click: handleClickDeck
                }}
              />
            ))
          }
        </div>
        <div>
          <form
            className='flex flex-col gap-4 items-start my-4 py-4'
            onSubmit={handleCreateDeck}
          >
            <div
              className='flex flex-col gap-1 items-start'
            >
              <label
                className='mr-2 font-medium block'
                htmlFor="deck-title"
              >
                Deck Title
              </label>
              <input
                className='border border-gray-400 px-4 py-2 rounded-md'
                type="text"
                id="deck-title"
                name="deck-title"
                placeholder="Deck Title"
                value={deckData.title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setDeckData({ ...deckData, title: e.target.value });
                }}
              />
            </div>
            <div
              className='flex flex-col gap-1 items-start'
            >
              <label
                className='mr-2 font-medium block'
                htmlFor="deck-title"
              >
                Description
              </label>
              <input
                className='border border-gray-400 px-4 py-2 rounded-md'
                type="text"
                id="deck-title"
                name="deck-title"
                placeholder="Description"
                value={deckData.description}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setDeckData({ ...deckData, description: e.target.value });
                }}
              />
            </div>
            <button
              className='bg-blue-500 text-white px-4 py-2 rounded-md mt-4'
            >Create Deck</button>
          </form>
        </div>
      </main>
    </div>
  )
}

export default App
