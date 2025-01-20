import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

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
    const user = await prisma.user.findUnique({ where: { email } });
    if (user?.role !== "admin") {
      if (!user || user.password !== (await hashPassword(password))) {
        res.status(401).send("Invalid credentials");
      }
    } else {
      if (!user || user.password !== password) {
        res.status(401).send("Invalid credentials");
      }
      res.json(user);
    }
  } catch (error) {}
}
