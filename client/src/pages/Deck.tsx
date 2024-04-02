import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { TDeck } from '@shared/types/types';
import { getDeckById } from '@/api/decks';

import Layout from '@/pages/Layout';

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
    <Layout>
      <h2 className='text-2xl font-bold text-left text-black'>
        {deckData?.title}
      </h2>
    </Layout>
  )
}