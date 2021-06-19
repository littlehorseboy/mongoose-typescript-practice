import {
  connect, connection, Schema, model, Document, Model, Query, QueryWithHelpers
} from 'mongoose';

connection.once('open', () => console.log('\x1b[32m %s', 'opened mongoDB'));

connection.on('error', console.error.bind(console, '\x1b[31m %s', 'connection error: '));

connect('mongodb://localhost:27017/mongoose', { useNewUrlParser: true, useUnifiedTopology: true });

// #region 建構 Schema
interface DocumentAnimal extends Document {
  name: string;
  type: string;
}

interface QueryAnimal extends Query<DocumentAnimal, DocumentAnimal> {
  byName: (name: string) => QueryWithHelpers<DocumentAnimal[], DocumentAnimal, QueryAnimal>;
}

interface ModelAnima extends Model<DocumentAnimal, QueryAnimal> { }

const animalSchema = new Schema<DocumentAnimal, ModelAnima>({
  name: String,
  type: String,
});

animalSchema.query.byName = function (name) {
  return this.where({ name: new RegExp(name, 'i') });
};

const Animal = model<DocumentAnimal, ModelAnima>('Animal', animalSchema);
// #endregion

Animal.find().byName('dog').exec((error, animals) => {
  console.log(animals);
});

Animal.findOne().byName('cat').exec((error, animals) => {
  console.log(animals);
});
