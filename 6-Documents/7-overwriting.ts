import {
  connect, connection, Document, Model, model, Schema,
} from 'mongoose';

connection.once('open', () => console.log('\x1b[32m %s', 'opened mongoDB'));

connection.on('error', console.error.bind(console, '\x1b[31m %s', 'connection error: '));

connect('mongodb://localhost:27017/mongoose', { useNewUrlParser: true, useUnifiedTopology: true });

interface DocumentItem extends Document {
  name?: string;
  name2?: string;
}

const schema = new Schema<DocumentItem>({
  name: String,
  name2: String,
});

const Person = model<DocumentItem>('Person', schema);

(async () => {
  const doc = await Person.findOne({ _id: '60d7b64c5b7abf99d135d74e' });

  doc?.overwrite({ name: 'Jean-Luc Picard' });

  await doc?.save();

  await Person.replaceOne({ _id: '60d7b64c5b7abf99d135d74e' }, { name2: 'Jean-Luc Picard 2' });
})();

