import { Request, Response } from "express";
import { GetUsersUseCase, prisma, PrismaUserRepository } from "logic";
import { HTTP_STATUS } from "../constants/httpStatus";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../utils/httpStatusUtils";

export class UserController {
  async getUsers(req: Request, res: Response) {
    const prismaUserRepository = new PrismaUserRepository(prisma);
    const getUsersUseCase = new GetUsersUseCase(prismaUserRepository);

    const pageSize = parseInt(req.query.pageSize as string) || 10;
    const pageStart = parseInt(req.query.pageStart as string) || 0;
    const sortOrder = parseInt(req.query.sortOrder as string) || 1;

    const result = await getUsersUseCase.execute({
      pageSize,
      pageStart,
      sortOrder,
    });

    if (result.isErr()) {
      return sendErrorResponse(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        result.error.message
      );
    }

    return sendSuccessResponse(res, HTTP_STATUS.OK, result.value);
  }
}
