import mongoose from "mongoose";

export const connectToDatabase = async () => {
  const dbClient = await mongoose
    .connect(
      "mongodb+srv://hemenhiwakamal:fsY9rc65r82ARSOf@cluster0.xwlvpt0.mongodb.net/"
    )
    .then(() => console.log("DB successfully connected!"));

  return dbClient;
};
