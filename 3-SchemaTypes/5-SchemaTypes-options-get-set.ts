import {
  connect, connection, Document, model, Schema, Types,
} from 'mongoose';

connection.once('open', () => console.log('\x1b[32m %s', 'opened mongoDB'));

connection.on('error', console.error.bind(console, '\x1b[31m %s', 'connection error: '));

connect('mongodb://localhost:27017/mongoose', { useNewUrlParser: true, useUnifiedTopology: true });

interface DocumentAny extends Document {
  [key: string]: any;
}

const schema = new Schema<DocumentAny>({
  integerOnly: {
    type: Number,
    get: (v: number) => Math.round(v),
    set: (v: number) => Math.round(v),
    alias: 'i',
  },
});

const Example = model<DocumentAny>('Example', schema);

const example = new Example();

example.integerOnly = 2.001;

console.log(example.integerOnly);

example.i = 3.001;

console.log(example.i);

example.i = 'a'; // 非法值被直接無視呢

console.log(example.i);
