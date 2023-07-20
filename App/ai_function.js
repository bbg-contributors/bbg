
const getAiPrompts = require("./getAiPrompts.js");

module.exports = class {
  constructor() {
    const api_info = storage.getSync("ai_api");
    this.enabled = api_info["enabled"];
    this.api_request_url = api_info["api_request_url"];
    this.api_key = api_info["api_key"];
    this.default_model_type = api_info["default_model_type"];
    this.headers = new Headers();
    this.headers.append("Authorization", "Bearer " + this.api_key);
    this.headers.append("Content-Type", "application/json");
    this.bodyTemplate = {
      "messages": [
        {
          "role": "user",
          "content": ""
        }
      ],
      "model": this.default_model_type,
      "temperature": 1,
      "presence_penalty": 0,
      "top_p": 1,
      "frequency_penalty": 0
    };
  }

  requestTextCompletions(content, callback_func) {
    const messageContent = getAiPrompts("textCompletion", lang_name, content);
    fetch(this.api_request_url, {
      method: "POST",
      body: messageContent,
      headers: this.headers
    }).then(response => {
      return response.json();
    }).then(data => {
      callback_func(data);
    });
  }

  requestTextImprove(content, callback_func) {
    const messageContent = getAiPrompts("textImprove", lang_name, content);
    fetch(this.api_request_url, {
      method: "POST",
      body: messageContent,
      headers: this.headers
    }).then(response => {
      return response.json();
    }).then(data => {
      callback_func(data);
    });
  }

  requestTextSummary(content, callback_func) {
    const messageContent = getAiPrompts("textSummary", lang_name, content);
    fetch(this.api_request_url, {
      method: "POST",
      body: messageContent,
      headers: this.headers
    }).then(response => {
      return response.json();
    }).then(data => {
      callback_func(data);
    });
  }
};