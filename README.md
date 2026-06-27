# 🔥 Mistral AI Firefox Extension

Extension Firefox pour intégrer **Mistral AI** directement dans votre navigateur.

## ✨ Fonctionnalités

- 💬 Chat en temps réel avec Mistral AI
- 🔐 Gestion sécurisée des clés API
- 📜 Historique des conversations persistant
- 🎨 Mode sombre/clair
- ⚙️ Configuration flexible des modèles
- 🚀 Performance optimisée

## 🚀 Installation

### Prérequis
- Firefox 109+
- Clé API Mistral (obtenez-la sur [mistral.ai](https://www.mistral.ai))

### Installation

```bash
git clone https://github.com/wecanmoove/mistral-firefox-extension.git
cd mistral-firefox-extension
bash scripts/build.sh
```

### Charger dans Firefox
1. Ouvrez about:debugging
2. Cliquez sur "Ce Firefox"
3. Cliquez sur "Charger une extension temporaire"
4. Sélectionnez manifest.json dans le dossier dist/

## 🔧 Configuration

1. Cliquez sur l'icône 🔥 dans la barre d'outils
2. Cliquez sur ⚙️ (Paramètres)
3. Entrez votre clé API Mistral
4. Sélectionnez votre modèle préféré
5. Cliquez sur "Enregistrer"

## 🔑 Obtenir une Clé API Mistral

1. Visitez console.mistral.ai
2. Naviguez vers "API Keys"
3. Cliquez sur "Create API Key"
4. Copiez votre clé API

## 📁 Structure du Projet

mistral-firefox-extension/
├── manifest.json
├── popup/ (HTML, JS, CSS)
├── background/ (service-worker.js)
├── content/ (content-script.js, content.css)
├── src/ (api.js, storage.js)
├── scripts/ (setup.sh, build.sh, test.sh)
└── README.md

## 📝 Licence

MIT License

---

Profitez de la puissance de Mistral AI! 🔥
