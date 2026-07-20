import mongoose from "mongoose";

export const connectToDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    if (conn) {
      console.log("Successfully connected to", conn.connection.host);
    }
  } catch (error) {
    console.log("Error connecting to the database", error);
  }
};
