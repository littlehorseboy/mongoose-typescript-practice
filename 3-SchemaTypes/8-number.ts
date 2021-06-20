import {
  connect, connection, Document, model, Schema,
} from 'mongoose';

connection.once('open', () => console.log('\x1b[32m %s', 'opened mongoDB'));

connection.on('error', console.error.bind(console, '\x1b[31m %s', 'connection error: '));

connect('mongodb://localhost:27017/mongoose', { useNewUrlParser: true, useUnifiedTopology: true });

interface DocumentAge extends Document {
  age: number;
}

const schema = new Schema<DocumentAge>({
  age: Number,
});

const schema2 = new Schema<DocumentAge>({
  age: 'Number',
});

const Age = model<DocumentAge>('Age', schema2);

const age = new Age({ age: '15' });
const age2 = new Age({ age: true });
const age3 = new Age({ age: false });
const age4 = new Age({ age: { valueOf: () => 83 } });
const age5 = new Age({ age: null });

console.log(typeof age.age, age.age);
console.log(typeof age2.age, age2.age);
console.log(typeof age3.age, age3.age);
console.log(typeof age4.age, age4.age);
console.log(typeof age5.age, age5.age);
