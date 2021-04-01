import { connect, connection } from 'mongoose';

connection.once('open', () => console.log('opened mongoDB'));

connection.on('error', console.error.bind(console, 'connection error: '));

connect('mongodb://localhost:27017/mongoose', { useNewUrlParser: true, useUnifiedTopology:true });
