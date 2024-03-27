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

app.get('/decks', (req: Request, res: Response) => {
  res.send('Decks');
});

app.post('/decks', async (req: Request, res: Response) => {
  const newDeck = new DeckModel({
    title: req.body.title,
    description: req.body.description,
  });
  const createdDeck = await newDeck.save();
  res.json(createdDeck);
});

const db = mongoose
  .connect(
    DB_URI
  ).then(() => {
    console.log('Connected to database');
    app.listen(PORT);
    console.log(`Server listening on port ${PORT}`);
  });
