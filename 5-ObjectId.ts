import { connect, connection, Schema, model, Document, Types } from 'mongoose';

connection.once('open', () => console.log('\x1b[32m %s', 'opened mongoDB'));

connection.on('error', console.error.bind(console, '\x1b[31m %s', 'connection error: '));

connect('mongodb://localhost:27017/mongoose', { useNewUrlParser: true, useUnifiedTopology: true });

// #region 建構 Schema
interface DocumentBlog extends Document {
  _id: Types.ObjectId;
  title: string;
  author: string;
  body: string;
  comments: { body: string, date: Date }[];
  date: Date;
  hidden: boolean;
  meta: {
    votes: number;
    favs: number;
  };
}

const blogSchema = new Schema<DocumentBlog>({
  title: String,
  author: String,
  body: String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs: Number,
  },
});

blogSchema.path('_id');

const Blog = model<DocumentBlog>('Blog', blogSchema);
// #endregion

const blog = new Blog();

console.log(blog._id instanceof Types.ObjectId);

blog.save();
