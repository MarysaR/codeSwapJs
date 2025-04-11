import { PrismaClient } from "@prisma/client";

/**
 * Instance unique de PrismaClient utilisée dans toute la logique métier.
 */
export const prisma = new PrismaClient();
