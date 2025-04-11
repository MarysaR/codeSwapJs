"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("@prisma/client");
/**
 * Instance unique de PrismaClient utilisée dans toute la logique métier.
 */
exports.prisma = new client_1.PrismaClient();
