import User from "../models/User.js";
import Result from "../models/Result.js";
import Test from "../models/Test.js";
import Token from "../models/Token.js";
import bcrypt from "bcryptjs";
import cloudinary from "../config/cloudinary.js";

export const getUserByName = async (req, res) => {
  try {
    const user = await User.findOne({ name: req.params.name }).lean();
    if (!user) return res.status(404).json({ error: { login: ["User not found"] } });

    const results = await Result.find({ userId: user._id }).populate("testId", "title slug image").sort({ completedAt: -1 }).lean();
    const tests = await Test.find({ author: user._id }).populate("author", "name avatar").populate("category", "title").lean();

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      createdAt: user.createdAt,
      avatar: user.avatar || null,
      results,
      tests,
    });
  } catch (error) {
    return res.status(500).json({ error: { server: ["Internal server error"] } });
  }
}

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).lean();
    if (!user) return res.status(404).json({ error: { login: ["User not found"] } });

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        createdAt: user.createdAt,
        avatar: user.avatar || null,
      }
    });
  } catch (error) {
    return res.status(500).json({ error: { server: ["Internal server error"] } });
  }
}

export const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ errors: { server: ["User not found"] } });

    const { name, email } = req.body;

    if (name && name !== user.name) {
      const existing = await User.findOne({ name });
      if (existing) return res.status(400).json({ errors: { name: ["Name already taken"] } });
      user.name = name;
    }

    if (email && email !== user.email) {
      const existing = await User.findOne({ email });
      if (existing) return res.status(400).json({ errors: { email: ["Email already taken"] } });
      user.email = email;
    }

    if (req.file) {
      if (user.avatar) {
        try {
          const publicId = user.avatar.split("/").slice(-2).join("/").replace(/\.[^.]+$/, "");
          await cloudinary.uploader.destroy(publicId);
        } catch (err) {
          console.error("Cloudinary delete error:", err.message);
        }
      }
      user.avatar = req.file.path;
    }

    await user.save();

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      createdAt: user.createdAt,
      avatar: user.avatar || null,
    });
  } catch (error) {
    return res.status(500).json({ errors: { server: ["Internal server error"] } });
  }
}

export const changePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("+passwordHash");
    if (!user) return res.status(404).json({ errors: { server: ["User not found"] } });

    const { currentPassword, newPassword } = req.body;

    const validPassword = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!validPassword) return res.status(401).json({ errors: { currentPassword: ["Current password is incorrect"] } });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    user.passwordHash = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.json({ message: { server: ["Password updated successfully"] } });
  } catch (error) {
    return res.status(500).json({ errors: { server: ["Internal server error"] } });
  }
}

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ errors: { server: ["User not found"] } });

    if (user.avatar) {
      try {
        const publicId = user.avatar.split("/").slice(-2).join("/").replace(/\.[^.]+$/, "");
        await cloudinary.uploader.destroy(publicId);
      } catch (err) {
        console.error("Cloudinary delete error:", err.message);
      }
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

    res.clearCookie("refreshToken", { httpOnly: true, sameSite: "strict" });
    res.clearCookie("accessToken", { httpOnly: true, sameSite: "strict" });

    res.json({ message: { server: ["Account deleted successfully"] } });
  } catch (error) {
    return res.status(500).json({ errors: { server: ["Internal server error"] } });
  }
}