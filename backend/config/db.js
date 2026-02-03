import mongoose from "mongoose";

export default async function DBConnect() {
  try {
    await mongoose.connect(process.env.URI);
    console.log("Data Base Connect");
  } catch (error) {
    console.error("Error: ", error);
    process.exit(1);
  }
};