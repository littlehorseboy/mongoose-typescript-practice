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
  // name: String,
  name: {
    type: String,
    lowercase: true,
  },
});

const Example = model<DocumentAny>('Example', schema);

const example = new Example({
  name: 'AAA'
});

console.log(example);
