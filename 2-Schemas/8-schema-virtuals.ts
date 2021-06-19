import {
  connect, connection, Schema, model, Document, Model, Query, QueryWithHelpers
} from 'mongoose';

// connection.once('open', () => console.log('\x1b[32m %s', 'opened mongoDB'));

connection.on('error', console.error.bind(console, '\x1b[31m %s', 'connection error: '));

connect('mongodb://localhost:27017/mongoose', { useNewUrlParser: true, useUnifiedTopology: true });

// #region 建構 Schema
interface DocumentPerson extends Document {
  name: {
    first: string;
    last: string;
  };
  fullName: string;
}

const personSchema = new Schema<DocumentPerson>({
  name: {
    first: String,
    last: String,
  },
});

personSchema.virtual('fullName')
  .get(function (this: DocumentPerson) {
    return `${this.name.first} ${this.name.last}`;
  })
  .set(function (value: string) {
    // this.name.first = value.substr(0, value.indexOf(' '));
    // this.name.last = value.substr(value.indexOf(' ') + 1);
    const [first, last] = value.split(' ');
    // @ts-expect-error
    this.set({ name: { first, last } });
  });

const Person = model<DocumentPerson>('Person', personSchema);
// #endregion

const axl = new Person({
  name: {
    first: 'Axl',
    last: 'Rose',
  },
});

console.log(`${axl.name.first} ${axl.name.last}`);
console.log(axl.fullName);

axl.fullName = 'William Rose';

console.log(`${axl.name.first} ${axl.name.last}`);
