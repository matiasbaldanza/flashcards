import { Request, Response } from 'express';
import DeckModel from '../models/DeckModel';

export async function getDeckByIdController(
  req: Request, res: Response
) {
  try {
    const deckId = req.params.id;
    const deck = await DeckModel.findById(deckId);

    if (!deck) {
      return res.status(404).json({
        message: 'Deck not found',
      });
    }
    res.status(200).json(deck);
  } catch (err) {
    res.status(500).json({
      message: 'Error accessing deck',
      error: err,
    });
  }
}

