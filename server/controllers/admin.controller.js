import User from "../models/User.js";
import Result from "../models/Result.js";
import Test from "../models/Test.js";
import Category from "../models/Category.js";
import Token from "../models/Token.js";
import cloudinary from "../config/cloudinary.js";

// Users management
export const getUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      User.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      User.countDocuments(),
    ]);

    const usersData = users.map(u => ({
      id: u._id,
      name: u.name,
      email: u.email,
      role: u.role,
      status: u.status,
      avatar: u.avatar,
      createdAt: u.createdAt,
    }));

    res.json({ users: usersData, total, page, pages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ errors: { server: ["Internal server error"] } });
  }
};

export const updateUserRole = async (req, res) => {
  try {
    const { role, status } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ errors: { server: ["User not found"] } });

    if (role) user.role = role;
    if (status) user.status = status;
    await user.save();

    res.json({ message: { server: ["User updated"] } });
  } catch (error) {
    res.status(500).json({ errors: { server: ["Internal server error"] } });
  }
};

export const deleteUserByAdmin = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ errors: { server: ["User not found"] } });

    if (user.avatar) {
      try {
        const publicId = user.avatar.split("/").slice(-2).join("/").replace(/\.[^.]+$/, "");
        await cloudinary.uploader.destroy(publicId);
      } catch (err) {}
    }

    await Token.deleteMany({ userId: user._id });
    await Result.deleteMany({ userId: user._id });
    const userTests = await Test.find({ author: user._id });
    for (const test of userTests) {
      if (test.image) {
        try {
          const publicId = test.image.split("/").slice(-2).join("/").replace(/\.[^.]+$/, "");
          await cloudinary.uploader.destroy(publicId);
        } catch (err) {}
      }
    }
    await Test.deleteMany({ author: user._id });
    await User.findByIdAndDelete(user._id);

    res.json({ message: { server: ["User deleted"] } });
  } catch (error) {
    res.status(500).json({ errors: { server: ["Internal server error"] } });
  }
};

// Tests management
export const getAllTests = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const [tests, total] = await Promise.all([
      Test.find()
        .populate("author", "name avatar")
        .populate("category", "title")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Test.countDocuments(),
    ]);

    res.json({ tests, total, page, pages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ errors: { server: ["Internal server error"] } });
  }
};

// Categories management
export const createCategory = async (req, res) => {
  try {
    const { title, description } = req.body;
    const existing = await Category.findOne({ title });
    if (existing) return res.status(400).json({ errors: { title: ["Category already exists"] } });

    const category = new Category({ title, description });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ errors: { server: ["Internal server error"] } });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { title, description } = req.body;
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ errors: { server: ["Category not found"] } });

    if (title) category.title = title;
    if (description !== undefined) category.description = description;
    await category.save();

    res.json(category);
  } catch (error) {
    res.status(500).json({ errors: { server: ["Internal server error"] } });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ errors: { server: ["Category not found"] } });

    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: { server: ["Category deleted"] } });
  } catch (error) {
    res.status(500).json({ errors: { server: ["Internal server error"] } });
  }
};

// Dashboard stats
export const getDashboardStats = async (req, res) => {
  try {
    const [usersCount, testsCount, resultsCount, categoriesCount] = await Promise.all([
      User.countDocuments(),
      Test.countDocuments(),
      Result.countDocuments(),
      Category.countDocuments(),
    ]);

    const recentTests = await Test.find()
      .populate("author", "name avatar")
      .populate("category", "title")
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    res.json({
      stats: { usersCount, testsCount, resultsCount, categoriesCount },
      recentTests,
      recentUsers: recentUsers.map(u => ({
        id: u._id, name: u.name, email: u.email, role: u.role, status: u.status, avatar: u.avatar, createdAt: u.createdAt
      })),
    });
  } catch (error) {
    res.status(500).json({ errors: { server: ["Internal server error"] } });
  }
};