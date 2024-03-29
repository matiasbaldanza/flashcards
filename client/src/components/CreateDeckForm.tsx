import { useState } from 'react';

import { TDeck, createDeck } from '../api/decks';

const EMPTY_DECK: TDeck = {
  _id: '',
  title: '',
  description: '',
  cards: []
};

export default function CreateDeckForm({
  decks,
  setDecks
}: {
  decks: TDeck[],
  setDecks: (decks: TDeck[]) => void
}) {
  const [deckData, setDeckData] = useState<TDeck>(EMPTY_DECK);

  async function handleCreateDeck(e: React.FormEvent) {
    e.preventDefault();
    const newDeckData = await createDeck(deckData);
    setDecks([...decks, newDeckData]);   // Optimistic update
    setDeckData(EMPTY_DECK);
  }

  return (
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
  )
}