# 🚀 Documentation GitHub Actions pour CodeSwap

Ce document explique en détail **les workflows GitHub Actions** mis en place pour **automatiser le contrôle des branches, des Pull Requests et du CI/CD** dans CodeSwap.

---

## 1. Workflow `branch-convention.yml`

**Description**  
Ce workflow **empêche la création de branches qui ne respectent pas la convention de nommage** et **bloque les pushs directs sur `main`**.  
Seules les branches **`feature/`, `fix/`, `chore/`, `refacto/` et `test/`** sont autorisées.

**Déclenchement (`on:`)**

```yaml
on:
  push:
    tags-ignore:
      - "**"
    branches:
      - "**"

jobs:
  check-branch-name:
    runs-on: ubuntu-latest
    steps:
      - name: Vérifier si la branche respecte la convention de nommage
        run: |
          BRANCH_NAME="${{ github.ref_name }}"

          if [[ "$BRANCH_NAME" == "main" || "$BRANCH_NAME" == "develop" ]]; then
            echo "❌ Erreur : Les pushs directs sur 'main' et 'develop' sont interdits !"
            exit 1
          fi

          if [[ ! "$BRANCH_NAME" =~ ^(feature|fix|chore|refacto|test)/ ]]; then
            echo "❌ Erreur : Le nom de la branche doit commencer par 'feature/', 'fix/', 'chore/', 'refacto/' ou 'test'."
            exit 1
          fi

          echo "✅ Le nom de la branche respecte la convention."
```

### Cela va :

- Bloquer toute branche qui ne suit pas la convention.
- Empêcher les pushs directs sur `main`.
- Autoriser uniquement `feature/`, `fix/`, `chore/`, `refacto/` et `test/`.

---

## 2. Workflow `prs-convention.yml`

**Description**

Ce workflow **empêche la création de PRs vers `main` tant que `develop` n'est pas validé** et **bloque les PRs non conformes**.

**Déclenchement (`on:`)**

```yaml
on:
  pull_request:
    branches:
      - main
      - develop

jobs:
  check-pr-origin:
    runs-on: ubuntu-latest
    steps:
      - name: Vérifier si la branche source respecte les conventions
        run: |
          BRANCH_NAME="${{ github.head_ref }}"

          if [[ ! "$BRANCH_NAME" =~ ^(feature|chore|fix|refacto|test)/ ]]; then
            echo "❌ Erreur : Seules les branches 'feature/', 'chore/', 'fix/', 'refacto/' et 'test/' peuvent ouvrir une PR."
            exit 1
          fi

          echo "✅ La PR respecte les conventions."
```

### Cela va :

- Bloquer les PRs venant de `hotfix/`, ou tout autre préfixe interdit.
- Empêcher les PRs directes vers `main` tant que `develop` n'est pas validé.
- Autoriser uniquement `feature/`, `fix/`, `chore/`, `refacto/` et `test/`.

---

## 3. Workflow `ci-cd.yml`

**Description**

Ce workflow **gère le pipeline CI/CD pour valider les PRs** avant qu'elles ne soient fusionnées.

**Déclenchement (`on:`)**

```yaml
on:
  pull_request:
    branches:
      - develop
      - main
```

#### Exécution des tests

```yaml
jobs:
  ci-tests:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout du code
        uses: actions/checkout@v3

      - name: Vérification de la structure du projet
        run: ls -R

      - name: Lancer les tests (placeholder)
        run: echo "Tests en cours..."
```

### Cela va :

- Vérifier que GitHub récupère bien tous les fichiers du repo.
- Servir de base pour ajouter des tests unitaires dans le futur.

#### Trois workflows GitHub Actions pour :

- Restreindre les branches,
- Restreindre les PRs,
- Gérer CI/CD.

![alt text](image-3.png)

![alt text](image-2.png)

![alt text](image-4.png)
