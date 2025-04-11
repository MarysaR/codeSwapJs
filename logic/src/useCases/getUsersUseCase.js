"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUsersUseCase = void 0;
/**
 * UseCase : récupération de la liste de tous les utilisateurs.
 *
 * Cette classe encapsule la logique métier permettant de
 * récupérer tous les utilisateurs, avec prise en charge
 * optionnelle du tri et de la pagination.
 */
class GetUsersUseCase {
    userRepository;
    /**
     * Crée une instance du cas d’usage avec un repository injecté.
     * @param userRepository Instance d’un `UserRepository`
     */
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    /**
     * Exécute la récupération des utilisateurs selon les filtres fournis.
     * @param filters Paramètres optionnels de pagination et de tri
     * @returns Un `Result` contenant la liste des utilisateurs ou une erreur
     */
    async execute(filters) {
        return this.userRepository.getUsers(filters);
    }
}
exports.GetUsersUseCase = GetUsersUseCase;
