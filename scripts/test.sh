#!/bin/bash
# Test script - vérifie la structure de l'extension

echo "🧪 Vérification des fichiers..."

test_count=0
pass_count=0

test_file() {
  local file="$1"
  local name="$2"
  test_count=$((test_count + 1))
  if [ -f "$file" ]; then
    echo "✅ $name existe"
    pass_count=$((pass_count + 1))
  else
    echo "❌ $name manquant: $file"
  fi
}

test_file "manifest.json" "Manifest"
test_file "popup/popup.html" "Popup HTML"
test_file "popup/popup.js" "Popup JS"
test_file "popup/popup.css" "Popup CSS"
test_file "background/service-worker.js" "Service Worker"
test_file "content/content-script.js" "Content Script"
test_file "content/content.css" "Content CSS"
test_file "src/api.js" "API Module"
test_file "src/storage.js" "Storage Module"

# Vérifier que manifest.json est un JSON valide
if command -v python3 &> /dev/null; then
  if python3 -c "import json; json.load(open('manifest.json'))" 2>/dev/null; then
    echo "✅ manifest.json est un JSON valide"
    pass_count=$((pass_count + 1))
  else
    echo "❌ manifest.json invalide"
  fi
  test_count=$((test_count + 1))
fi

echo ""
echo "Résultats: $pass_count/$test_count tests réussis"

if [ $pass_count -eq $test_count ]; then
  echo "✅ Tous les tests réussis!"
  exit 0
else
  echo "❌ Certains tests ont échoué"
  exit 1
fi
