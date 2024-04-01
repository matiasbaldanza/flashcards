import { Request, Response } from 'express';
import { TDeck, TApiResponse } from '@shared/types/types';
import DeckModel from '../models/DeckModel';

export async function deleteDeckByIdController(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const deckId = req.params.id;
    const deletedDeck = await DeckModel.findByIdAndDelete(deckId);

    if (!deletedDeck) {
      res.status(404).json({
        success: false,
        message: 'Deck not found',
        data: null,
      } as TApiResponse<null>);
    }

    res.status(200).json({
      success: true,
      message: 'Deck deleted',
      data: deletedDeck
    } as TApiResponse<TDeck>);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error deleting deck',
      data: null,
      error: err,
    } as TApiResponse<null>);
  }
}