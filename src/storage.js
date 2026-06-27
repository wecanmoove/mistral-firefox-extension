// Compatibilité Firefox / Chrome
const browserAPI = (typeof browser !== 'undefined') ? browser : chrome;

class Storage {
  static KEYS = {
    SETTINGS: 'mistral_settings',
    CONVERSATION_HISTORY: 'mistral_conversation_history'
  };

  static async saveSettings(settings) {
    return new Promise((resolve) => {
      browserAPI.storage.local.set({ [this.KEYS.SETTINGS]: settings }, resolve);
    });
  }

  static async getSettings() {
    return new Promise((resolve) => {
      browserAPI.storage.local.get(this.KEYS.SETTINGS, (result) => {
        resolve(result[this.KEYS.SETTINGS] || {});
      });
    });
  }

  static async saveConversationHistory(history) {
    return new Promise((resolve) => {
      browserAPI.storage.local.set({ [this.KEYS.CONVERSATION_HISTORY]: history }, resolve);
    });
  }

  static async getConversationHistory() {
    return new Promise((resolve) => {
      browserAPI.storage.local.get(this.KEYS.CONVERSATION_HISTORY, (result) => {
        resolve(result[this.KEYS.CONVERSATION_HISTORY] || []);
      });
    });
  }

  static async clearAll() {
    return new Promise((resolve) => {
      browserAPI.storage.local.clear(resolve);
    });
  }

  static async addToConversationHistory(message) {
    const history = await this.getConversationHistory();
    history.push(message);
    await this.saveConversationHistory(history);
    return history;
  }
}
