import { Request, Response } from 'express';
import DeckModel from '../models/DeckModel';
import generateSlug from '../utils/generateSlug';

export async function createDeckController(
  req: Request, res: Response
) {
  const title = req.body.title;
  const baseSlug = generateSlug(title);

  const uniqueSlug = await findUniqueSlug(baseSlug);

  const newDeck = new DeckModel({
    title: req.body.title,
    description: req.body.description,
    slug: uniqueSlug,     // Add the slug to the new deck
  });
  const createdDeck = await newDeck.save();
  res.json(createdDeck);
}

async function findUniqueSlug(
  baseSlug: string,
  initialCount: number = 0
) {
  let count = initialCount;
  let uniqueSlug = baseSlug;
  while (true) {
    const exists = await DeckModel.findOne({ slug: uniqueSlug });
    if (!exists) {
      return uniqueSlug;
    }
    count++;
    uniqueSlug = `${baseSlug}-${count}`;
  }
}