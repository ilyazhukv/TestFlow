import mongoose from "mongoose";

const questionsSchema = new mongoose.Schema({
  text: { type: String, required: true },
  options: [{
    text: { type: String },
    isCorrect: { type: Boolean, default: false }
  }],
  points: { type: Number, default: 1 }
});

const testSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 128 },
  description: { type: String, maxlength: 256 },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  questions: [questionsSchema],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Test", testSchema);