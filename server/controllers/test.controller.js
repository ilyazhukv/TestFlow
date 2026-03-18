import Test from "../models/Test.js";

export const getTests = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const offset = parseInt(req.query.offset) || 0;
    const { tag, search } = req.query;

    const query = {};
    if (tag) query.category = tag;
    if (search) query.title = { $regex: search, $options: "i" };

    const [tests, testsCount] = await Promise.all([
      Test.find(query).populate("author", "name avatar").populate("category", "title").sort({ createdAt: -1 }).skip(offset).limit(limit).lean(),
      Test.countDocuments(query)
    ]);

    res.json({ tests, testsCount });
  } catch (error) {
    return res.status(500).json({ errors: { server: ["Internal server error"] } });
  }
};

export const createTest = async (req, res) => {
  try {
    const { image, title, description, category } = req.body.test;

    const newTest = new Test({
      image,
      title,
      description,
      category,
      author: req.user.id
    });

    await newTest.save();

    const populatedTest = await newTest
      .populate([
        { path: "author", select: "name avatar" },
        { path: "category", select: "title" }
      ]);

    res.status(200).json(populatedTest);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ errors: { server: ["Internal server error"] } });
  }
};