import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { authenticate } from "./middlewares/jwt.js";
import jwt from "jsonwebtoken";

export const secretKey = "secretKey";

const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://127.0.0.1:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/user", authenticate, async (req, res) => {
  const dataToken = req.dataToken;

  res.status(200).json({
    user: dataToken.user,
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const accessToken = jwt.sign(
    {
      user: { email },
    },
    secretKey,
    { expiresIn: "30s" }
  );

  res.cookie("jwt", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  res.status(200).json({ msg: "Login successfully" });
});

app.listen(port, () =>
  console.log("> Server is up and running on port : " + port)
);
