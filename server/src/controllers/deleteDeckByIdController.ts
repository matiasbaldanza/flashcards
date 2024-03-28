import { Request, Response } from 'express';
import DeckModel from '../models/DeckModel';

export async function deleteDeckByIdController(
  req: Request, res: Response
) {
  try {
    const deckId = req.params.id;
    const deletedDeck = await DeckModel.findByIdAndDelete(deckId);

    if (!deletedDeck) {
      return res.status(404).json({
        message: 'Deck not found',
      });
    }

    res.status(200).json({
      message: 'Deck deleted',
      data: deletedDeck
    });
  } catch (err) {
    res.status(500).json({
      message: 'Error deleting deck',
      error: err,
    });
  }
}