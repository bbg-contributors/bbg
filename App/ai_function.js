
const getAiPrompts = require("./getAiPrompts.js");

module.exports = class {
  constructor() {
    const api_info = storage.getSync("ai_api");
    this.enabled = api_info["enabled"];
    this.api_request_url = api_info["api_request_url"];
    this.api_key = api_info["api_key"];
    this.default_model_type = api_info["default_model_type"];
    // set default value
    if (this.api_request_url.trim() === "") {
      this.api_request_url = "https://api.openai.com/v1/completions";
    }
    if (this.api_key.trim() === ""){
      this.api_key = "";
    }
    if (this.default_model_type.trim() === ""){
      this.default_model_type = "text-davinci-003";
    }
    this.headers = new Headers({
      "Authorization": "Bearer " + this.api_key,
      "Content-Type": "application/json"
    });
    this.bodyTemplate = {
      "messages": [
        {
          "role": "user",
          "content": ""
        }
      ],
      "model": this.default_model_type,
      "max_tokens": 1000
    };
  }

  requestTextCompletions(content, callback_func) {
    const messageContent = getAiPrompts("textCompletion", lang_name, content);
    let bodyContent = this.bodyTemplate;
    bodyContent.messages[0].content = messageContent;
    fetch(this.api_request_url, {
      method: "POST",
      body: JSON.stringify(bodyContent),
      headers: this.headers
    }).then(response => {
      return response.json();
    }).then(data => {
      callback_func(data);
    });
  }

  requestTextImprove(content, callback_func) {
    const messageContent = getAiPrompts("textImprove", lang_name, content);
    let bodyContent = this.bodyTemplate;
    bodyContent.messages[0].content = messageContent;
    fetch(this.api_request_url, {
      method: "POST",
      body: bodyContent,
      headers: this.headers
    }).then(response => {
      return response.json();
    }).then(data => {
      callback_func(data);
    });
  }

  requestTextSummary(content, callback_func) {
    const messageContent = getAiPrompts("textSummary", lang_name, content);
    let bodyContent = this.bodyTemplate;
    bodyContent.messages[0].content = messageContent;
    fetch(this.api_request_url, {
      method: "POST",
      body: bodyContent,
      headers: this.headers
    }).then(response => {
      return response.json();
    }).then(data => {
      callback_func(data);
    });
  }
};