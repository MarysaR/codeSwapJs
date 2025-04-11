import { User } from "@prisma/client";
import { Result } from "../errors/resultError";

export interface GetUsersFilters {
  pageSize: number;
  pageStart: number;
  sortOrder: number;
}

export interface GetUsersReturn {
  totalRecord: number;
  result: User[];
}

export interface UserRepository {
  getUsers(filters: GetUsersFilters): Promise<Result<GetUsersReturn, Error>>;
}
