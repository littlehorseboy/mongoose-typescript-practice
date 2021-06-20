import {
  connect, connection, Schema, SchemaType,
} from 'mongoose';

connection.once('open', () => console.log('\x1b[32m %s', 'opened mongoDB'));

connection.on('error', console.error.bind(console, '\x1b[31m %s', 'connection error: '));

connect('mongodb://localhost:27017/mongoose', { useNewUrlParser: true, useUnifiedTopology: true });

const schema = new Schema({ name: String });

const a = schema.path('name') instanceof SchemaType;
const b = schema.path('name') instanceof Schema.Types.String;
const c = (schema.path('name')as any).instance;

console.log(a, b, c);
