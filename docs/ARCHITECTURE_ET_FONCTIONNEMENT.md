# 📘 Documentation : Communication entre Backend, Logic et Frontend

## 1. Vue d’ensemble

Le projet suit une architecture en trois couches distinctes, chacune ayant un rôle précis :

- **Backend** (Express.js, Node.js) : API REST qui gère les requêtes du Frontend et appelle `Logic` pour le traitement des données.
- **Logic** (Node.js, TypeScript, Prisma ORM) : Service indépendant qui effectue des transformations de données demandées par le Backend.
- **Frontend** (Vue.js, Vite) : Affiche l’interface utilisateur et envoie des requêtes HTTP au Backend.

Chaque couche communique via des requêtes HTTP et fonctionne indépendamment, garantissant une **architecture hexagonale modulaire (Clean Architecture)**.

---

## 2. Fonctionnement détaillé

### 1. L'utilisateur interagit avec **Frontend**

- L’utilisateur accède à `http://localhost:5173/`.
- Le Frontend affiche une page et envoie une requête `fetch()` au Backend vers `http://localhost:3300/users`.

### 2. **Communication Frontend → Backend**

- Le Frontend envoie une requête HTTP `GET /users` au Backend (Express.js).
- Le **Backend** intercepte cette requête et déclenche le UseCase `GetAllUsersUseCase` via `Logic`.

### 3. **Communication Backend → Logic**

- Le Backend **n’implémente pas directement la logique de pagination ou de récupération**.
- Il instancie `PrismaUserRepository` depuis `Logic`, qui lui-même utilise Prisma pour interagir avec la base de données.
- Il exécute ensuite le `GetAllUsersUseCase` avec les paramètres de pagination.

### 4. **Logic répond au Backend**

- Le UseCase retourne une liste d’utilisateurs paginée :

  ```json
  {
    "result": [ ... ],
    "totalRecord": 42
  }
  ```

  **Le Backend encapsule cette réponse et la renvoie à l’interface utilisateur.**

### 5. **Backend → Frontend**

    Backend retourne la liste paginée à Frontend, qui l’affiche dynamiquement.

---

## 3. Schéma du cheminement

**Utilisateur ⇄ Frontend (Vue.js) ⇄ Backend (Express.js) ⇄ Logic (Node.js)**

    Frontend envoie une requête à http://localhost:3300/users?pageSize=10&pageStart=0&sortOrder=1.

    Backend utilise un UseCase défini dans logic/ pour récupérer les utilisateurs.

    Logic traite via Prisma et renvoie les résultats.

    Backend envoie les utilisateurs paginés au Frontend.

---

## 4. Exemple de requêtes

**Requête envoyée par Frontend au Backend**

```js
fetch("http://localhost:3300/users?pageSize=10&pageStart=0&sortOrder=1")
  .then((res) => res.json())
  .then((data) => {
    console.log("Utilisateurs :", data.payload.result);
    console.log("Total :", data.payload.totalRecord);
  });
```

**Requête exécutée par le Backend**

    Récupère les paramètres pageSize, pageStart, sortOrder

    Instancie un PrismaUserRepository et exécute GetAllUsersUseCase

    Retourne la liste paginée des utilisateurs

**Réponse générée par Logic**

```json
{
  "payload": {
    "result": [
      {
        "id": "uuid1",
        "email": "user@example.com",
        "createdAt": "2025-04-10T10:00:00Z",
        "role": "ADMIN"
      }
    ],
    "totalRecord": 42
  }
}
```

## 5. Résumé

✔ Le Frontend appelle GET /users
✔ Le Backend délègue à Logic via un UseCase.
✔ Logic exécute la requête Prisma et retourne le résultat.
✔ Le Backend répond au Frontend avec les données formatées.
✔ Le Frontend affiche la liste paginée d’utilisateurs.
