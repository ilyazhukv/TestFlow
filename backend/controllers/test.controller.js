import Test from "../models/Test.js";

export const createTest = async (req, res) => {
  try {
    const { title, description, questions, createdBy } = req.body;

    const newTest = new Test({ title, description, questions, createdBy });
    await newTest.save();

    res.status(201).json(newTest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const submitTest = async (req, res) => {
  try {
    const test = await Test.findById(req.params.id);
    if (!test) return res.status(404).json({ message: "Test not found" });
    
    const answers = req.body;
    let score = 0;
    let maxScore = 0;

    test.questions.forEach(question => {
      maxScore += question.points;

      const userAnswer = answers.find(answer => answer.questionId === question._id.toString());
      if (!userAnswer) return;

      const selectedOption = question.options.find(option => option._id.toString() === userAnswer.selectedOptionId);
      if (selectedOption && selectedOption.isCorrect) {
        score += question.points;
      }
    });

    const percentage = Math.round((score / maxScore) * 100);
    res.status(200).json({ score, maxScore, percentage });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTests = async (req, res) => {
  try {
    const tests = await Test.find().sort({ createdAt: -1 }).populate("createdBy", "name");
    res.json(tests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};