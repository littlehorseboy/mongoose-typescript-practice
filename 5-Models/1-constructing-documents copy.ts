import {
  connect, connection, Document, model, Schema,
} from 'mongoose';

connection.once('open', () => console.log('\x1b[32m %s', 'opened mongoDB'));

connection.on('error', console.error.bind(console, '\x1b[31m %s', 'connection error: '));

connect('mongodb://localhost:27017/mongoose', { useNewUrlParser: true, useUnifiedTopology: true });

interface DocumentItem extends Document {
  name: string;
  size: string;
}

const schema = new Schema<DocumentItem>({
  name: String,
  size: String,
});

const Tank = model<DocumentItem>('Tank', schema);

const small = new Tank({ size: 'small' });

small.save((err) => {
  if (err) return err;
});

Tank.create({ size: 'small' }, (err, samll) => {
  if (err) return err;
});

Tank.insertMany([{ size: 'small', name: 'Franchi' }]);
