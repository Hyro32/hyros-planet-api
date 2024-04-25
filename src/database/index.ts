import mongoose from 'mongoose';

export async function databaseConnection() {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(import.meta.env.MONGO_URI as string);
    console.log('Connected to Mongo');
  } catch (error) {
    console.error(error);
  }
}

(async () => await databaseConnection())();
