import {
  connect, connection, Document, Model, model, Schema,
} from 'mongoose';

connection.once('open', () => console.log('\x1b[32m %s', 'opened mongoDB'));

connection.on('error', console.error.bind(console, '\x1b[31m %s', 'connection error: '));

connect('mongodb://localhost:27017/mongoose', { useNewUrlParser: true, useUnifiedTopology: true });

interface DocumentItem extends Document {
  name: string;
  age: number;
}

const schema = new Schema<DocumentItem>({
  name: String,
  age: {
    type: Number,
    min: 0,
  },
});

const Person = model<DocumentItem>('Person', schema);

const p = new Person({ name: 'foo', age: 1 });
const p2 = new Person({ name: 'foo', age: 'bar' });
const p3 = new Person({ name: 'foo', age: -1 });

(async () => {
  await p.validate();
  // await p2.validate(); // 這個錯就看不到下一行的錯誤，如果要看下一行請註解這行
  // await p3.validate();

  // UpdateQuery 要多加 { runValidators: true } 才會跑驗證
  await Person.updateOne({}, { age: -1 }, { runValidators: true });
})();

