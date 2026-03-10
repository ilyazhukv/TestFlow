const checkRole = (roles) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ errors: { auth: ["Not authenticated"] } });
  if (!roles.includes(req.user.role)) return res.status(403).json({ errors: { role: ["Access denied"] } });
  next();
};

export default checkRole;