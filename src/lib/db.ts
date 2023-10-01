import mongoose from "mongoose";

const DB = process.env.MONGODB_DATABASE as string;

export const connectToDatabase = async () => {
  const dbClient = await mongoose.connect(DB);

  return dbClient;
};
