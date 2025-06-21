"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.todos = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.todos = (0, pg_core_1.pgTable)('todos', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    title: (0, pg_core_1.text)('title').notNull(),
    completed: (0, pg_core_1.boolean)('completed').default(false),
});
