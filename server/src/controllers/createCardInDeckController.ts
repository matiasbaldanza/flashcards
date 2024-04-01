import { Request, Response } from 'express';
import { TDeck, TApiResponse } from '@shared/types/types';
import DeckModel from '../models/DeckModel';

export async function createCardInDeckController(
  req: Request, res: Response
): Promise<void> {
  const deckID = req.params.deckId;
  const deck = await DeckModel.findById(deckID);

  if (!deck) {
    res.status(400).json({
      success: false,
      message: `Deck not found with the ID ${deckID}`,
      data: null,
    } as TApiResponse<null>);
    return;
  }

  const { front, back } = req.body;
  deck.cards.push({ front, back });
  await deck.save();

  // Send the updated deck back to the client
  res.json({
    success: true,
    message: 'Card added to deck successfully',
    data: deck,
  } as TApiResponse<TDeck>);
}