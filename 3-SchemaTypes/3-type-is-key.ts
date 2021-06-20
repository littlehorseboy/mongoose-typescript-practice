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
  name: { type: String },
  nested: {
    firstName: { type: String },
    lastName: { type: String },
  },
});

console.log(schema);

const holdingSchema = new Schema<DocumentAny>({
  asset: {
    // type: String, // 如果真的要使用 type，此為錯誤方式
    type: { type: String },
    ticker: String,
  },
});

console.log(holdingSchema);
