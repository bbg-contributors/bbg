const isRunningInNativeWaylandMode = require("./isRunningInNativeWaylandMode.js");

module.exports = function (selector) {

  let builtin_ime_enabled;
  let builtin_ime_type;

  let languageStr = Intl.DateTimeFormat().resolvedOptions().locale;

  storage.has("builtin_ime_status", (error, hasKey) => {
    if (hasKey) {
      storage.get("builtin_ime_status", (error, data) => {
        if (error) console.error(error);
        if(data.enabled === "auto"){
          if(isRunningInNativeWaylandMode() && languageStr.startsWith("zh")){
            builtin_ime_enabled = true;
          } else{
            builtin_ime_enabled = false;
          }
        }else if(data.enabled === "true"){
          builtin_ime_enabled = true;
        }else {
          builtin_ime_enabled = false;
        }
        if (builtin_ime_enabled){
          if (data.ime === "auto"){
            
            if (languageStr.startsWith("zh")){
              builtin_ime_type = "pinyin";
            } else {
              builtin_ime_type = "none";
            }
          } else {
            builtin_ime_type = data.type;
            if (builtin_ime_type !== "pinyin" && builtin_ime_type !== "none" && builtin_ime_type !== "xiaohe_doublepinyin"){
              builtin_ime_type = "none";
            }
          }
        }
        if (builtin_ime_enabled && builtin_ime_type !== "none"){
          console.log("Builtin IME initialized.");
          if (builtin_ime_type === "pinyin"){
            SimpleInputMethod.init(selector);
          } else if (builtin_ime_type === "xiaohe_doublepinyin"){
            SimpleInputMethod.init(selector, true, "Xiaohe");
          }
        }

      },
      );
    }
    if (error) console.error(error);
  });

};