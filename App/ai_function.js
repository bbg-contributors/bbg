
const getAiPrompts = require("./getAiPrompts.js");
const ai_function_openai = require("./ai_function_openai.js");
const ai_function_baiduqianfan = require("./ai_function_baiduqianfan.js");

module.exports = class {
  constructor() {
    const api_type = storage.getSync("ai_api_type")["type"];
    if(api_type === "openai"){
      this.aiFunctionInstance = new ai_function_openai();
    }else if(api_type === "baiduqianfan"){
      this.aiFunctionInstance = new ai_function_baiduqianfan();
    }else if(api_type === "xunfeixinghuo"){
      // wait for implementation
    }else if(api_type === "none"){
      // wait for implementation
    }
  }

  requestTextCompletions(content, callback_func) {
    this.aiFunctionInstance.requestTextCompletions(content, callback_func);
  }

  requestTextImprove(content, callback_func) {
    this.aiFunctionInstance.requestTextImprove(content, callback_func);
  }

  requestTextSummary(content, callback_func) {
    this.aiFunctionInstance.requestTextSummary(content, callback_func);
  }
};