import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { TDeck } from '@shared/types/types';
import { getDeckById } from '@/api/decks';

export default function Deck() {
  const [deckData, setDeckData] = useState<TDeck | undefined>();
  const { deckId } = useParams();

  useEffect(() => {
    async function getAndSetDeck() {
      if (!deckId) return;
      const deck = await getDeckById(deckId);
      setDeckData(deck);
    }
    getAndSetDeck();
  }, [deckId]);

  return (
    <div className='container mx-auto w-[80%] px-4'>
      <header>
        <h1 className='text-2xl font-bold text-left text-black'>
          {deckData?.title}
        </h1>
      </header>
      <main>

      </main>
    </div>
  )
}