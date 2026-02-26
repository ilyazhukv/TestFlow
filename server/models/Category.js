import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  title: { type: String }
});

export default mongoose.model("Category", categorySchema);