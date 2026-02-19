import User from "../models/User.js";

export const updateUserRole = async (req, res) => {
  try {
    const { _id, role } = req.body;
    const validRole = ["user", "admin"];
    if (!validRole.includes(role)) return res.status(400).json({ message: "Invalid role" });

    const updatedUser = await User.findByIdAndUpdate(_id, { role }, { new: true });
    if (!updatedUser) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "Role has been updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};