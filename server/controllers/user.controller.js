import User from "../models/User.js";
import Result from "../models/Result.js";

export const getUserByName = async (req, res) => {
  try {
    const user = await User.findOne({ name: req.params.name }).lean();
    if (!user) return res.status(404).json({ error: { login: ["User not found"] } });

    const results = await Result.find({ userId: user._id }).populate("testId", "title slug image").sort({ completedAt: -1 }).lean();

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      createdAt: user.createdAt,
      avatar: user.avatar || null,
      results,
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