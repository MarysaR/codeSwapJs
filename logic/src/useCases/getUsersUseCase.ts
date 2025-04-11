import {
  UserRepository,
  GetUsersFilters,
  GetUsersReturn,
} from "../interfaces/userRepository";
import { Result } from "../errors/resultError";

/**
 * UseCase : récupération de la liste de tous les utilisateurs.
 *
 * Cette classe encapsule la logique métier permettant de
 * récupérer tous les utilisateurs, avec prise en charge
 * optionnelle du tri et de la pagination.
 */
export class GetUsersUseCase {
  /**
   * Crée une instance du cas d’usage avec un repository injecté.
   * @param userRepository Instance d’un `UserRepository`
   */
  constructor(private readonly userRepository: UserRepository) {}

  /**
   * Exécute la récupération des utilisateurs selon les filtres fournis.
   * @param filters Paramètres optionnels de pagination et de tri
   * @returns Un `Result` contenant la liste des utilisateurs ou une erreur
   */
  async execute(
    filters: GetUsersFilters
  ): Promise<Result<GetUsersReturn, Error>> {
    return this.userRepository.getUsers(filters);
  }
}
