import User from "../models/User.js";
import Token from "../models/Token.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { generateToken, setRefreshCookie } from "../service/token.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body.user;

    const user = await User.findOne({ $or: [{ name }, { email }] });
    if (user) {
      if (user.name === name && user.email === email) {
        return res.status(400).json({ errors: { name: ["Already exists"], email: ["Already exists"] } });
      }
      if (user.name === name) return res.status(400).json({ errors: { name: ["Name already exists"] } });
      if (user.email === email) return res.status(400).json({ errors: { email: ["Email already exists"] } });
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hash = await bcrypt.hash(password, salt);

    const newUser = new User({ name, email, passwordHash: hash });
    await newUser.save();

    const { access, refresh } = generateToken(newUser);

    await Token.findOneAndUpdate({ userId: newUser._id }, { refreshToken: refresh, accessToken: access }, { upsert: true });

    setRefreshCookie(res, access, refresh);
    return res.status(200).json({
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        status: newUser.status,
        createdAt: newUser.createdAt,
        avatar: newUser.avatar || null,
      }
    });
  } catch (error) {
    return res.status(500).json({ errors: { server: ["Internal server error"] } });
  }
};

export const login = async (req, res) => {
  try {
    const { login, password } = req.body.user;

    const user = await User.findOne({ $or: [{ name: login }, { email: login }] }).select("+passwordHash");
    if (!user) return res.status(404).json({ errors: { login: ["User not found"] } });

    const validPassword = await bcrypt.compare(password, user.passwordHash);
    if (!validPassword) return res.status(401).json({ errors: { password: ["Incorrect password"] } });

    const { access, refresh } = generateToken(user);

    await Token.findOneAndUpdate({ userId: user._id }, { refreshToken: refresh, accessToken: access }, { upsert: true });

    setRefreshCookie(res, access, refresh);
    return res.status(200).json({
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
};

export const logout = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (refreshToken) await Token.findOneAndDelete({ refreshToken });

    res.clearCookie("refreshToken", { httpOnly: true, sameSite: "strict" });
    res.clearCookie("accessToken", { httpOnly: true, sameSite: "strict" });

    return res.status(200).json({ message: { server: ["Logged out successfully"] } });
  } catch (error) {
    return res.status(401).json({ errors: { server: ["Logout failed"] } });
  }
}

export const refresh = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) return res.status(404).json({ message: { token: ["Refresh token not found"] } });

    const tokenData = await Token.findOne({ refreshToken });
    if (!tokenData) return res.status(404).json({ message: { token: ["Token not in database"] } });

    const userData = jwt.verify(refreshToken, process.env.JWT_REFRESH);

    const user = await User.findById(userData.id);
    if (!user) return res.status(404).json({ message: { login: ["User not found"] } });

    const { access, refresh } = generateToken(user);

    tokenData.accessToken = access;
    tokenData.refreshToken = refresh;
    await tokenData.save();

    setRefreshCookie(res, access, refresh);
    return res.status(200).json({
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
    await Token.findOneAndDelete({ refreshToken: res.cookies.refreshToken });
    res.clearCookie("refreshToken")
    res.clearCookie("accessToken");
    return res.status(401).json({ errors: { login: ["Token expired or invalid"] } });
  }
};