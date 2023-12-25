import mongoose from 'mongoose';

const connectionDB = async () => {
  try {
    if (process.env.MONGODB_URI) {
      await mongoose.connect(process.env.MONGODB_URI);
    } else {
      throw new Error('MONGODB_URI is undefined');
    }
    console.log('Database connected');
  } catch (error) {
    console.log(error);
  }
};

export default connectionDB;
