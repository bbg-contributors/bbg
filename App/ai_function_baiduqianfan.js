
const getAiPrompts = require("./getAiPrompts.js");

module.exports = class {
  constructor() {
    const api_info = storage.getSync("ai_api_info");
    this.enabled = api_info["enabled"];
    // 由于百度千帆大语言模型的每个模型的调用地址都不同且其模型数量极多，使用时请自己填写要用的模型相应的API地址
    this.api_request_url = api_info["api_request_url"];
    // 由于百度鉴权方式过于离谱，暂不支持百度千帆大语言模型类型的API反代
    this.api_key = api_info["api_key"];
    this.secret_key = api_info["secret_key"];
    this._getAccessToken = (apiKey, secretKey) => {
      let access_token = "";
      fetch(`https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=${apiKey}&client_secret=${secretKey}`, {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        method: "POST",
        body: ""
      })
        .then(res => res.json())
        .then(data => {
          access_token =  String(data.access_token);
        });
      return access_token;
    };
    // set default value
    if (this.api_request_url.trim() === "") {
      this.api_request_url = `https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions?access_token=${this._getAccessToken(this.api_key, this.secret_key)}`;
    }
    this.headers = {
      "Content-Type": "application/json"
    };
    this.bodyTemplate = {
      "messages": [
        {
          "role": "user",
          "content": ""
        }
      ]
    };
  }

  // Warning: callback_func似乎不能与openai like api重用！
  /*
    实例响应：
{
  "id": "as-bcmt5ct4iy",
  "object": "chat.completion",
  "created": 1680167072,
  "result": "您好，我是百度研发的知识增强大语言模型，中文名是文心一言，英文名是ERNIE-Bot。我能够与人对话互动，回答问题，协助创作，高效便捷地帮助人们获取信息、知识和灵感。",
  "is_truncated":false,
  "need_clear_history": false,
  "usage": {
    "prompt_tokens": 7,
    "completion_tokens": 67,
    "total_tokens": 74
  }
}
  */
  requestTextCompletions(content, callback_func) {
    let messageContent = getAiPrompts("textCompletion", lang_name, content);
    let bodyContent = this.bodyTemplate;
    bodyContent.messages[0].content = messageContent;
    fetch(`${this.api_request_url}`, {
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
    let messageContent = getAiPrompts("textImprove", lang_name, content);
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

  requestTextSummary(content, callback_func) {
    let messageContent = getAiPrompts("textSummary", lang_name, content);
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
};