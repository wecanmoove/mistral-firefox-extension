// Compatibilité Firefox / Chrome
const browserAPI = (typeof browser !== 'undefined') ? browser : chrome;

console.log('🔥 Mistral AI Content Script chargé');

// Extrait le texte principal lisible de la page
function extractPageText() {
  const selectors = ['article', 'main', '[role="main"]', '#content', '.content'];
  let root = null;
  for (const sel of selectors) {
    const el = document.querySelector(sel);
    if (el && el.innerText && el.innerText.trim().length > 200) { root = el; break; }
  }
  if (!root) root = document.body;

  const clone = root.cloneNode(true);
  clone.querySelectorAll('script, style, noscript, nav, footer, header, aside, iframe').forEach(n => n.remove());
  let text = clone.innerText || '';
  // Normaliser les espaces et limiter les sauts de ligne multiples
  text = text.replace(new RegExp('[ \\t]+', 'g'), ' ');
  text = text.replace(new RegExp(String.fromCharCode(10) + '{3,}', 'g'), String.fromCharCode(10) + String.fromCharCode(10));
  return text.trim();
}

browserAPI.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getPageContent') {
    sendResponse({
      title: document.title,
      url: window.location.href,
      selectedText: window.getSelection().toString(),
      text: extractPageText()
    });
  }
  return true;
});
