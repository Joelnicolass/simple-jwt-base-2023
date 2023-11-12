import { secretKey } from "../index.js";
import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
  const accessToken = req.cookies["jwt"];
  if (!accessToken) return res.status(401).json({ msg: "Access Denied." });

  try {
    const decoded = jwt.verify(accessToken, secretKey);
    Object.assign(req, { dataToken: decoded });

    next();
  } catch (error) {
    return res.status(401).json({ msg: "Access Denied." });
  }
};
