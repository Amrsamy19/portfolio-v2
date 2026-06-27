import { config } from "dotenv";
config({ path: ".env.local" });

export default {
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env.PRISMA_DATABASE_URL
  }
};
