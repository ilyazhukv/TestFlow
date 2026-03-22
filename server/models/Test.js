import mongoose from "mongoose";
import slugify from "slugify";

const testSchema = new mongoose.Schema({
  image: { type: String, trim: true },
  title: { type: String, required: true, maxLength: 128 },
  slug: { type: String, unique: true, index: true },
  description: { type: String, maxLength: 256 },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", index: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
  isPublic: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

testSchema.pre("validate", async function (next) {
  if (this.title && (this.isModified("title") || !this.slug)) {
    const baseSlug = slugify(this.title, {
      lower: true,
      strict: true,
      locale: "ru"
    });

    const suffix = this._id.toString().slice(-4);

    this.slug = `${baseSlug}-${suffix}`
  }
});

testSchema.pre('findOneAndDelete', async function(next) {
  const doc = await this.model.findOne(this.getQuery());
  if (doc) {
    await mongoose.model("Question").deleteMany({ testId: doc._id });
  }
});

export default mongoose.model("Test", testSchema);