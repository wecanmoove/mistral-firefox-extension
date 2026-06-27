#!/bin/bash
# Build script pour l'extension Firefox Mistral AI

echo "🔥 Construction de l'extension Mistral AI..."

required_files=(
  "manifest.json"
  "popup/popup.html"
  "popup/popup.js"
  "popup/popup.css"
  "background/service-worker.js"
  "content/content-script.js"
  "content/content.css"
  "src/api.js"
  "src/storage.js"
)

for file in "${required_files[@]}"; do
  if [ ! -f "$file" ]; then
    echo "❌ Fichier manquant: $file"
    exit 1
  fi
done

BUILD_DIR="dist"
rm -rf "$BUILD_DIR"
mkdir -p "$BUILD_DIR"

echo "📋 Copie des fichiers..."
cp -r manifest.json popup background content src "$BUILD_DIR/" 2>/dev/null || true
[ -d icons ] && cp -r icons "$BUILD_DIR/"

# Créer un zip si web-ext n'est pas disponible
cd "$BUILD_DIR" && zip -r -q ../mistral-extension.zip . && cd ..

echo "✅ Build terminé!"
echo "📦 Extension prête dans: $BUILD_DIR/"
echo "📦 Archive créée: mistral-extension.zip"
echo ""
echo "Pour charger dans Firefox:"
echo "1. Ouvrez about:debugging"
echo "2. Cliquez sur 'Ce Firefox'"
echo "3. 'Charger une extension temporaire'"
echo "4. Sélectionnez $BUILD_DIR/manifest.json"
