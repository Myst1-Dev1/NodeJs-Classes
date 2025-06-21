import "dotenv/config";

import express, { Request, Response } from 'express';
import { db } from './db/db';
import { todos } from './db/schema';

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.send('Hello world');
});

app.get('/todos', async (_req, res) => {
  const results = await db.select().from(todos);
  res.json(results);
});

app.listen(PORT, () => {
  console.log('Server running on', PORT);
});
