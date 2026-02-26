import mongoose from "mongoose";

const testSchema = new mongoose.Schema({
  image: { type: String, trim: true },
  title: { type: String, required: true, maxLength: 128 },
  description: { type: String, maxLength: 256 },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", index: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },
  isPublic: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Test", testSchema);