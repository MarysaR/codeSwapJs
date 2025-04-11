# 🚀 Scripts Bash pour Automatiser le Workflow GitHub

Ce document explique l'utilisation des **scripts Bash** pour automatiser la gestion des branches et des Pull Requests dans le projet **CodeSwap**.

---

## 1. Script `create-feature.sh`

**Description**

Ce script permet de **créer une nouvelle branche `feat/xxx` à partir de `develop`** et de la pousser sur GitHub automatiquement.

**Utilisation**

1️. **Rendre le script exécutable (une seule fois)**

```bash
chmod +x create-feat.sh
```

2. **Exécuter le script**

```bash
./create-feat.sh nom-de-la-fonctionnalité
```

### Cela va :

- Vérifier et mettre à jour `develop`
- Créer une branche `feat/nom-de-la-fonctionnalité`
- Pousser la branche sur GitHub

### Ce que fais le script :

- Vérifie que `develop` existe et est à jour.
- Crée la branche `feat/ajout-authentification` à partir de `develop`.
- Pousse cette branche sur GitHub.
