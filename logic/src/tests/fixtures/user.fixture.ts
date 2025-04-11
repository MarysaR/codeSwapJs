import { User } from "@prisma/client";
import { Result } from "../../errors/resultError";
import { TempUserRepository } from "../../interfaces/tempRepositories/tempUserRepository";
import { GetUserUseCase } from "../../useCases/getUsersUseCase";
import {
  GetUsersFilters,
  GetUsersReturn,
} from "../../interfaces/userRepository";

/**
 * Fixture de test pour les utilisateurs.
 */
export const createUserFixture = () => {
  const tempUserRepository = new TempUserRepository();
  const getUsersUseCase = new GetUserUseCase(tempUserRepository);

  return {
    reset() {
      tempUserRepository.userList = [];
    },

    async whenUserIsCreated(user: User) {
      return tempUserRepository.createUser(user);
    },

    async whenUserGetsPaginatedList(
      filters: GetUsersFilters
    ): Promise<Result<GetUsersReturn, Error>> {
      return getUsersUseCase.execute(filters);
    },

    /**
     * Prépare les données attendues à comparer dans les tests.
     * Effectue la logique de correspondance d'utilisateurs.
     */
    prepareExpectedMatch(
      result: Result<GetUsersReturn, Error>,
      expected: User[]
    ): { match: boolean; count: number } {
      if (result.isErr()) return { match: false, count: 0 };

      const resultUsers = result.value.result;
      const allMatch = expected.every((expectedUser) =>
        resultUsers.some(
          (actual) =>
            actual.id == expectedUser.id && actual.email == expectedUser.email
        )
      );

      return { match: allMatch, count: resultUsers.length };
    },
  };
};

export type UserFixture = ReturnType<typeof createUserFixture>;
