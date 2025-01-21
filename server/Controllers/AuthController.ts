import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt";

const prisma = new PrismaClient();

const verifyPassword = async (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
  return isMatch;
};

const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10; // Количество раундов соли
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).send("Invalid credentials");
      return;
    }
    const user = await prisma.user.findUnique({ where: { email } });
    if (user?.role !== "admin") {
      if (!user || user.password !== (await hashPassword(password))) {
        res.status(400).send("Invalid credentials");
        return;
      }
    } else {
      if (!user || user.password !== password) {
        res.status(400).send("Неверный пароль или почта");
        return;
      }
      const token = generateToken({ userId: user.id, role: user.role });
      res.json(token);
      return;
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ "Error logging in": error.message });
      return;
    } else {
      res.status(500).send("unknown error logging in");
      return;
    }
  }
}
