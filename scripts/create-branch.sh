echo "Veuillez choisir un type de branche :"
echo "1) feat"
echo "2) fix"
echo "3) chore"
echo "4) refacto"
echo "5) test"
read -p "Entrez le numéro correspondant : " TYPE_CHOICE

case $TYPE_CHOICE in
    1) BRANCH_TYPE="feat" ;;
    2) BRANCH_TYPE="fix" ;;
    3) BRANCH_TYPE="chore" ;;
    4) BRANCH_TYPE="refacto" ;;
    5) BRANCH_TYPE="test" ;;
    *) echo "❌ Erreur : Choix invalide."; exit 1 ;;
esac

read -p "Entrez le nom de la branche : " BRANCH_NAME

if [ -z "$BRANCH_NAME" ]; then
    echo "❌ Erreur : Vous devez spécifier un nom de branche !"
    exit 1
fi

FULL_BRANCH_NAME="$BRANCH_TYPE/$BRANCH_NAME"

echo "📌 Vérification de l'existence de la branche develop..."
git fetch origin develop
if ! git show-ref --verify --quiet refs/heads/develop; then
    echo "❌ Erreur : La branche develop n'existe pas en local, récupération depuis GitHub..."
    git checkout -b develop origin/develop
else
    git checkout develop
    git pull origin develop
fi

echo "🚀 Création de la branche $FULL_BRANCH_NAME..."
git checkout -b "$FULL_BRANCH_NAME"

echo "✅ Branche $FULL_BRANCH_NAME créée avec succès !"
echo "📡 Poussée vers GitHub..."
git push -u origin "$FULL_BRANCH_NAME"

echo "🎉 Votre branche $FULL_BRANCH_NAME est prête !"