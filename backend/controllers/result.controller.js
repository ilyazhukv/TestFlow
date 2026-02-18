import Result from "../models/Result.js"
import Test from "../models/Test.js";

export const saveResult = async (req, res) => {
  try {
    const { testId, userId, answers } = req.body;
    const test = await Test.findById(testId).lean();
    if (!test) return res.status(404).json({ message: "Test not found" });

    let score = 0;
    let maxScore = 0;
    const processedAnswers = [];

    test.questions.forEach(question => {
      maxScore += question.points;

      const userAnswer = answers.find(a => String(a.questionId) === String(question._id));
      if (!userAnswer) return;

      const correctOptionIds = question.options.filter(opt => opt.isCorrect).map(opt => String(opt._id));

      const userSelectedIds = userAnswer?.selectedOptionIds.map(id => String(id));

      const isCorrect = correctOptionIds.length === userSelectedIds.length &&
        correctOptionIds.every(id => userSelectedIds.includes(id));

      if (isCorrect) score += question.points;

      processedAnswers.push({
        questionId: question._id,
        selectedOptionIndexes: userSelectedIds,
        isCorrect
      });
    });

    const result = new Result({
      userId,
      testId,
      answers: processedAnswers,
      score: score,
      maxScore: maxScore,
      percentage: Math.round((score / maxScore) * 100)
    });

    await result.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const getResult = async (req, res) => {
  try {
    const userId = req.params.id;
    const result = await Result.findById(userId);
  } catch (error) {

  }
}

export const getResults = async (req, res) => {
  try {
    const results = await Result.find().sort({ completedAt: -1 });
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const deleteResult = async (req, res) => {
  try {
    const { resultId } = req.body;

    const deleteResult = await Result.findByIdAndDelete(resultId);
    if (!deleteResult) res.status(200).json({ message: "Result not found" });

    res.status(200).json({ message: "The result has been deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}