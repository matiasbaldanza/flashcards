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
  cards: []
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
    <div className='container mx-auto lg:w-[80%] lg:px-4 flex flex-col gap-2'>
      <header>
        <h1 className='text-xl font-bold text-left text-black lg:text-2xl'>
          Flashcards App
        </h1>
      </header>
      <main>
        <section className='p-2 my-2 -mx-2 bg-gray-200 rounded-lg'>
          <form
            className='grid w-full grid-cols-1 gap-2 lg:grid-cols-3'
            onSubmit={handleCreateDeck}
          >
            <div
              className='flex flex-col items-start gap-1'
            >
              <label
                className='block ml-2 text-sm text-gray-800'
                htmlFor="deck-title"
              >
                Deck Title
              </label>
              <input
                className='w-full h-10 px-4 py-2 border border-gray-400 rounded-md'
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
                className='block ml-2 text-sm text-gray-800'
                htmlFor="deck-title"
              >
                Description
              </label>
              <input
                className='w-full h-10 px-4 py-2 border border-gray-400 rounded-md'
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
            <div className='flex items-end w-full h-full' >
              <button
                className='w-full h-10 px-4 py-2 mt-4 text-white bg-blue-500 rounded-md'
              >Create Deck</button>
            </div>
          </form>
        </section>
        <section
          className='grid items-start gap-2 mx-auto my-2 lg:grid-cols-3'
        >
          {
            decks.map((deck: TDeck) => (
              <DeckCard
                key={deck._id}
                {...deck}
                actions={{
                  delete: handleDeleteDeck,
                  open: handleClickDeck
                }}
              />
            ))
          }
        </section>
      </main>
    </div>
  )
}

export default App
