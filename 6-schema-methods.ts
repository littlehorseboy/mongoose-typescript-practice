import {
  connect, connection, Schema, model, Document, CallbackError
} from 'mongoose';

connection.once('open', () => console.log('\x1b[32m %s', 'opened mongoDB'));

connection.on('error', console.error.bind(console, '\x1b[31m %s', 'connection error: '));

connect('mongodb://localhost:27017/mongoose', { useNewUrlParser: true, useUnifiedTopology: true });

// #region 建構 Schema
interface DocumentAnimal extends Document {
  name: string;
  type: string;
  findSimilarTypes: (callback: (error: CallbackError, docs: DocumentAnimal[]) => void) => void;
}

const animalSchema = new Schema<DocumentAnimal>({
  name: String,
  type: String,
});

animalSchema.methods.findSimilarTypes = function (cb) {
  return model('Animal').find({ type: this.type }, cb);
};

const Animal = model<DocumentAnimal>('Animal', animalSchema);
// #endregion

const dog = new Animal({ type: 'dog' });

dog.findSimilarTypes((error, dogs) => {
  console.log(dogs);
});
