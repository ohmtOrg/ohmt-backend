import mongoose from 'mongoose';
import options from '../config';

export const connect = async (
  opts = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  }
) =>
  mongoose
    .connect(options.dbUrl, {
      useCreateIndex: true,
      useNewUrlParser: true,
      ...opts,
    })
    .then(() => console.log('database Connected'))
    .catch(err => console.log(`Failed to connect to db ${err.reason}`));
