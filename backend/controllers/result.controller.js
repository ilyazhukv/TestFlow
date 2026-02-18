import Result from "../models/Result.js"

export const saveResult = async (res, req) => {
  try {
    const { testId, userId, answers } = req.body;

    if (!test) return res.status(404).json({ message: "Test not found" });

    let score = 0;
    let maxScore = 0;
    const processedAnswers = [];

    test.questions.forEach(question => {
      maxScore += question.points;

      const userAnswers = answers.find(a => String(a.questionId) === String(question._id));

      const isCorrect = userAnswers ? question.options.find(opt => String(opt._id) === String(userAnswers.SelectedOptionId)) : false;

      if (isCorrect) score += question.points;

      processedAnswers.push({
        questionId: question._id,
        SelectedOptionId: userAnswers?.SelectedOptionId,
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
    const results = await Result.find().sort({ completedAt: -1 });
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}