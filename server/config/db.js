import mongoose from "mongoose";

export default async function dbConnect() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Data Base Connect");
  } catch (error) {
    console.error("Error: ", error);
    process.exit(1);
  }
}