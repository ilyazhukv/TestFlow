import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  avatar: { type: String, trim: true },
  name: { type: String, required: true, index: { unique: true, collation: { strength: 2 } } },
  email: { type: String, required: true, index: { unique: true, collation: { strength: 2 } } },
  passwordHash: { type: String, required: true, select: false },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  status: {type: String, enum: ["stopped", "active"], default: "active"},
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("User", userSchema);