import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "@prisma/client";

const adapter = new PrismaBetterSqlite3({
   // url: "file:./prisma/dbs/maindb.db", // make sure the path is correct
   // url: env(DATABASE_URL), // make sure the path is correct
   url: process.env.DATABASE_URL,
});

export const prisma = new PrismaClient({ adapter });