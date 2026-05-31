import "dotenv/config";
import cors from "cors";
import express, { Request, Response } from "express";

import { router } from "./routes";

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);

app.use((error: Error, _req: Request, res: Response) => {
  if (error instanceof Error) {
    return res.status(400).json({ error: error.message });
  }

  return res.status(500).json({ error: "Erro interno do servidor" });
});

const PORT = process.env.PORT! || 3333;

app.listen(PORT, () => {
  console.log(
    `Server is running on port ${PORT}, access http://localhost:${PORT} to use the API`,
  );
});
