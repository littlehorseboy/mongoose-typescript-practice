import {
  connect, connection, Document, model, Schema,
} from 'mongoose';

connection.once('open', () => console.log('\x1b[32m %s', 'opened mongoDB'));

connection.on('error', console.error.bind(console, '\x1b[31m %s', 'connection error: '));

connect('mongodb://localhost:27017/mongoose', { useNewUrlParser: true, useUnifiedTopology: true });

interface DocumentName extends Document {
  name: string;
}

const schema = new Schema<DocumentName>({
  name: String,
});

const schema2 = new Schema<DocumentName>({
  name: 'String',
});

const Name = model<DocumentName>('Name', schema2);

const name = new Name({ name: '123' });
const name2 = new Name({ name: 123 });
const name3 = new Name({ name: { toString: () => 123 } }); // 不起作用呢

console.log(typeof name.name, name.name);
console.log(typeof name2.name, name2.name);
console.log(typeof name3.name, name3.name);
