import jwt from "jsonwebtoken";
const SECRET_KEY = "MAOGMOAMGGMO2PLPAAA2";

export function VerifyToken(req, res, next) {
  const authToken = req.headers.authorization || req.cookies.authToken;

  if (!authToken) {
    return res.status(404).send("unauthorized: missing token");
  }

  try {
    const decodeToken = jwt.verify(authToken, SECRET_KEY);

    const { userId } = decodeToken;
    req.userId = userId;

    next();
  } catch (error) {
    console.error(error);
  }
}