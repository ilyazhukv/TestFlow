import mongoose from "mongoose";

const questionsSchema = new mongoose.Schema({
  questionImage: {type: String, default: "/uploads/default-bg.webp", trim: true},
  text: { type: String, required: true, maxlength: 128 },
  options: [{
    text: { type: String, required: true, maxlength: 128 },
    isCorrect: { type: Boolean, default: false }
  }],
  points: { type: Number, default: 1 }
});

const testSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 128 },
  testImage: {type: String, default: "/uploads/default-bg.webp", trim: true},
  description: { type: String, maxlength: 256 },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  questions: {
    type: [questionsSchema],
    validate: v => v.length > 0
  },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Test", testSchema);