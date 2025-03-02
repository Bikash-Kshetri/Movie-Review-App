import dotenv from "dotenv";

dotenv.config();

import mongoose from "mongoose";

export async function connectMongoDb() {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI || "", {
      dbName: "review-system",
    });
    console.log("Mongodb Database Connected Successfully!!");
  } catch (error) {
    // const collections = db.collections;
    console.error("Failed to connect to mongodb!!", error);
    process.exit(1);
  }
}
