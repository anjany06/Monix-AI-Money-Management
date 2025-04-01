import { PrismaClient } from "@prisma/client";

export const db = globalThis.prisma || new PrismaClient();
// why we done this globalThis so basically in next js have a feature of hot reloading
//so every time it reloads it create a new  prisma client instance

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}

// more information
//globalThis.prisma : This global variable ensures that the Prisma client instance is 
//reused across hot reloads during development.Without this, each time your application
//reloads, a new Prisma client instance would be created, leading to a memory leak and conn issues.