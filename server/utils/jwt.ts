import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "pick_a_secure_secret";
const TOKEN_EXPIRES_IN = "1h";
interface CustomJwtPayload extends JwtPayload {
  userId: number;
  role: string;
}

export const generateToken = (payload: CustomJwtPayload): string => {
  const options: SignOptions = {
    expiresIn: TOKEN_EXPIRES_IN,
  };
  return jwt.sign(payload, SECRET_KEY, options);
};

export const verifyToken = (token: string): CustomJwtPayload | null => {
  try {
    return jwt.verify(token, SECRET_KEY) as CustomJwtPayload;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};
