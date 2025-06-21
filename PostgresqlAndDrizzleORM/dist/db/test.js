"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const client = new pg_1.Client({
    connectionString: process.env.DATABASE_URL,
});
client.connect()
    .then(() => {
    console.log('✅ Conexão bem-sucedida com o banco de dados PostgreSQL');
    return client.end();
})
    .catch((err) => {
    console.error('❌ Falha na conexão com o banco:', err.message);
});
