import jwt from "jsonwebtoken";

export const tokenAuthenticator = (req, res, next) => {
  try {
    const token = req.cookies.authtoken;

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized : You must login first",
        success: false,
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Unauthorized :invalid token", success: false });
  }
};
