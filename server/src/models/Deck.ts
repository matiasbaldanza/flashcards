import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const DeckSchema = new Schema({
  // _id: ObjectId,
  title: String,
  description: String,
  // cards: [{ type: ObjectId, ref: 'Card' }]
});

const DeckModel = mongoose.model('Deck', DeckSchema);

export default DeckModel;