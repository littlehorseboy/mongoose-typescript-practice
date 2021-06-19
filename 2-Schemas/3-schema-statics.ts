import {
  connect, connection, Schema, model, Document, Model
} from 'mongoose';

connection.once('open', () => console.log('\x1b[32m %s', 'opened mongoDB'));

connection.on('error', console.error.bind(console, '\x1b[31m %s', 'connection error: '));

connect('mongodb://localhost:27017/mongoose', { useNewUrlParser: true, useUnifiedTopology: true });

// #region 建構 Schema
interface DocumentAnimal extends Document {
  name: string;
  type: string;
}

interface ModelAnima extends Model<DocumentAnimal> {
  findByName: (name: string) => Promise<DocumentAnimal[]>;
  findByType: (type: string) => Promise<DocumentAnimal[]>;
}

const animalSchema = new Schema<DocumentAnimal, ModelAnima>({
  name: String,
  type: String,
});

animalSchema.statics.findByName = function (name: string) {
  return this.find({ name: new RegExp(name, 'i') });
};

animalSchema.static('findByType', function (type: string) {
  return this.find({ type });
});

const Animal = model<DocumentAnimal, ModelAnima>('Animal', animalSchema);
// #endregion

(async () => {
  let animals = await Animal.findByName('dog')

  animals = animals.concat(await Animal.findByType('cat'));

  console.log(animals);
})();
