import {
  connect, connection, Schema, model, Document, Model, Query, QueryWithHelpers
} from 'mongoose';

// connection.once('open', () => console.log('\x1b[32m %s', 'opened mongoDB'));

connection.on('error', console.error.bind(console, '\x1b[31m %s', 'connection error: '));

connect('mongodb://localhost:27017/mongoose', { useNewUrlParser: true, useUnifiedTopology: true });

// #region 建構 Schema
interface DocumentChild extends Document {
  n: string;
  name: string;
}

const childSchema = new Schema<DocumentChild>({
  n: {
    type: String,
    alias: 'name',
  },
}, { _id: false });

interface DocumentParent extends Document {
  c: DocumentChild;
  name: {
    f: string;
    first: string;
  };
}

const parentSchema = new Schema<DocumentParent>({
  c: childSchema,
  name: {
    f: {
      type: String,
      alias: 'name.first',
    },
  },
});

const Parent = model<DocumentParent>('Parent', parentSchema);
// #endregion

const parent = new Parent({
  name: {
    f: 'Otis',
  },
});

console.log(parent);
console.log(parent.name.f);
console.log(parent.name.first);

parent.name.first = 'Bomb';

console.log(parent);
