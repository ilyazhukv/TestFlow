import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },
  testId: { type: mongoose.Schema.Types.ObjectId, ref: "Test", index: true },
  score: { type: Number, default: 0 },
  maxScore: { type: Number, default: 0 },
  percent: { type: Number, default: 0 },
  answers: [{ userAnswer: { type: String }, correctAnswer: { type: String } }],
  completedAt: { type: Date, default: Date.now }
});

export default mongoose.model("Result", resultSchema);