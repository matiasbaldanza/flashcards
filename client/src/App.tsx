import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TDeck } from '@shared/types/types';
import { getDecks, deleteDeckById } from '@/api/decks';

import Layout from '@/pages/Layout';
import CreateDeckForm from '@/components/business/CreateDeckForm';
import DeckCard from '@/components/business/DeckCard';

function App() {
  const [decks, setDecks] = useState<TDeck[]>([]);
  const navigate = useNavigate();

  async function handleDeleteDeck(deckId: string) {
    await deleteDeckById(deckId);
    setDecks(decks.filter(deck => deck._id !== deckId));
  }

  function handleOpenDeck(deckId: string) {
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
    <Layout>
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
                open: handleOpenDeck
              }}
            />
          ))
        }
      </section>
    </Layout>
  )
}

export default App
