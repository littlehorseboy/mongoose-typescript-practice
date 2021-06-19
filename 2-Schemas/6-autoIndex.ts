import {
  connect, connection, Schema, model, Document,
} from 'mongoose';

connection.once('open', () => console.log('\x1b[32m %s', 'opened mongoDB'));

connection.on('error', console.error.bind(console, '\x1b[31m %s', 'connection error: '));

connect('mongodb://localhost:27017/mongoose', { autoIndex: false, useNewUrlParser: true, useUnifiedTopology: true });

// #region 建構 Schema
interface DocumentAnimal extends Document {
  name: string;
  type: string;
}

const animalSchema = new Schema<DocumentAnimal>({
  name: String,
  type: String,
}, { autoIndex: false });

animalSchema.set('autoIndex', false);

const Animal = model<DocumentAnimal>('Animal', animalSchema);
// #endregion

Animal.find({ name: 'dog' }).exec((error, animals) => {
  console.log(animals);
});
