import { User } from "@prisma/client";
import { Ok, Err, Result } from "../../errors/resultError";
import {
  GetUsersFilters,
  GetUsersReturn,
  UserRepository,
} from "../userRepository";

/**
 * Repository temporaire simulant une base de données utilisateur en mémoire.
 */
export class TempUserRepository implements UserRepository {
  public userList: User[] = [];

  async getUsers(_: GetUsersFilters): Promise<Result<GetUsersReturn, Error>> {
    return Ok.of({
      totalRecord: this.userList.length,
      result: this.userList,
    });
  }

  async getUser(id: string): Promise<Result<User, Error>> {
    const found = this.userList.find((u) => u.id == id);
    if (!found) return Err.of(new Error("User not found"));
    return Ok.of(found);
  }

  async getUserByEmail(email: string): Promise<Result<User, Error>> {
    const found = this.userList.find((u) => u.email == email);
    if (!found) return Err.of(new Error("User not found"));
    return Ok.of(found);
  }

  async getUserById(id: string): Promise<Result<User, Error>> {
    const found = this.userList.find((u) => u.id == id);
    if (!found) return Err.of(new Error("User not found"));
    return Ok.of(found);
  }

  async checkUserExist(id: string): Promise<Result<boolean, Error>> {
    const exists = this.userList.some((u) => u.id == id);
    return Ok.of(exists);
  }

  async checkUserExistByEmail(email: string): Promise<Result<boolean, Error>> {
    const exists = this.userList.some((u) => u.email == email);
    return Ok.of(exists);
  }

  async checkUserExistById(id: string): Promise<Result<boolean, Error>> {
    const exists = this.userList.some((u) => u.id == id);
    return Ok.of(exists);
  }

  async createUser(user: User): Promise<Result<void, Error>> {
    this.userList.push(user);
    return Ok.of(undefined);
  }

  async updateUser(
    id: string,
    data: Partial<User>
  ): Promise<Result<void, Error>> {
    const index = this.userList.findIndex((u) => u.id == id);
    if (index == -1) return Err.of(new Error("User not found"));

    this.userList[index] = { ...this.userList[index], ...data };
    return Ok.of(undefined);
  }

  async deleteUser(id: string): Promise<Result<void, Error>> {
    const index = this.userList.findIndex((u) => u.id == id);
    if (index == -1) return Err.of(new Error("User not found"));

    this.userList.splice(index, 1);
    return Ok.of(undefined);
  }
}
