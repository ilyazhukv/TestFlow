import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, index: { unique: true, collation: { locale: "en", strength: 2 } } },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true, match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ },
  passwordHash: { type: String, required: true, select: false },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  image: { type: String, trim: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("User", userSchema);