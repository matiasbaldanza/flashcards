import { API_URL } from './config';
import { TDeck, TApiResponse } from '@shared/types/types';

export async function getDecks(): Promise<TDeck[]> {
  const response = await fetch(`${API_URL}/decks/`);
  const apiResponse: TApiResponse<TDeck[]> = await response.json();
  return apiResponse.data;
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
    const apiResponse: TApiResponse<TDeck> = await response.json();
    return apiResponse.data;
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

    if (!response.ok) {
      throw new Error('Failed to create deck');
    }

    const apiResponse: TApiResponse<TDeck> = await response.json();

    if (!apiResponse.success) {
      throw new Error(apiResponse.message);
    }

    return apiResponse.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}