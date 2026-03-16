import User from "../models/User.js";

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ errors: { login: ["User not found"] } });

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
    return res.status(500).json({ errors: { server: ["Internal server error"] } });
  }
}