import { connect, connection, Schema, model, Document } from 'mongoose';

connection.once('open', () => console.log('\x1b[32m %s', 'opened mongoDB'));

connection.on('error', console.error.bind(console, '\x1b[31m %s', 'connection error: '));

connect('mongodb://localhost:27017/mongoose', { useNewUrlParser: true, useUnifiedTopology: true });

// #region 建構 Schema
interface DocumentKitty extends Document {
  name: string;
  speak: () => void;
}

const kittySchema = new Schema<DocumentKitty>({
  name: String,
});

kittySchema.methods.speak = function () {
  const greeting = this.name ? `Meow name is ${this.name}` : `I don't have a name`;
  console.log(greeting);
};

const Kitten = model<DocumentKitty>('Kitten', kittySchema);
// #endregion

Kitten.find({}, (error, docs) => {
  if (error) return console.error(error);
  console.log(docs);
});

Kitten.find({ name: /^flu/ }, (error, docs) => {
  if (error) return console.error(error);
  console.log(docs);
});
