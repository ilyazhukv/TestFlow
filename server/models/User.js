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

userSchema.pre('findOneAndDelete', async function (next) {
  const doc = await this.model.findOne(this.getQuery());
  if (doc) {
    await mongoose.model("Test").deleteMany({ author: doc._id });
    await mongoose.model("Result").deleteMany({ userId: doc._id });
  }
  next();
});

export default mongoose.model("User", userSchema);