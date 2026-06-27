// Compatibilité Firefox / Chrome
const browserAPI = (typeof browser !== 'undefined') ? browser : chrome;

// Installer l'extension
browserAPI.runtime.onInstalled.addListener(() => {
  console.log('🔥 Extension Mistral AI installée!');

  if (browserAPI.contextMenus) {
    browserAPI.contextMenus.create({
      id: 'mistral-ai-menu',
      title: 'Demander à Mistral AI',
      contexts: ['selection']
    });
  }
});

// Gérer les clics du menu contextuel
if (browserAPI.contextMenus) {
  browserAPI.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === 'mistral-ai-menu') {
      const selectedText = info.selectionText;
      browserAPI.runtime.sendMessage({
        action: 'insertText',
        text: selectedText
      });
    }
  });
}

// Écouter les messages
browserAPI.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getSettings') {
    browserAPI.storage.local.get('mistral_settings', (result) => {
      sendResponse(result['mistral_settings'] || {});
    });
    return true;
  }
});
