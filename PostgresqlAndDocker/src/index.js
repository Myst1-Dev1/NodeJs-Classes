import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './config/db.js';

import userRoutes from './routes/userRoutes.js';
import errorHandler from './middlewares/errorHandler.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

app.get("/", async(req, res) => {
    const result = await pool.query("SELECT current_database()");
    res.send(`The database name is ${result.rows[0].current_database}`);
});

app.use("/api", userRoutes);

app.use(errorHandler);


app.listen(port, () => {
    console.log('Server is now listening on', port);
});