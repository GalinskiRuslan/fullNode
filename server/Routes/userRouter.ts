// usersRouter.ts
import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { getAllUsers, getUserById } from "../Controllers/UserController";

const router = Router();
const prisma = new PrismaClient();

router.get("/", getAllUsers);
router.get("/:id", getUserById);

export default router;
