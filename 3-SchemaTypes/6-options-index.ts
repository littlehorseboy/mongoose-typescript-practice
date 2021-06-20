import {
  connect, connection, Document, Schema,
} from 'mongoose';

connection.once('open', () => console.log('\x1b[32m %s', 'opened mongoDB'));

connection.on('error', console.error.bind(console, '\x1b[31m %s', 'connection error: '));

connect('mongodb://localhost:27017/mongoose', { useNewUrlParser: true, useUnifiedTopology: true });

interface DocumentName extends Document {
  name: string;
}

const schema = new Schema<DocumentName>({
  name: {
    type: String,
    index: true,
    unique: true,
  },
});

console.log(schema);
