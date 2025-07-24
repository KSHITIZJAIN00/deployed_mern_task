import jwt from "jsonwebtoken";

// Generates token and sets it as an HTTP-only cookie (valid for 7 days)
export const generateTokenAndSetCookie = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d", // ✅ JWT valid for 7 days
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "None", // use 'None' if your frontend is hosted separately and over HTTPS
    maxAge: 7 * 24 * 60 * 60 * 1000, // ✅ Cookie valid for 7 days
  });
};
