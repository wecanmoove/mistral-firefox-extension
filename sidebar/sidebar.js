// Compatibilité Firefox / Chrome
const browserAPI = (typeof browser !== 'undefined') ? browser : chrome;

// Éléments du DOM
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const settingsBtn = document.getElementById('settings-btn');
const settingsModal = document.getElementById('settings-modal');
const closeModalBtn = document.getElementById('close-modal');
const apiKeyInput = document.getElementById('api-key-input');
const modelSelect = document.getElementById('model-select');
const temperatureInput = document.getElementById('temperature-input');
const pageContextToggle = document.getElementById('page-context-toggle');
const darkModeToggle = document.getElementById('dark-mode-toggle');
const saveSettingsBtn = document.getElementById('save-settings-btn');
const clearHistoryBtn = document.getElementById('clear-history-btn');

let currentSettings = {};
let conversationHistory = [];

document.addEventListener('DOMContentLoaded', async () => {
  await loadSettings();
  await loadHistory();
  setupEvents();
  applyDarkMode();
});

async function loadSettings() {
  currentSettings = await Storage.getSettings();
  apiKeyInput.value = currentSettings.apiKey || '';
  modelSelect.value = currentSettings.model || 'mistral-small-latest';
  temperatureInput.value = currentSettings.temperature ?? 0.7;
  pageContextToggle.checked = currentSettings.pageContext !== false;
  darkModeToggle.checked = currentSettings.darkMode || false;
}

async function loadHistory() {
  conversationHistory = await Storage.getConversationHistory();
  if (conversationHistory.length) {
    chatMessages.innerHTML = '';
    conversationHistory.forEach(m => renderMessage(m.content, m.role));
  }
}

function renderMessage(content, role, extraClass) {
  const div = document.createElement('div');
  div.className = 'message ' + role + (extraClass ? ' ' + extraClass : '');
  const inner = document.createElement('div');
  inner.className = 'message-content';
  inner.textContent = content;
  div.appendChild(inner);
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return div;
}

function setupEvents() {
  sendBtn.addEventListener('click', () => sendMessage());
  userInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });
  settingsBtn.addEventListener('click', () => settingsModal.classList.remove('hidden'));
  closeModalBtn.addEventListener('click', () => settingsModal.classList.add('hidden'));
  saveSettingsBtn.addEventListener('click', saveSettings);
  clearHistoryBtn.addEventListener('click', clearHistory);
  darkModeToggle.addEventListener('change', applyDarkMode);

  document.querySelectorAll('.action-chip').forEach(chip => {
    chip.addEventListener('click', () => handleQuickAction(chip.dataset.action));
  });
}

// Récupère le contenu / la sélection de l'onglet actif
async function getActiveTabContext() {
  try {
    const tabs = await browserAPI.tabs.query({ active: true, currentWindow: true });
    if (!tabs || !tabs[0]) return null;
    const response = await browserAPI.tabs.sendMessage(tabs[0].id, { action: 'getPageContent' });
    return response;
  } catch (e) {
    console.warn('Impossible de lire la page active:', e);
    return null;
  }
}

async function handleQuickAction(action) {
  const ctx = await getActiveTabContext();
  let prompt = '';
  if (action === 'summarize') {
    if (!ctx || !ctx.text) { renderMessage('❌ Impossible de lire le contenu de la page.', 'error'); return; }
    prompt = 'Résume cette page web de façon concise:\n\nTitre: ' + ctx.title + '\n\n' + ctx.text.slice(0, 6000);
    await sendMessage('Résume la page : ' + ctx.title, prompt);
  } else if (action === 'explain') {
    if (!ctx || !ctx.selectedText) { renderMessage('❌ Aucun texte sélectionné sur la page.', 'error'); return; }
    prompt = 'Explique ce passage de manière claire:\n\n' + ctx.selectedText;
    await sendMessage('Explique la sélection', prompt);
  } else if (action === 'key-points') {
    if (!ctx || !ctx.text) { renderMessage('❌ Impossible de lire le contenu de la page.', 'error'); return; }
    prompt = 'Donne les points clés de cette page sous forme de liste à puces:\n\n' + ctx.text.slice(0, 6000);
    await sendMessage('Points clés de : ' + ctx.title, prompt);
  }
}

