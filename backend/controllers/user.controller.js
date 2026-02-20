import fs from "fs/promises";

import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Test from "../models/Test.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.findOne({ $or: [{ name }, { email }] });
    if (user) {
      if (user.name === name && user.email === email) return res.status(400).json({ message: "Name and Email already exists" });
      if (user.name === name) return res.status(400).json({ message: "Name already exists" });
      if (user.email === email) return res.status(400).json({ message: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT_WORK_FACTOR));
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ name, email, passwordHash: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id, name: newUser.name, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: "12h" });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { login, password } = req.body;

    const user = await User.findOne({ $or: [{ name: login }, { email: login }] }).select("+passwordHash");
    if (!user) return res.status(404).json({ message: "Login not found" });

    const validPassword = await bcrypt.compare(password, user.passwordHash)
    if (!validPassword) return res.status(401).json({ message: "Incorrect password" });

    const token = jwt.sign({ userId: user._id, name: user.name, role: user.role }, process.env.JWT_SECRET, { expiresIn: "12h" });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.body;
    const requsterId = req.user.id;
    const requsterRole = req.user.role;

    const isOwner = String(requsterId) === String(userId);
    const isAdmin = String(requsterRole) === "admin"

    if (!isOwner && !isAdmin) return res.status(403).json({ message: "Only Admins or Owner can delete account" });

    const user = await User.findByIdAndDelete(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    await Test.deleteMany({ createdBy: userId });

    if (user.image) {
      fs.unlink(user.image);
    }

    res.status(200).json({ message: "The user has been deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}