"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaUserRepository = void 0;
const resultError_1 = require("../errors/resultError");
class PrismaUserRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getUsers(filters) {
        const { pageSize, pageStart, sortOrder } = filters;
        const users = await this.prisma.user.findMany({
            orderBy: {
                createdAt: sortOrder == 1 ? "asc" : "desc",
            },
            skip: pageStart,
            take: pageSize,
        });
        const totalRecord = await this.prisma.user.count();
        return resultError_1.Ok.of({
            result: users,
            totalRecord,
        });
    }
}
exports.PrismaUserRepository = PrismaUserRepository;
