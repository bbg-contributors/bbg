module.exports = class {
  constructor() {
    this.settings = Object.assign({
      enabled: false,
      api_mode: "chat_completions",
      api_request_url: "",
      api_key: "",
      default_model_type: "gpt-4.1-mini"
    }, storage.getSync("oai_api_settings") || {});
    this.api_mode = this.settings.api_mode;
    this.api_request_url = this.settings.api_request_url.trim();
    this.api_key = this.settings.api_key.trim();
    this.default_model_type = this.settings.default_model_type.trim() || "gpt-4.1-mini";
    if (this.api_request_url === "") {
      this.api_request_url = this.api_mode === "responses"
        ? "https://api.openai.com/v1/responses"
        : "https://api.openai.com/v1/chat/completions";
    }
    this.headers = new Headers({
      "Authorization": "Bearer " + this.api_key,
      "Content-Type": "application/json"
    });
  }

  isConfigured() {
    return this.settings.enabled === true && this.api_key !== "";
  }

  requestTextCompletions(content, options, callback_func) {
    this._request("textCompletion", content, options, callback_func);
  }

  requestTextImprove(content, options, callback_func) {
    this._request("textImprove", content, options, callback_func);
  }

  requestTextSummary(content, options, callback_func) {
    this._request("textSummary", content, options, callback_func);
  }

  async _request(promptType, content, options, callback_func) {
    if (this.isConfigured() === false) {
      callback_func({
        error: {
          message: lang_name === "简体中文"
            ? "请先在开始界面的应用设置中配置 OpenAI API。"
            : "Please configure OpenAI API settings from the start page first."
        }
      });
      return;
    }

    try {
      const normalizedOptions = this._normalizeOptions(options);
      const prompt = this._buildPrompt(promptType, content, normalizedOptions);
      const data = this.api_mode === "responses"
        ? await this._requestResponses(prompt, normalizedOptions)
        : await this._requestChatCompletions(prompt, normalizedOptions);
      callback_func({
        text: data
      });
    } catch (error) {
      callback_func({
        error: {
          message: error.message
        }
      });
    }
  }

  _normalizeOptions(options) {
    const amount = Number(options && options.amount);
    return {
      amount: Number.isFinite(amount) ? Math.max(1, Math.min(5, amount)) : null,
      customRequirement: options && typeof options.customRequirement === "string"
        ? options.customRequirement.trim()
        : ""
    };
  }

  _buildPrompt(promptType, content, options) {
    const language = lang_name === "简体中文" ? "zh-CN" : "en-US";
    const intensityHints = {
      "textCompletion": {
        "zh-CN": [
          "续写量很少，只补 1 到 2 小段。",
          "续写量偏少，只补少量必要内容。",
          "续写量适中，补完一个自然段落层级的后续内容。",
          "续写量偏多，尽可能完整展开后续内容。",
          "续写量很多，尽量充分展开后续内容。"
        ],
        "en-US": [
          "Keep the continuation very short, around 1 to 2 small paragraphs.",
          "Keep the continuation relatively short and only add necessary content.",
          "Use a medium continuation length and extend the article naturally.",
          "Use a longer continuation and expand the article in more detail.",
          "Use a very long continuation and expand the article as fully as possible."
        ]
      },
      "textImprove": {
        "zh-CN": [
          "不要额外限制输出长度；请对整篇文章进行完整润色，在不改变原意的前提下提升表达、流畅度和可读性。"
        ],
        "en-US": [
          "Do not impose any extra output-length limit; polish the entire article thoroughly while preserving its original meaning."
        ]
      },
      "textSummary": {
        "zh-CN": [
          "摘要非常短，只保留最核心信息。",
          "摘要较短，尽量简洁。",
          "摘要长度适中，覆盖主要信息。",
          "摘要偏长，覆盖更多细节。",
          "摘要很长，尽量完整概括主要内容与细节。"
        ],
        "en-US": [
          "Make the summary very short and keep only the core points.",
          "Make the summary fairly short and concise.",
          "Use a medium-length summary covering the main points.",
          "Use a longer summary with more detail.",
          "Use a very detailed summary that covers as much important content as possible."
        ]
      }
    };
    const promptMap = {
      "textCompletion": {
        "zh-CN": "下面会给出一篇 Markdown 文章，其中 `[[BBG_CURSOR_HERE]]` 表示当前编辑器的光标插入位置。请结合光标前后的上下文，在该位置自然地补写一小段后续内容，保持原文语言、语气和 Markdown 风格。只输出需要插入的新增内容，不要重复原文，不要输出标记，不要解释。",
        "en-US": "You will receive a Markdown article where `[[BBG_CURSOR_HERE]]` marks the current insertion point in the editor. Based on the surrounding context before and after that marker, write a natural continuation to be inserted at that exact position, keeping the same language, tone, and Markdown style. Output only the new text to insert, without repeating the original text, without the marker, and without explanations."
      },
      "textImprove": {
        "zh-CN": "下面会给出一篇 Markdown 文章，请在不改变原意的前提下润色，使其更通顺清晰，并尽量保留 Markdown 结构。直接输出润色后的完整文本，不要解释。",
        "en-US": "You will receive a Markdown article. Polish it for clarity and readability without changing its meaning, while preserving the Markdown structure as much as possible. Output only the fully rewritten text."
      },
      "textSummary": {
        "zh-CN": "下面会给出一篇 Markdown 文章，请生成一段简洁摘要。不要输出原文，不要解释。",
        "en-US": "You will receive a Markdown article. Generate a concise summary. Do not repeat the original text and do not add explanations."
      }
    };
    const intensityIndex = promptType === "textImprove" ? 0 : options.amount - 1;
    let prompt = `${promptMap[promptType][language]}\n${intensityHints[promptType][language][intensityIndex]}`;
    if (options.customRequirement !== "") {
      prompt += language === "zh-CN"
        ? `\n额外要求：${options.customRequirement}`
        : `\nAdditional requirements: ${options.customRequirement}`;
    }
    return `${prompt}\n\n${content}`;
  }

  _getTokenLimit(amount) {
    if (amount === null) {
      return null;
    }
    return [250, 500, 900, 1400, 2200][amount - 1];
  }

  async _requestChatCompletions(prompt, options) {
    const tokenLimit = this._getTokenLimit(options.amount);
    const body = {
      model: this.default_model_type,
      messages: [
        {
          role: "user",
          content: prompt
        }
      ]
    };
    if (tokenLimit !== null) {
      body.max_tokens = tokenLimit;
    }
    const response = await fetch(this.api_request_url, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(body)
    });
    const data = await response.json();
    if (response.ok !== true) {
      throw new Error(this._extractErrorMessage(data, "OpenAI Chat Completions API request failed."));
    }
    const outputText = this._extractChatCompletionsText(data);
    if (outputText.trim() === "") {
      throw new Error(lang_name === "简体中文" ? "OpenAI 没有返回可用文本。" : "OpenAI did not return usable text.");
    }
    return outputText;
  }

  async _requestResponses(prompt, options) {
    const tokenLimit = this._getTokenLimit(options.amount);
    const body = {
      model: this.default_model_type,
      input: prompt
    };
    if (tokenLimit !== null) {
      body.max_output_tokens = tokenLimit;
    }
    const response = await fetch(this.api_request_url, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(body)
    });
    const data = await response.json();
    if (response.ok !== true) {
      throw new Error(this._extractErrorMessage(data, "OpenAI Responses API request failed."));
    }
    const outputText = this._extractResponsesText(data);
    if (outputText.trim() === "") {
      throw new Error(lang_name === "简体中文" ? "OpenAI 没有返回可用文本。" : "OpenAI did not return usable text.");
    }
    return outputText;
  }

  _extractChatCompletionsText(data) {
    if (data.choices === undefined || data.choices.length === 0) {
      return "";
    }
    const message = data.choices[0].message || {};
    if (typeof message.content === "string") {
      return message.content;
    }
    if (Array.isArray(message.content)) {
      return message.content
        .map((item) => item.text || item.content || "")
        .join("");
    }
    return "";
  }

  _extractResponsesText(data) {
    if (typeof data.output_text === "string") {
      return data.output_text;
    }
    if (Array.isArray(data.output)) {
      return data.output.map((item) => {
        if (Array.isArray(item.content)) {
          return item.content.map((contentItem) => {
            if (typeof contentItem.text === "string") {
              return contentItem.text;
            }
            if (contentItem.type === "output_text" && typeof contentItem.text === "string") {
              return contentItem.text;
            }
            return "";
          }).join("");
        }
        return "";
      }).join("");
    }
    return "";
  }

  _extractErrorMessage(data, fallbackMessage) {
    if (data && data.error && typeof data.error.message === "string") {
      return data.error.message;
    }
    return fallbackMessage;
  }
};
