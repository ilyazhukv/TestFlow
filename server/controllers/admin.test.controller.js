import Test from "../models/Test.js";
import User from "../models/User.js";
import Category from "../models/Category.js";
import cloudinary from "../config/cloudinary.js";

// Admin test management
export const getAllTestsAdmin = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const search = req.query.search || "";
    const category = req.query.category || "";

    let query = {};
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ];
    }
    if (category) {
      query.category = category;
    }

    const [tests, total] = await Promise.all([
      Test.find(query)
        .populate("author", "name avatar")
        .populate("category", "title")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Test.countDocuments(query),
    ]);

    res.json({ tests, total, page, pages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ errors: { server: ["Internal server error"] } });
  }
};

export const getTestByIdAdmin = async (req, res) => {
  try {
    const test = await Test.findById(req.params.id)
      .populate("author", "name avatar")
      .populate("category", "title")
      .lean();
    
    if (!test) return res.status(404).json({ errors: { server: ["Test not found"] } });
    
    res.json(test);
  } catch (error) {
    res.status(500).json({ errors: { server: ["Internal server error"] } });
  }
};

export const updateTestAdmin = async (req, res) => {
  try {
    const test = await Test.findById(req.params.id);
    if (!test) return res.status(404).json({ errors: { server: ["Test not found"] } });

    const { title, description, category, isPublic, timeLimit } = req.body;
    
    if (title !== undefined) test.title = title;
    if (description !== undefined) test.description = description;
    if (category !== undefined) test.category = category;
    if (isPublic !== undefined) test.isPublic = isPublic;
    if (timeLimit !== undefined) test.timeLimit = timeLimit;

    if (req.file) {
      if (test.image) {
        try {
          const publicId = test.image.split("/").slice(-2).join("/").replace(/\.[^.]+$/, "");
          await cloudinary.uploader.destroy(publicId);
        } catch (err) {
          console.error("Cloudinary delete error:", err.message);
        }
      }
      test.image = req.file.path;
    }

    await test.save();
    
    const populatedTest = await Test.findById(test._id)
      .populate("author", "name avatar")
      .populate("category", "title")
      .lean();
      
    res.json(populatedTest);
  } catch (error) {
    res.status(500).json({ errors: { server: ["Internal server error"] } });
  }
};

export const deleteTestAdmin = async (req, res) => {
  try {
    const test = await Test.findById(req.params.id);
    if (!test) return res.status(404).json({ errors: { server: ["Test not found"] } });

    if (test.image) {
      try {
        const publicId = test.image.split("/").slice(-2).join("/").replace(/\.[^.]+$/, "");
        await cloudinary.uploader.destroy(publicId);
      } catch (err) {
        console.error("Cloudinary delete error:", err.message);
      }
    }

    await Test.findByIdAndDelete(req.params.id);
    res.json({ message: { server: ["Test deleted"] } });
  } catch (error) {
    res.status(500).json({ errors: { server: ["Internal server error"] } });
  }
};