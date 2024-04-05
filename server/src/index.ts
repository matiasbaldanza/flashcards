import 'dotenv/config';
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import corsOptions from './utils/corsOptions';

import { createDeckController } from './controllers/createDeckController';
import { getDecksController } from './controllers/getDecksController';
import { getDeckByIdController } from './controllers/getDeckByIdController';
// import { updateDeckController } from './controllers/updateDeckController';
import { deleteDeckByIdController } from './controllers/deleteDeckByIdController';

// import { createCardInDeckController } from './controllers/createCardInDeckController';


const DB_URI = process.env.MONGO_URI!.replace('<password>', process.env.MONGO_PASSWORD!) || '';
const PORT = 5174;
const app = express();

app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
  res.send('Root');
});

app.post('/decks', createDeckController);
app.get('/decks', getDecksController);
app.get('/decks/:id', getDeckByIdController);
// TODO: app.put('/decks/:id', updateDeckController);
app.delete('/decks/:id', deleteDeckByIdController);

// TODO: app.post('/decks/:deckId/cards', createCardInDeckController);
// TODO: app.get('/decks/:deckId/cards', getCardsInDeckController);
// TODO: app.get('/decks/:deckId/cards/:cardId', getCardInDeckByIdController);
// TODO: app.put('/decks/:deckId/cards/:cardId', updateCardInDeckController);
// TODO: app.delete('/decks/:deckId/cards/:cardId', deleteCardInDeckController);

console.log('ENVIRONMENT:', process.env.NODE_ENV);

export const db = mongoose
  .connect(
    DB_URI
  ).then(() => {
    console.log('Connected to database');
    app.listen(PORT);
    console.log(`Server listening on port ${PORT}`);
  });