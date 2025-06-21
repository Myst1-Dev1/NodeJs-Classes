"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const db_1 = require("./db/db");
const schema_1 = require("./db/schema");
const app = (0, express_1.default)();
const PORT = process.env.PORT;
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send('Hello world');
});
app.get('/todos', async (_req, res) => {
    const results = await db_1.db.select().from(schema_1.todos);
    res.json(results);
});
app.listen(PORT, () => {
    console.log('Server running on', PORT);
});
