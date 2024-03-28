import { Request, Response } from 'express';
import DeckModel from '../models/DeckModel';

export async function createDeckController(
  req: Request, res: Response
) {
  const newDeck = new DeckModel({
    title: req.body.title,
    description: req.body.description,
  });
  const createdDeck = await newDeck.save();
  res.json(createdDeck);
}