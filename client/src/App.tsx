import './App.css'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TDeck,
  getDecks,
  deleteDeckById,
} from './api/decks';

import CreateDeckForm from './components/CreateDeckForm';

import DeckCard from './components/DeckCard';

function App() {
  const [decks, setDecks] = useState<TDeck[]>([]);
  const navigate = useNavigate();

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
        <CreateDeckForm decks={decks} setDecks={setDecks} />
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
