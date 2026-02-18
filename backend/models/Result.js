import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  testId: { type: mongoose.Schema.Types.ObjectId, ref: "Test", required: true },
  answers: [{
    questionId: { type: mongoose.Schema.Types.ObjectId, required: true }, 
    selectedOptionIndexes: [Number],
    isCorrect: { type: Boolean }
  }],
  score: { type: Number, default: 0 },
  maxScore: { type: Number, default: 0 },
  percent: { type: Number },
  completedAt: { type: Date, default: Date.now }
});

export default mongoose.model("Result", resultSchema);