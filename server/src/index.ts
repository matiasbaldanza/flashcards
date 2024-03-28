import 'dotenv/config';
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import DeckModel from './models/Deck';

const DB_URI = process.env.MONGO_URI!.replace('<password>', process.env.MONGO_PASSWORD!) || '';
const PORT = 5174;
const app = express();

app.use(cors({
  origin: "http://127.0.0.1:5173",
}));
app.use(express.json());

console.log('DB_URI:', DB_URI);

app.get('/', (req: Request, res: Response) => {
  res.send('Root');
});

app.get('/decks', async (req: Request, res: Response) => {
  const allDecks = await DeckModel.find();
  res.json(allDecks);
});

app.post('/decks', async (req: Request, res: Response) => {
  const newDeck = new DeckModel({
    title: req.body.title,
    description: req.body.description,
  });
  const createdDeck = await newDeck.save();
  res.json(createdDeck);
});

app.delete('/decks/:id', async (req: Request, res: Response) => {
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
});

const db = mongoose
  .connect(
    DB_URI
  ).then(() => {
    console.log('Connected to database');
    app.listen(PORT);
    console.log(`Server listening on port ${PORT}`);
  });
