import express, { Request, Response } from "express";
import usersRouter from "./Routes/userRouter";
const app = express();
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));

app.use("/users", usersRouter);
