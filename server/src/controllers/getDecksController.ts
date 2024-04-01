import { Request, Response } from 'express';
import DeckModel from '../models/DeckModel';

export async function getDecksController(
  _req: Request, res: Response
) {
  const allDecks = await DeckModel.find();
  res.json(allDecks);
}