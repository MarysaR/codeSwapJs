# PRISMA.md

## 1. Introduction

Ce document décrit l'intégration de **Prisma** au sein du projet **CodeSwap**.
Il couvre la structure des fichiers, l'installation, la configuration, la gestion des migrations ainsi que les bonnes pratiques d'utilisation.

---

## 2. Structure du projet

L'intégration de Prisma suit une organisation modulaire pour garantir une séparation claire des responsabilités.

### **Arborescence des fichiers Prisma**

```
logic/
│── prisma/                 # Contient Prisma et les migrations
│   ├── schema.prisma       # Définition du modèle de la base de données
│   ├── migrations/         # Historique des migrations
│── repositories/           # Gestion des accès aux données
│   ├── user-repository.ts  # Interface des méthodes
│   ├── prisma/
│   │   ├── prisma.user-repository.ts  # Implémentation Prisma des repositories
```

---

## 3. Installation et configuration

### **3.1 Installation des dépendances**

Dans le dossier `logic/`, exécuter la commande suivante pour installer Prisma et ses dépendances :

```sh
cd logic
npm install @prisma/client prisma dotenv
```

### **3.2 Configuration de la base de données**

Le fichier `.env` (situé à la racine de `logic/`) doit contenir la variable `DATABASE_URL` pour permettre à Prisma de se connecter à PostgreSQL.

```ini
DATABASE_URL="postgresql://user:'MDP'@localhost:5432/codeswap"
```

**Remarque :** Remplacer `user`, `password` et `codeswap` par les informations de connexion correctes.

---

## 4. Utilisation de Prisma

### **4.1 Génération du client Prisma**

Chaque modification du fichier `schema.prisma` nécessite une régénération du client Prisma pour synchroniser les types TypeScript avec la base de données.

```sh
cd logic
npx prisma generate
```

### **4.2 Validation du schéma Prisma**

Vérifier si le fichier `schema.prisma` est valide avant de déployer des modifications.

```sh
npx prisma validate
```

### **4.3 Application des migrations**

Lors de la création ou modification du modèle de base de données, appliquer une migration pour synchroniser les changements.

```sh
npx prisma migrate dev --name init
```

**Remarque :** Remplacer `init` par un nom de migration pertinent.

### **4.4 Lancement de Prisma Studio**

Prisma Studio permet de visualiser et manipuler les données de la base en mode graphique.

```sh
npx prisma studio
```

---

## 5. Bonnes pratiques

- Toujours exécuter `npx prisma generate` après une modification du schéma.
- Ne jamais modifier directement les tables en base sans passer par une migration Prisma.
- S'assurer que `DATABASE_URL` est correctement défini dans le fichier `.env`.
- Utiliser des interfaces pour structurer l'accès aux données dans `logic/repositories/`.
- Éviter d'appeler directement Prisma dans `back/`, utiliser `logic/` pour centraliser la gestion des données.

---

## 6. Dépannage

### **Erreur : `Environment variable not found: DATABASE_URL`**

Vérifier que le fichier `.env` est bien présent et que `DATABASE_URL` est correctement défini.

```sh
cat .env
```

### **Erreur : `PrismaClientInitializationError`**

Vérifier que PostgreSQL est bien démarré et accessible.

```sh
systemctl status postgresql
```

---

## 7. Conclusion

Son intégration dans `logic/` permet une séparation claire entre la gestion des données et le backend API.
En suivant ces bonnes pratiques, la maintenance et l'évolution du projet restent fluides et structurées.
