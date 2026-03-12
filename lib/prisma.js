// import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
// import { PrismaClient } from "@prisma/client";

// const adapter = new PrismaBetterSqlite3({
//    url: "file:./prisma/dbs/mainDB.db",
// });

// export const prisma = new PrismaClient({ adapter });
// lib/prisma.js
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "@prisma/client";

const adapter = new PrismaBetterSqlite3({
   url: "file:./prisma/dbs/maindb.db", // make sure the path is correct
});

export const prisma = new PrismaClient({ adapter });