import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const DeckSchema = new Schema({
  // _id: ObjectId,
  title: String,
  description: String,
  slug: String,
  cards: [
    {
      front: String,
      back: String
    }]
});

const DeckModel = mongoose.model('Deck', DeckSchema);

export default DeckModel;