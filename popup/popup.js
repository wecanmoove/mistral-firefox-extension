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
const darkModeToggle = document.getElementById('dark-mode-toggle');
const saveSettingsBtn = document.getElementById('save-settings-btn');
const clearHistoryBtn = document.getElementById('clear-history-btn');

let currentSettings = {};
let conversationHistory = [];

document.addEventListener('DOMContentLoaded', async () => {
  await loadSettings();
  await loadConversationHistory();
  setupEventListeners();
  applyDarkMode();
});

async function loadSettings() {
  currentSettings = await Storage.getSettings();
  if (currentSettings) {
    apiKeyInput.value = currentSettings.apiKey || '';
    modelSelect.value = currentSettings.model || 'mistral-small';
    temperatureInput.value = currentSettings.temperature || 0.7;
    darkModeToggle.checked = currentSettings.darkMode || false;
  }
}

async function loadConversationHistory() {
  conversationHistory = await Storage.getConversationHistory();
  displayConversationHistory();
}

function displayConversationHistory() {
  chatMessages.innerHTML = '';
  conversationHistory.forEach(message => {
    addMessageToChat(message.content, message.role);
  });
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addMessageToChat(content, role = 'user') {
  const messageDiv = document.createElement('div');
  messageDiv.className = \`message \${role}\`;
  const contentDiv = document.createElement('div');
  contentDiv.className = 'message-content';
  contentDiv.textContent = content;
  messageDiv.appendChild(contentDiv);
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function setupEventListeners() {
  sendBtn.addEventListener('click', handleSendMessage);
  userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  });
  settingsBtn.addEventListener('click', openSettings);
  closeModalBtn.addEventListener('click', closeSettings);
  saveSettingsBtn.addEventListener('click', saveSettings);
  clearHistoryBtn.addEventListener('click', clearHistory);
  darkModeToggle.addEventListener('change', toggleDarkMode);
}

async function handleSendMessage() {
  const message = userInput.value.trim();
  if (!message) return;
  if (!currentSettings.apiKey) {
    alert('⚠️ Veuillez configurer votre clé API Mistral');
    openSettings();
    return;
  }
  addMessageToChat(message, 'user');
  conversationHistory.push({ role: 'user', content: message });
  userInput.value = '';
  sendBtn.disabled = true;
  sendBtn.textContent = '⏳ Chargement...';
  try {
    const response = await MistralAPI.chat(
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const settingsBtn = document.getElementById('settings-btn');
const settingsModal = document.getElementById('settings-modal');
const closeModalBtn = document.getElementById('close-modal');
const apiKeyInput = document.getElementById('api-key-input');
const modelSelect = document.getElementById('model-select');
const temperatureInput = document.getElementById('temperature-input');
const darkModeToggle = document.getElementById('dark-mode-toggle');
const saveSettingsBtn = document.getElementById('save-settings-btn');
const clearHistoryBtn = document.getElementById('clear-history-btn');

let currentSettings = {};
let conversationHistory = [];

document.addEventListener('DOMContentLoaded', async () => {
  await loadSettings();
  await loadConversationHistory();
  setupEventListeners();
  applyDarkMode();
});

async function loadSettings() {
  currentSettings = await Storage.getSettings();
  if (currentSettings) {
    apiKeyInput.value = currentSettings.apiKey || '';
    modelSelect.value = currentSettings.model || 'mistral-small';
    temperatureInput.value = currentSettings.temperature || 0.7;
    darkModeToggle.checked = currentSettings.darkMode || false;
  }
}

async function loadConversationHistory() {
  conversationHistory = await Storage.getConversationHistory();
  displayConversationHistory();
}

function displayConversationHistory() {
  chatMessages.innerHTML = '';
  conversationHistory.forEach(message => {
    addMessageToChat(message.content, message.role);
  });
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addMessageToChat(content, role = 'user') {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${role}`;
  const contentDiv = document.createElement('div');
  contentDiv.className = 'message-content';
  contentDiv.textContent = content;
  messageDiv.appendChild(contentDiv);
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function setupEventListeners() {
  sendBtn.addEventListener('click', handleSendMessage);
  userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  });
  settingsBtn.addEventListener('click', openSettings);
  closeModalBtn.addEventListener('click', closeSettings);
  saveSettingsBtn.addEventListener('click', saveSettings);
  clearHistoryBtn.addEventListener('click', clearHistory);
  darkModeToggle.addEventListener('change', toggleDarkMode);
}

async function handleSendMessage() {
  const message = userInput.value.trim();
  if (!message) return;
  if (!currentSettings.apiKey) {
    alert('⚠️ Veuillez configurer votre clé API Mistral');
    openSettings();
    return;
  }
  addMessageToChat(message, 'user');
  conversationHistory.push({ role: 'user', content: message });
  userInput.value = '';
  sendBtn.disabled = true;
  sendBtn.textContent = '⏳ Chargement...';
  try {
    const response = await MistralAPI.chat(
      conversationHistory,
      currentSettings.model,
      currentSettings.temperature,
      currentSettings.apiKey
    );
    addMessageToChat(response, 'assistant');
    conversationHistory.push({ role: 'assistant', content: response });
    await Storage.saveConversationHistory(conversationHistory);
  } catch (error) {
    console.error('Erreur:', error);
    addMessageToChat(`❌ Erreur: ${error.message}`, 'error');
  } finally {
    sendBtn.disabled = false;
    sendBtn.textContent = 'Envoyer';
  }
}

function openSettings() {
  settingsModal.classList.remove('hidden');
}

function closeSettings() {
  settingsModal.classList.add('hidden');
}

async function saveSettings() {
  currentSettings = {
    apiKey: apiKeyInput.value,
    model: modelSelect.value,
    temperature: parseFloat(temperatureInput.value),
    darkMode: darkModeToggle.checked
  };
  await Storage.saveSettings(currentSettings);
  applyDarkMode();
  closeSettings();
  alert('✅ Paramètres enregistrés!');
}

async function clearHistory() {
  if (confirm('Êtes-vous sûr? Cette action est irréversible.')) {
    conversationHistory = [];
    await Storage.saveConversationHistory([]);
    displayConversationHistory();
    alert('✅ Historique effacé!');
  }
}

function toggleDarkMode() {
  applyDarkMode();
}

function applyDarkMode() {
  const isDark = darkModeToggle.checked;
  if (isDark) {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
}
