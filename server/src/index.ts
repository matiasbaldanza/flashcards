import 'dotenv/config';
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import { getDecksController } from './controllers/getDecksController';
import { createDeckController } from './controllers/createDeckController';
import { deleteDeckByIdController } from './controllers/deleteDeckByIdController';

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

app.get('/decks', getDecksController);
app.post('/decks', createDeckController);
app.delete('/decks/:id', deleteDeckByIdController);

const db = mongoose
  .connect(
    DB_URI
  ).then(() => {
    console.log('Connected to database');
    app.listen(PORT);
    console.log(`Server listening on port ${PORT}`);
  });
