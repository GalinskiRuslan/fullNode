import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getAllUsers(req: Request, res: Response) {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).send("Error fetching users");
  }
}

export async function getUserById(req: Request, res: Response) {
  try {
    const userId = parseInt(req.params.id);
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      res.status(404).send("User not found");
    }
    res.json(user);
  } catch (error) {
    res.status(500).send(`Error fetching user: ${error}`);
  }
}
