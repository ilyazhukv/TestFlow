import Result from "../models/Result.js";
import Test from "../models/Test.js";

export const getResults = async (req, res) => {
  try {
    const results = await Result.find().populate("userId", "name avatar").populate("testId", "title slug");

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ errors: { server: ["Internal server error"] } });
  }
}

export const getMyResults = async (req, res) => {
  try {
    const result = await Result.find({ userId: req.user.id });
    if (!result.length) return res.status(404).json({ errors: { results: ["Result not found"] } });

    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({ errors: { server: ["Internal server error"] } });
  }
}

const calculateScore = (questions, answers) => {
  let totalScore = 0;
  let maxPossibleScore = 0;

  questions.forEach((question) => {
    if (!question) return;
    maxPossibleScore += question.score;

    const userAnswer = answers?.find((a) => String(a.questionId) === String(question._id));
    const userSelectedIds = userAnswer?.selectedOptIds || [];
    const correctIds = question.options.filter((opt) => opt.isCorrect).map((opt) => String(opt._id));

    let questionScore = 0;
    if (question.type === "one_answer") {
      if (userSelectedIds.length === 1 && correctIds.includes(userSelectedIds[0])) {
        questionScore = question.score;
      }
    } else {
      const correctMatches = userSelectedIds.filter((id) => correctIds.includes(id)).length;
      const wrongMatches = userSelectedIds.filter((id) => !correctIds.includes(id)).length;
      const netScoreFactor = Math.max(0, correctMatches - wrongMatches) / (correctIds.length || 1);
      questionScore = netScoreFactor * question.score;
    }
    totalScore += questionScore;
  });

  return {
    score: Math.round(totalScore * 10) / 10,
    maxScore: maxPossibleScore,
    percent: maxPossibleScore > 0 ? Math.round((totalScore / maxPossibleScore) * 100) : 0,
    completedAt: Date.now()
  };
};

export const saveResult = async (req, res) => {
  try {
    const { answers } = req.body;
    const test = await Test.findOne({ slug: req.params.slug }).populate("questions").lean();
    if (!test) return res.status(404).json({ errors: { tests: ["Not found"] } });

    const stats = calculateScore(test.questions, answers);

    const existingResult = await Result.findOne({ userId: req.user.id, testId: test._id });

    if (!existingResult) {
      const result = await Result.create({
        userId: req.user.id,
        testId: test._id,
        ...stats,
      });
      return res.status(201).json(result);
    }

    if (stats.percent > existingResult.percent) {
      Object.assign(existingResult, stats);
      await existingResult.save();
      return res.status(200).json(existingResult);
    }

    return res.status(200).json(existingResult);
  } catch (error) {
    res.status(500).json({ errors: { server: ["Internal server error"] } });
  }
};

export const calcResult = async (req, res) => {
  try {
    const { answers } = req.body;
    const test = await Test.findOne({ slug: req.params.slug }).populate("questions").lean();
    if (!test) return res.status(404).json({ errors: { tests: ["Not found"] } });

    const stats = calculateScore(test.questions, answers);

    res.status(200).json({
      _id: "000000000000000000000000",
      userId: null,
      testId: test._id,
      ...stats,
      completedAt: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({ errors: { server: ["Internal server error"] } });
  }
};