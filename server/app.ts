import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const app = express();
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));

const prisma = new PrismaClient();

async function getAllUsers() {
  const users = await prisma.user.findMany();
  return users;
}

app.get("/", async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers(); // Ждем, пока промис не выполнится
    res.json(users); // Отправляем пользователей в формате JSON
  } catch (error) {
    res.status(500).send("Error fetching users");
  }
});
