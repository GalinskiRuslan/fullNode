import express, { Request, Response } from "express";
const app = express();
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});
