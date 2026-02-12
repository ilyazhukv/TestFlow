import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.findOne({ $or: [{ name }, { email }] });
    if (user) return res.status(400).json({ message: "Name or email already exists" });

    const salt = await bcrypt.genSalt(Number(process.env.SALT_WORK_FACTOR));
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ name, email, passwordHash: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "Account created" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.findOne({ $or: [{ name }, { email }] });
    if (!user) return res.status(404).json({ message: "Name or email not found" });

    const validPassword = await bcrypt.compare(password, user.passwordHash)
    if (!validPassword) return res.status(401).json({ message: "Incorrect password" });

    const token = jwt.sign({ userId: user._id, name: user.name, role: user.role }, process.env.JWT_SECRET, { expiresIn: "12h" });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};