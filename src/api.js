class MistralAPI {
  static BASE_URL = 'https://api.mistral.ai/v1';

  static async chat(messages, model = 'mistral-small', temperature = 0.7, apiKey) {
    try {
      const response = await fetch(`${this.BASE_URL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: model,
          messages: messages,
          temperature: temperature,
          max_tokens: 1024,
          top_p: 0.9
        })
      });

      if (!response.ok) {
        let errMsg;
        try {
          const error = await response.json();
          errMsg = error.message || error.detail;
        } catch (e) {
          errMsg = response.statusText;
        }
        throw new Error(errMsg || `API Error: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      throw error;
    }
  }

  static async listModels(apiKey) {
    try {
      const response = await fetch(`${this.BASE_URL}/models`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${apiKey}` }
      });
      if (!response.ok) {
        throw new Error(`Error fetching models: ${response.statusText}`);
      }
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Erreur:', error);
      return [];
    }
  }
}
