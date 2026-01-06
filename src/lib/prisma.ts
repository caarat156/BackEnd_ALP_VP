// src/lib/prisma.ts
import { PrismaClient } from "@prisma/client";

// This creates one single connection for your whole app to share
const prisma = new PrismaClient();



export default prisma;