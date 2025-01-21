// usersRouter.ts
import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { getAllUsers, getUserById } from "../Controllers/UserController";
import checkAuth from "../middlewares/checkAuth";

const router = Router();
const prisma = new PrismaClient();

router.get("/", checkAuth, getAllUsers);
router.get("/:id", getUserById);

export default router;
