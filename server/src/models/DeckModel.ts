import mongoose from 'mongoose';
import { TDeck } from '@shared/types/types';

const Schema = mongoose.Schema;
// const ObjectId = mongoose.Types.ObjectId;

const DeckSchema = new Schema<TDeck>({
  title: {
    type: String,
    required: true,
  },
  description: String,
  slug: {
    type: String,
    unique: true,
    required: true,
  },
  cards: [
    {
      front: {
        type: String,
        required: true,
      },
      back: String
    }]
});

const DeckModel = mongoose.model<TDeck>('Deck', DeckSchema);

export default DeckModel;