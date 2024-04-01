import { API_URL } from './config';
import { TDeck } from '@shared/types/deckTypes';

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

export async function getDeckById(
  deckId: string
): Promise<TDeck> {
  try {
    const response = await fetch(`${API_URL}/decks/${deckId}`);
    return response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
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