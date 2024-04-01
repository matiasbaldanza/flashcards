import { Request, Response } from 'express';
import { TDeck, TApiResponse } from '@shared/types/types';
import DeckModel from '../models/DeckModel';
import generateSlug from '../utils/generateSlug';

export async function createDeckController(
  req: Request, res: Response
): Promise<void> {
  try {
    const title = req.body.title;
    if (!title) {
      res.status(400).json({
        success: false,
        message: 'Title is required',
        data: null,
      } as TApiResponse<null>);
      return;
    }

    const baseSlug = generateSlug(title);
    const uniqueSlug = await findUniqueSlug(baseSlug);

    const newDeck = new DeckModel({
      title: req.body.title,
      description: req.body.description,
      slug: uniqueSlug,     // Add the slug to the new deck
    });
    const createdDeck = await newDeck.save();

    // Send the created deck back to the client
    res.status(201).json({
      success: true,
      message: 'Deck created successfully',
      data: createdDeck,
    } as TApiResponse<TDeck>);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while creating the deck',
      data: null,
      error: error,
    } as TApiResponse<null>);
  }
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