import { API_URL } from './config';

export type TDeck = {
  _id: string,
  title: string,
  description: string,
  actions?: {
    delete: (_id: string) => void,
    click: (_id: string) => void,
  },
};

export async function getDecks(): Promise<TDeck[]> {
  const response = await fetch(`${API_URL}/decks/`);
  return response.json();
}

export async function deleteDeckById(
  deckId: string
): Promise<void> {
  await fetch(`${API_URL}/decks/${deckId}`, {
    method: 'DELETE',
  });
}

export async function createDeck(
  deckData: TDeck,
): Promise<TDeck> {
  try {
    const response = await fetch(`${API_URL}/decks/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(deckData),
    });
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}