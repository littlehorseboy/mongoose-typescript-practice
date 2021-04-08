import {
  connect, connection, Schema, model, Document, Model, Query, QueryWithHelpers
} from 'mongoose';

// connection.once('open', () => console.log('\x1b[32m %s', 'opened mongoDB'));

connection.on('error', console.error.bind(console, '\x1b[31m %s', 'connection error: '));

connect('mongodb://localhost:27017/mongoose', { useNewUrlParser: true, useUnifiedTopology: true });

// #region 建構 Schema
interface DocumentPerson extends Document {
  n: string;
  name: string;
}

const personSchema = new Schema<DocumentPerson>({
  n: {
    type: String,
    alias: 'name',
  },
});

const Person = model<DocumentPerson>('Person', personSchema);
// #endregion

const person = new Person({
  name: 'Val',
});

console.log(person);
console.log(person.toObject({ virtuals: true }));
console.log(person.n);
console.log(person.name);

person.name = 'Not Val';

console.log(person);
