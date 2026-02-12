import User from "../models/User";

export const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    const validRole = ["user", "admin"];
    if (!validRole.includes(role)) return res.status(400).json({ message: "Invalid role" });

    const updateUser = await User.findByIdAndUpdate(req.params.id, { role }, { new: true });
    if (!updateUser) return res.status(404).json({ message: "User not found" });

    res.status(200).json(updateUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};