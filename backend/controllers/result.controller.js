import Result from "../models/Result.js"
import Test from "../models/Test.js";

export const saveResult = async (req, res) => {
  try {
    const { testId, answers } = req.body;
    const userId = req.user.id;
    const test = await Test.findById(testId).lean();
    if (!test) return res.status(404).json({ message: "Test not found" });

    let score = 0;
    let maxScore = 0;
    const processedAnswers = [];

    test.questions.forEach(question => {
      maxScore += question.points;
      const userAnswer = answers.find(a => String(a.questionId) === String(question._id));

      let userSelectedIds = [];
      let isCorrect = false;

      if (userAnswer && Array.isArray(userAnswer.selectedOptionIds)) {
        userSelectedIds = userAnswer.selectedOptionIds.map(id => String(id));
        const correctOptionIds = question.options.filter(opt => opt.isCorrect).map(opt => String(opt._id));

        isCorrect = correctOptionIds.length === userSelectedIds.length &&
          correctOptionIds.every(id => userSelectedIds.includes(id));
      }

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
      percentage: maxScore > 0 ? Math.round((score / maxScore) * 100) : 0
    });

    await result.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const getResult = async (req, res) => {
  try {
    const result = await Result.findById(req.params.id);
    if (!result) return res.status(404).json({ message: "Result not found" })
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const getResults = async (req, res) => {
  try {
    const results = await Result.find().sort({ completedAt: -1 }).select("-answers").populate("testId", "title");
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const deleteResult = async (req, res) => {
  try {
    const { resultId } = req.body;
    const result = await Result.findById(resultId);

    if (!result) return res.status(404).json({ message: "Result not found" });

    const isOwner = String(result.userId) === String(req.user.id);
    const isAdmin = req.user.role === 'admin';

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: "No permission" });
    }

    await Result.findByIdAndDelete(resultId);
    res.status(200).json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}