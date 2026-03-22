import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  testId: { type: mongoose.Schema.Types.ObjectId, ref: "Test", index: true },
  image: { type: String },
  text: { type: String, required: true, maxLength: 128 },
  type: { type: String, enum: ["one_answer", "several_answers"], required: true },
  options: [{
    text: { type: String, required: true, maxLength: 128 },
    isCorrect: { type: Boolean, default: false }
  }],
  score: { type: Number, required: true, default: 1 }
});

export default mongoose.model("Question", questionSchema);