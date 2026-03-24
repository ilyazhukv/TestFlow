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

export const deleteQuestion = async (req, res) => {
  try {
    const { questionId } = req.body;

    const test = await Test.findOne({ slug: req.params.slug });
    if (!test) return res.status(404).json({ errors: { server: ["Test not found"] } });

    if (test.author.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ errors: { server: ["Access denied"] } });
    }

    const question = await Question.findById(questionId);
    if (!question) return res.status(404).json({ errors: { server: ["Qustion not found"] } });

    if (question.image) {
      try {
        const relativePath = question.image.startsWith('/') ? question.image.substring(1) : question.image;
        const absolutePath = path.join(process.cwd(), relativePath);

        await fs.unlink(absolutePath);
        console.log("File deleted:", absolutePath);
      } catch (err) {
        console.error("File system error (skipping):", err.message);
      }
    }

    await Test.findByIdAndUpdate(test._id, { $pull: { questions: questionId } });
    await Question.findByIdAndDelete(questionId);

    res.status(200).json({message: "The question has been deleted successfully"})
  } catch (error) {
    return res.status(500).json({ errors: { server: ["Internal server error"] } });
  }
}