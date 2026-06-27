#!/bin/bash
# Setup script pour l'extension Firefox Mistral AI

echo "🔥 Configuration de l'extension Mistral AI..."

# Créer les dossiers nécessaires
mkdir -p icons popup background content src scripts

# Vérifier la présence des fichiers clés
if [ ! -f "manifest.json" ]; then
  echo "⚠️  manifest.json introuvable - assurez-vous d'être à la racine du projet"
fi

echo ""
echo "✅ Configuration terminée!"
echo ""
echo "Prochaines étapes:"
echo "  1. bash scripts/test.sh   - Vérifier les fichiers"
echo "  2. bash scripts/build.sh  - Construire l'extension"
echo "  3. Charger dans Firefox via about:debugging"
echo ""
echo "💡 N'oubliez pas d'ajouter vos icônes dans le dossier icons/"
