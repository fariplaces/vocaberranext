import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: "file:./prisma/dbs/maindb.db", // or libsql:// for Turso
  },
});