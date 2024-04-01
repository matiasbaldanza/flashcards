import { Request, Response } from 'express';
import { TDeck, TApiResponse } from '@shared/types/types';
import DeckModel from '../models/DeckModel';

export async function getDeckByIdController(
  req: Request, res: Response
): Promise<void> {
  try {
    const deckId = req.params.id;
    const deck = await DeckModel.findById(deckId);

    if (!deck) {
      res.status(404).json({
        success: false,
        message: 'Deck not found',
        data: null,
      } as TApiResponse<null>);
    }
    res.status(200).json({
      success: true,
      message: 'Deck found',
      data: deck as TDeck,
    } as TApiResponse<TDeck>);
  } catch (err) {
    res.status(500).json({
      message: 'Error accessing deck',
      error: err,
      data: null,
    } as TApiResponse<null>);
  }
}

