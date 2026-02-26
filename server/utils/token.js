import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  const access = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_ACCESS, { expiresIn: "15m" });
  const refresh = jwt.sign({ id: user._id }, process.env.JWT_REFRESH, { expiresIn: "7d" });

  return { access, refresh };
};

export const setRefreshCookie = (res, refresh) => {
  res.cookie("refreshToken", refresh, { httpOnly: true, sameSite: "strict", maxAge: 7 * 24 * 60 * 60 * 1000 });
};