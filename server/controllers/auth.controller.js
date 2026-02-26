import User from "../models/User.js";
import Token from "../models/Token.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { generateToken, setRefreshCookie } from "../utils/token.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.findOne({ $or: [{ name }, { email }] });
    if (user) {
      if (user.name === name && user.email === email) return res.status(400).json({ message: "Name and Email already exist" });
      if (user.name === name) return res.status(400).json({ message: "Name already exist" });
      if (user.email === email) return res.status(400).json({ message: "Email already exist" });
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hash = await bcrypt.hash(password, salt);

    const newUser = new User({ name, email, passwordHash: hash });
    await newUser.save();

    const { access, refresh } = generateToken(newUser);

    await Token.findOneAndUpdate({ userId: newUser._id }, { refreshToken: refresh }, { upsert: true });

    setRefreshCookie(res, refresh);
    return res.status(200).json({ access, user: { id: newUser._id, name: newUser.name } });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { login, password } = req.body;

    const user = await User.findOne({ $or: [{ name: login }, { email: login }] }).select("+passwordHash");
    if (!user) return res.status(404).json({ message: "User not found" });

    const validPassword = await bcrypt.compare(password, user.passwordHash);
    if (!validPassword) return res.status(401).json({ message: "Incorrect password" });

    const { access, refresh } = generateToken(user);

    await Token.findOneAndUpdate({ userId: user._id }, { refreshToken: refresh }, { upsert: true });

    setRefreshCookie(res, refresh);
    return res.status(200).json({ access, user: { id: user._id, name: user.name } });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (refreshToken) await Token.findOneAndDelete({ refreshToken });

    res.clearCookie("refreshToken", { httpOnly: true, sameSite: "strict" });

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Logout failed" });
  }
}

export const refresh = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) return res.status(404).json({ message: "Refresh token not found" });

    const tokenData = await Token.findOne({ refreshToken });
    if (!tokenData) return res.status(404).json({ message: "Token not in database" });

    const userData = jwt.verify(refreshToken, process.env.JWT_REFRESH);

    const user = await User.findById(userData.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { access, refresh } = generateToken(user);

    tokenData.refreshToken = refresh;
    await tokenData.save();

    setRefreshCookie(res, refresh);
    return res.status(200).json({ access, user: { id: user._id, name: user.name } });
  } catch (error) {
    await Token.findOneAndDelete({ refreshToken });
    res.clearCookie("refreshToken");
    return res.status(401).json({ message: "Token expired or invalid" });
  }
};