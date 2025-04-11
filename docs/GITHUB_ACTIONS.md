# Documentation GitHub Actions pour CodeSwap

Ce document présente **les workflows GitHub Actions** utilisés dans le projet CodeSwap pour automatiser :

    le contrôle des branches,

    la validation des Pull Requests,

    la vérification continue du code.

## 1. Workflow branch-convention.yml

**Description**

Ce workflow **bloque la création de branches qui ne respectent pas les conventions de nommage**, et empêche tout push direct vers main ou develop.
Branches autorisées

    feat/
    fix/
    chore/
    refacto/
    test/

**Déclenchement**

```yaml
on:
  push:
    tags-ignore:
      - "**"
    branches:
      - "**"
```

**Exemple de blocage**

    Un push sur main ou develop est refusé.
    Une branche debug/xxx est refusée.
    Une branche feat/user-auth est acceptée.

## 2. Workflow prs-convention.yml

**Description**

Ce **workflow empêche les PRs vers main ou develop** si la branche source ne respecte pas la convention.
Branches autorisées pour les PRs

    feat/
    fix/
    chore/
    refacto/
    test/

**Déclenchement**

```yaml
on:
pull_request:
branches: - main - develop
```

## 3. Workflow ci.yml

**Description**

Ce workflow **vérifie que le code TypeScript du dossier logic/ compile correctement** sans générer de fichiers (--noEmit).

**Déclenchement**

```yaml
on:
push:
branches: [develop, main]
pull_request:
branches: [develop, main]
```

## 4. Workflow test.yml

**Description**

Ce **workflow exécute les tests Jest dans le dossier logic/**. Il valide la logique métier indépendamment du backend ou du frontend.

```yaml
Déclenchement

on:
push:
branches: [develop, main]
pull_request:
branches: [develop, main]
```

**Résumé des workflows actifs**

- Fichier YAML Description
- branch-convention.yml Bloque les branches non conformes (feat/, etc.)
- prs-convention.yml Bloque les PRs venant de branches interdites
- ci.yml Vérifie la compilation TypeScript (logic/)
- test.yml Exécute les tests Jest (logic/)