// displayText = ce qui s'affiche dans le chat utilisateur
// apiText = ce qui est réellement envoyé à l'API (peut inclure le contexte)
async function sendMessage(displayText, apiText) {
  const typed = userInput.value.trim();
  const userVisible = displayText || typed;
  const toSend = apiText || typed;
  if (!userVisible) return;

  if (!currentSettings.apiKey) {
    renderMessage('⚠️ Veuillez configurer votre clé API Mistral dans les paramètres ⚙️', 'error');
    settingsModal.classList.remove('hidden');
    return;
  }

  // nettoyer le message de bienvenue
  const welcome = chatMessages.querySelector('.welcome');
  if (welcome) welcome.remove();

  renderMessage(userVisible, 'user');
  if (!apiText) userInput.value = '';

  // Construire le contexte de la page si activé et message libre
  let finalMessages = [...conversationHistory];
  if (!apiText && pageContextToggle.checked) {
    const ctx = await getActiveTabContext();
    if (ctx && ctx.text) {
      finalMessages.push({
        role: 'system',
        content: 'Contexte de la page active (titre: ' + ctx.title + '): ' + ctx.text.slice(0, 4000)
      });
    }
  }
  finalMessages.push({ role: 'user', content: toSend });
  conversationHistory.push({ role: 'user', content: userVisible });

  const loading = renderMessage('Mistral réfléchit...', 'assistant', 'loading');
  sendBtn.disabled = true;

  try {
    const reply = await MistralAPI.chat(
      finalMessages,
      currentSettings.model || 'mistral-small-latest',
      currentSettings.temperature ?? 0.7,
      currentSettings.apiKey
    );
    loading.remove();
    renderMessage(reply, 'assistant');
    conversationHistory.push({ role: 'assistant', content: reply });
    await Storage.saveConversationHistory(conversationHistory);
  } catch (err) {
    loading.remove();
    renderMessage('❌ Erreur: ' + err.message, 'error');
  } finally {
    sendBtn.disabled = false;
  }
}

async function saveSettings() {
  currentSettings = {
const browserAPI = (typeof browser !== 'undefined') ? browser : chrome;
const NL = String.fromCharCode(10);

// Éléments du DOM
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const settingsBtn = document.getElementById('settings-btn');
const settingsModal = document.getElementById('settings-modal');
const closeModalBtn = document.getElementById('close-modal');
const apiKeyInput = document.getElementById('api-key-input');
const modelSelect = document.getElementById('model-select');
const temperatureInput = document.getElementById('temperature-input');
const pageContextToggle = document.getElementById('page-context-toggle');
const darkModeToggle = document.getElementById('dark-mode-toggle');
const saveSettingsBtn = document.getElementById('save-settings-btn');
const clearHistoryBtn = document.getElementById('clear-history-btn');

let currentSettings = {};
let conversationHistory = [];

document.addEventListener('DOMContentLoaded', async () => {
  await loadSettings();
  await loadHistory();
  setupEvents();
  applyDarkMode();
});

async function loadSettings() {
  currentSettings = await Storage.getSettings();
  apiKeyInput.value = currentSettings.apiKey || '';
  modelSelect.value = currentSettings.model || 'mistral-small-latest';
  temperatureInput.value = currentSettings.temperature ?? 0.7;
  pageContextToggle.checked = currentSettings.pageContext !== false;
  darkModeToggle.checked = currentSettings.darkMode || false;
}

async function loadHistory() {
  conversationHistory = await Storage.getConversationHistory();
  if (conversationHistory.length) {
    chatMessages.innerHTML = '';
    conversationHistory.forEach(m => renderMessage(m.content, m.role));
  }
}

function renderMessage(content, role, extraClass) {
  const div = document.createElement('div');
  div.className = 'message ' + role + (extraClass ? ' ' + extraClass : '');
  const inner = document.createElement('div');
  inner.className = 'message-content';
  inner.textContent = content;
  div.appendChild(inner);
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return div;
}

function setupEvents() {
  sendBtn.addEventListener('click', () => sendMessage());
  userInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });
  settingsBtn.addEventListener('click', () => settingsModal.classList.remove('hidden'));
  closeModalBtn.addEventListener('click', () => settingsModal.classList.add('hidden'));
  saveSettingsBtn.addEventListener('click', saveSettings);
  clearHistoryBtn.addEventListener('click', clearHistory);
  darkModeToggle.addEventListener('change', applyDarkMode);
  document.querySelectorAll('.action-chip').forEach(chip => {
    chip.addEventListener('click', () => handleQuickAction(chip.dataset.action));
  });
}

