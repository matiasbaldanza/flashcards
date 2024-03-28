import './App.css'
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TDeck,
  getDecks,
  deleteDeckById,
  createDeck
} from './api/decks';

import DeckCard from './components/DeckCard';

const EMPTY_DECK: TDeck = {
  _id: '',
  title: '',
  description: '',
};

function App() {
  const [deckData, setDeckData] = useState<TDeck>(EMPTY_DECK);
  const [decks, setDecks] = useState<TDeck[]>([]);
  const navigate = useNavigate();

  async function handleCreateDeck(e: React.FormEvent) {
    e.preventDefault();
    const newDeckData = await createDeck(deckData);
    setDecks([...decks, newDeckData]);   // Optimistic update
    setDeckData(EMPTY_DECK);
  }

  async function handleDeleteDeck(deckId: string) {
    await deleteDeckById(deckId);
    setDecks(decks.filter(deck => deck._id !== deckId));
  }

  function handleClickDeck(deckId: string) {
    navigate(`/decks/${deckId}`);
  }

  useEffect(() => {
    async function getAndSetDecks() {
      const allDecks = await getDecks();
      setDecks(allDecks);
    }
    getAndSetDecks();
  }, []);

  return (
    <div className='container mx-auto w-[80%] px-4'>
      <header>
        <h1 className='text-2xl font-bold text-left text-black'>
          Flashcards App
        </h1>
      </header>
      <main>
        <div
          className='grid items-start grid-cols-3 gap-2 mx-auto my-4'
        >
          {
            decks.map((deck: TDeck) => (
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
            className='flex flex-col items-start gap-4 py-4 my-4'
            onSubmit={handleCreateDeck}
          >
            <div
              className='flex flex-col items-start gap-1'
            >
              <label
                className='block mr-2 font-medium'
                htmlFor="deck-title"
              >
                Deck Title
              </label>
              <input
                className='px-4 py-2 border border-gray-400 rounded-md'
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
              className='flex flex-col items-start gap-1'
            >
              <label
                className='block mr-2 font-medium'
                htmlFor="deck-title"
              >
                Description
              </label>
              <input
                className='px-4 py-2 border border-gray-400 rounded-md'
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
              className='px-4 py-2 mt-4 text-white bg-blue-500 rounded-md'
            >Create Deck</button>
          </form>
        </div>
      </main>
    </div>
  )
}

export default App
