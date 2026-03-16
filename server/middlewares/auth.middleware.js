import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) return res.status(401).json({ error: { token: ["No token"] } });

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (error) {
    res.status(401).json({ error: { server: ["Invalid or expired token"] } });
  }
};

export default authMiddleware;