import { Request, Response } from 'express';
import DeckModel from '../models/DeckModel';

export async function createCardInDeckController(
  req: Request, res: Response
) {
  const deckID = req.params.deckId;
  const deck = await DeckModel.findById(deckID);

  if (!deck) return res.status(400).send(`Deck not found with the ID ${deckID}`);

  const { front, back } = req.body;
  deck.cards.push({ front, back });
  await deck.save();

  return res.json(deck);
}