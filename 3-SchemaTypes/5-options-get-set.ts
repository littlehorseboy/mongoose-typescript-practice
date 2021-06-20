import {
  connect, connection, Document, model, Schema,
} from 'mongoose';

connection.once('open', () => console.log('\x1b[32m %s', 'opened mongoDB'));

connection.on('error', console.error.bind(console, '\x1b[31m %s', 'connection error: '));

connect('mongodb://localhost:27017/mongoose', { useNewUrlParser: true, useUnifiedTopology: true });

interface DocumentNumber extends Document {
  integerOnly: number;
  i: number;
}

const schema = new Schema<DocumentNumber>({
  integerOnly: {
    type: Number,
    get: (v: number) => Math.round(v),
    set: (v: number) => Math.round(v),
    alias: 'i',
  },
});

const Example = model<DocumentNumber>('Example', schema);

const example = new Example();

example.integerOnly = 2.001;

console.log(example.integerOnly);

example.i = 3.001;

console.log(example.i);

(example.i as any) = 'a'; // 非法值被直接無視呢，也沒看到錯誤訊息

console.log(example.i);
