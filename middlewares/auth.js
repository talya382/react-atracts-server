import jwt from "jsonwebtoken";
//בדיקה אם המשתשמש מובר
export const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // {_id, role}
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
