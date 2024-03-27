import './App.css'
import React, { useState } from 'react';

const EMPTY_DECK = {
  title: '',
  description: '',
};

function App() {
  const [deckData, setDeckData] = useState(EMPTY_DECK);

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
      const data = await res.json();
      console.log(data);
      setDeckData(EMPTY_DECK);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <h1 className='text-2xl font-bold text-black text-left'>
        Flashcards App
      </h1>

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
  )
}

export default App