async function getActiveTabContext() {
  try {
    const tabs = await browserAPI.tabs.query({ active: true, currentWindow: true });
    if (!tabs || !tabs[0]) return null;
    return await browserAPI.tabs.sendMessage(tabs[0].id, { action: 'getPageContent' });
  } catch (e) {
    console.warn('Impossible de lire la page active:', e);
    return null;
  }
}

async function handleQuickAction(action) {
  const ctx = await getActiveTabContext();
  if (action === 'summarize') {
    if (!ctx || !ctx.text) { renderMessage('❌ Impossible de lire le contenu de la page.', 'error'); return; }
    const prompt = 'Résume cette page web de façon concise.' + NL + 'Titre: ' + ctx.title + NL + NL + ctx.text.slice(0, 6000);
    await sendMessage('Résume la page : ' + ctx.title, prompt);
  } else if (action === 'explain') {
    if (!ctx || !ctx.selectedText) { renderMessage('❌ Aucun texte sélectionné sur la page.', 'error'); return; }
    const prompt = 'Explique ce passage de manière claire.' + NL + NL + ctx.selectedText;
    await sendMessage('Explique la sélection', prompt);
  } else if (action === 'key-points') {
    if (!ctx || !ctx.text) { renderMessage('❌ Impossible de lire le contenu de la page.', 'error'); return; }
    const prompt = 'Donne les points clés de cette page sous forme de liste à puces.' + NL + NL + ctx.text.slice(0, 6000);
    await sendMessage('Points clés de : ' + ctx.title, prompt);
  }
}

async function sendMessage(displayText, apiText) {
  const typed = userInput.value.trim();
  const userVisible = displayText || typed;
  const toSend = apiText || typed;
  if (!userVisible) return;
  if (!currentSettings.apiKey) {
    renderMessage('⚠️ Veuillez configurer votre clé API Mistral dans les paramètres.', 'error');
    settingsModal.classList.remove('hidden');
    return;
  }
  const welcome = chatMessages.querySelector('.welcome');
  if (welcome) welcome.remove();
  renderMessage(userVisible, 'user');
  if (!apiText) userInput.value = '';
  let finalMessages = [...conversationHistory];
  if (!apiText && pageContextToggle.checked) {
    const ctx = await getActiveTabContext();
    if (ctx && ctx.text) {
      finalMessages.push({ role: 'system', content: 'Contexte de la page active (titre: ' + ctx.title + '): ' + ctx.text.slice(0, 4000) });
    }
  }
  finalMessages.push({ role: 'user', content: toSend });
  conversationHistory.push({ role: 'user', content: userVisible });
  const loading = renderMessage('Mistral réfléchit...', 'assistant', 'loading');
  sendBtn.disabled = true;
  try {
    const reply = await MistralAPI.chat(finalMessages, currentSettings.model || 'mistral-small-latest', currentSettings.temperature ?? 0.7, currentSettings.apiKey);
    loading.remove();
    renderMessage(reply, 'assistant');
    conversationHistory.push({ role: 'assistant', content: reply });
    await Storage.saveConversationHistory(conversationHistory);
  } catch (err) {
    loading.remove();
    renderMessage('❌ Erreur: ' + err.message, 'error');
  } finally {
    sendBtn.disabled = false;
  }
}

async function saveSettings() {
  currentSettings = {
    apiKey: apiKeyInput.value,
    model: modelSelect.value,
    temperature: parseFloat(temperatureInput.value),
    pageContext: pageContextToggle.checked,
    darkMode: darkModeToggle.checked
  };
  await Storage.saveSettings(currentSettings);
  applyDarkMode();
  settingsModal.classList.add('hidden');
}

async function clearHistory() {
  if (confirm('Effacer tout l historique de conversation ?')) {
    conversationHistory = [];
    await Storage.saveConversationHistory([]);
    chatMessages.innerHTML = '<div class="welcome"><p>👋 Historique effacé.</p></div>';
  }
}

function applyDarkMode() {
  if (darkModeToggle.checked) {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
}

browserAPI.runtime.onMessage.addListener((request) => {
  if (request.action === 'quickAction' && request.type) {
    handleQuickAction(request.type);
  } else if (request.action === 'insertText' && request.text) {
    userInput.value = request.text;
    userInput.focus();
  }
});
