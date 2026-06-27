// Compatibilité Firefox / Chrome
const browserAPI = (typeof browser !== 'undefined') ? browser : chrome;

console.log('🔥 Mistral AI Content Script chargé');

browserAPI.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getPageContent') {
    sendResponse({
      title: document.title,
      url: window.location.href,
      selectedText: window.getSelection().toString()
    });
  }
  return true;
});
