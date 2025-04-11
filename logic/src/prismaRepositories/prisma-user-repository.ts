import { PrismaClient } from "@prisma/client";
import {
  UserRepository,
  GetUsersFilters,
  GetUsersReturn,
} from "../interfaces/userRepository";
import { Ok, Result } from "../errors/resultError";

export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async getUsers(
    filters: GetUsersFilters
  ): Promise<Result<GetUsersReturn, Error>> {
    const { pageSize, pageStart, sortOrder } = filters;

    const users = await this.prisma.user.findMany({
      orderBy: {
        createdAt: sortOrder == 1 ? "asc" : "desc",
      },
      skip: pageStart,
      take: pageSize,
    });

    const totalRecord = await this.prisma.user.count();

    return Ok.of({
      result: users,
      totalRecord,
    });
  }
}
