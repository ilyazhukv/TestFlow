import Question from "../models/Question.js";
import Test from "../models/Test.js";

export const createQuestion = async (req, res) => {
  try {
    let { text, type, options, score } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    if (typeof options === "string") options = JSON.parse(options);

    const test = await Test.findOne({ slug: req.params.slug });
    if (!test) return res.status(404).json({ errors: { tests: ["Test not found"] } });

    if (test.author.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ errors: { server: ["Access denied"] } });
    }

    const newQuestion = new Question({
      testId: test._id,
      text,
      type,
      options,
      score: Number(score),
      image: imagePath,
    });
    await newQuestion.save();

    test.questions.push(newQuestion._id);
    await test.save();

    res.status(201).json(newQuestion);
  } catch (error) {
    return res.status(500).json({ errors: { server: ["Internal server error"] } });
  }
}