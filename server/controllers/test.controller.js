import Test from "../models/Test.js";
import Category from "../models/Category.js";
import fs from "fs/promises";
import path from "path";

export const getTests = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const offset = parseInt(req.query.offset) || 0;
    const { tag, search } = req.query;

    const query = { isPublic: true };
    if (tag) {
      const category = await Category.findOne({ title: tag });
      if (category) query.category = category._id
    }
    if (search) query.title = { $regex: search, $options: "i" };

    const [tests, testsCount] = await Promise.all([
      Test.find(query).populate("author", "name avatar").populate("category", "title").sort({ createdAt: -1 }).skip(offset).limit(limit).lean(),
      Test.countDocuments(query)
    ]);

    res.json({ tests, testsCount });
  } catch (error) {
    res.status(500).json({ errors: { server: ["Internal server error"] } });
  }
};

export const getTest = async (req, res) => {
  try {
    const test = await Test.findOne({ slug: req.params.slug, isPublic: true }).populate("author", "name avatar").populate("category", "title").populate({ path: "questions", select: "-options.isCorrect" }).lean();
    if (!test) return res.status(404).json({ errors: { tests: ["Test not found"] } });

    res.json(test)
  } catch (error) {
    res.status(500).json({ errors: { server: ["Internal server error"] } });
  }
}

export const getMyTest = async (req, res) => {
  try {
    const test = await Test.findOne({ slug: req.params.slug, author: req.user.id }).populate("author", "name avatar").populate("category", "title").populate("questions").lean();
    if (!test) return res.status(404).json({ errors: { tests: ["Test not found"] } });

    res.json(test)
  } catch (error) {
    res.status(500).json({ errors: { server: ["Internal server error"] } });
  }
}

export const createTest = async (req, res) => {
  try {
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
    const { title, description, category } = req.body;

    const newTest = new Test({
      image: imagePath,
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
    res.status(500).json({ errors: { server: ["Internal server error"] } });
  }
};

export const updateTest = async (req, res) => {
  try {
    const test = await Test.findOne({ slug: req.params.slug });
    if (!test) return res.status(404).json({ errors: { server: ["Test not found"] } });

    if (test.author.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ errors: { server: ["Access denied"] } });
    }

    if (req.file) {
      if (test.image) {
        const imagePath = path.join(process.cwd(), test.image);
        await fs.unlink(imagePath)
      }
      test.image = `/uploads/${req.file.filename}`;
    }

    const { title, description, timeLimit, category, isPublic } = req.body;
    test.title = title || test.title;
    test.description = description || test.description;
    test.timeLimit = timeLimit || test.timeLimit;
    test.category = category || test.category;
    test.isPublic = isPublic !== undefined ? isPublic : test.isPublic;

    await test.save();

    const populatedTest = await Test.findOne({ slug: req.params.slug }).populate("author", "name avatar").populate("category", "title").populate("questions").lean();

    res.status(200).json(populatedTest);
  } catch (error) {
    res.status(500).json({ errors: { server: ["Internal server error"] } });
  }
};

export const deleteTest = async (req, res) => {
  try {
    const test = await Test.findOne({ slug: req.params.slug });
    if (!test) return res.status(404).json({ errors: { server: ["Test not found"] } });

    if (test.author.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ errors: { server: ["Access denied"] } });
    }

    if (test.image) {
      try {
        const relativePath = test.image.startsWith('/') ? test.image.substring(1) : test.image;
        const absolutePath = path.join(process.cwd(), relativePath);

        await fs.unlink(absolutePath);
        console.log("File deleted:", absolutePath);
      } catch (err) {
        console.error("File system error (skipping):", err.message);
      }
    }

    await Test.findOneAndDelete({ slug: req.params.slug });

    res.status(200).json({ message: "The test has been deleted successfully" });
  } catch (error) {
    console.error("Critical Delete Error:", error);
    res.status(500).json({ errors: { server: ["Internal server error"] } });
  }
};
