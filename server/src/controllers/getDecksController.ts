import { Request, Response } from 'express';
import { TDeck, TApiResponse } from '@shared/types/types';
import DeckModel from '../models/DeckModel';

export async function getDecksController(
  _req: Request, res: Response
): Promise<void> {
  const allDecks = await DeckModel.find();
  res.status(200).json({
    success: true,
    message: 'Decks found',
    data: allDecks,
  } as TApiResponse<TDeck[]>);
}