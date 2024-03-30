import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const DeckSchema = new Schema({
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

const DeckModel = mongoose.model('Deck', DeckSchema);

export default DeckModel;