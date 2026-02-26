import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },
  refreshToken: { type: String, required: true },
});

export default mongoose.model("Token", tokenSchema);