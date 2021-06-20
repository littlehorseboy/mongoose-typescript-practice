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
  name: String,
  binary: Buffer,
  living: Boolean,
  updated: { type: Date, default: Date.now },
  age: { type: Number, min: 18, max: 65 },
  mixed: Schema.Types.Mixed,
  _someId: Schema.Types.ObjectId,
  decimal: Schema.Types.Decimal128,
  array: [],
  ofString: [String],
  ofNumber: [Number],
  ofDates: [Date],
  ofBuffer: [Buffer],
  ofBoolean: [Boolean],
  ofMixed: [Schema.Types.Mixed],
  ofObjectId: [Schema.Types.ObjectId],
  ofArrays: [[]],
  ofArrayOfNumbers: [[Number]],
  nested: {
    stuff: { type: String, lowercase: true, trim: true ,}
  },
  map: Map,
  mapOfString: {
    type: Map,
    of: String,
  },
});

const Thing = model<DocumentAny>('Thing', schema);

const m = new Thing();

m.name = 'Statue of Liberty';
m.age = 125;
m.updated = new Date();
m.binary = Buffer.alloc(0);
m.living = false;
m.mixed = { any: { thing: 'i want' } };
m.markModified('mixed');
m._someId = new Types.ObjectId;
m.array.push(1);
m.ofString.push('string!');
m.ofNumber.unshift(1, 2, 3, 4);
m.ofBuffer.pop();
m.ofMixed = [1, [], 'three', { four: 5 }];
m.nested.stuff = 'good';
m.map = new Map([['key', 'value']]);

m.save((error, doc): void => {
  if (error) return console.error(error);
});
