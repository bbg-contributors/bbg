const { readFileSync, readdirSync } = require("fs");
const path = require("path");

lang_meta = JSON.parse(
  readFileSync(__dirname + "/i18n/meta.json", "utf8")
);

const getFullLangData = function () {
  lang_current = new Object();
  lang_material = new Object();
  i18n_path = `${__dirname}/i18n/multi_language_next_generation`;
  files = readdirSync(i18n_path).filter(
    item => item.endsWith(".json")
  );

  for (file of files) {
    content = JSON.parse(
      readFileSync(
        `${i18n_path}/${file}`, "utf8"
      )
    );
    lang_material[content["name"]] = {};
    for (key in content["data"]) {
      lang_material[content["name"]][key] = content["data"][key];
    }
  }

  for (let j = 0; j < lang_meta["需要翻译的键值"].length; j++) {
    lang_current[lang_meta["需要翻译的键值"][j]] = new Object();

    for (let i = 0; i < lang_meta["名称与文件名之间的映射关系"].length; i++) {
      if (
        typeof lang_material[
          lang_meta["名称与文件名之间的映射关系"][i]["name"]
        ][lang_meta["需要翻译的键值"][j]] === "string"
      ) {
        // is string
        lang_current[lang_meta["需要翻译的键值"][j]][
          lang_meta["名称与文件名之间的映射关系"][i]["name"]
        ] =
          lang_material[lang_meta["名称与文件名之间的映射关系"][i]["name"]][
            lang_meta["需要翻译的键值"][j]
          ];
      } else if(
        typeof lang_material[
          lang_meta["名称与文件名之间的映射关系"][i]["name"]
        ][lang_meta["需要翻译的键值"][j]] === "undefined"
      ){

        if(typeof lang_material["简体中文"][
          lang_meta["需要翻译的键值"][j]
        ] !== "string"){
          // is array


          if(typeof lang_material["English"][
            lang_meta["需要翻译的键值"][j]
          ] !== "undefined"){

            for (
              let k = 0;
              k <
              lang_material["English"][
                lang_meta["需要翻译的键值"][j]
              ].length;
              k++
            ) {
              if (lang_current[lang_meta["需要翻译的键值"][j]][k] === undefined) {
                lang_current[lang_meta["需要翻译的键值"][j]][k] = new Object();
              }
              lang_current[lang_meta["需要翻译的键值"][j]][k][
                lang_meta["名称与文件名之间的映射关系"][i]["name"]
              ] =
                lang_material["English"][
                  lang_meta["需要翻译的键值"][j]
                ][k];
            }

          }else{


            for (
              let k = 0;
              k <
              lang_material["简体中文"][
                lang_meta["需要翻译的键值"][j]
              ].length;
              k++
            ) {
              if (lang_current[lang_meta["需要翻译的键值"][j]][k] === undefined) {
                lang_current[lang_meta["需要翻译的键值"][j]][k] = new Object();
              }
              lang_current[lang_meta["需要翻译的键值"][j]][k][
                lang_meta["名称与文件名之间的映射关系"][i]["name"]
              ] =
                lang_material["简体中文"][
                  lang_meta["需要翻译的键值"][j]
                ][k];
            }            
          }
        }else{
          // is string
          if(lang_material["English"][
            lang_meta["需要翻译的键值"][j]
          ] !== undefined){
            lang_current[lang_meta["需要翻译的键值"][j]][
              lang_meta["名称与文件名之间的映射关系"][i]["name"]
            ] =
              lang_material["English"][
                lang_meta["需要翻译的键值"][j]
              ];
          }else{
            lang_current[lang_meta["需要翻译的键值"][j]][
              lang_meta["名称与文件名之间的映射关系"][i]["name"]
            ] =
              lang_material["简体中文"][
                lang_meta["需要翻译的键值"][j]
              ];
          }
        }        
      } else{
        // is array

        for (
          let k = 0;
          k <
          lang_material[lang_meta["名称与文件名之间的映射关系"][i]["name"]][
            lang_meta["需要翻译的键值"][j]
          ].length;
          k++
        ) {
          if (lang_current[lang_meta["需要翻译的键值"][j]][k] === undefined) {
            lang_current[lang_meta["需要翻译的键值"][j]][k] = new Object();
          }
          lang_current[lang_meta["需要翻译的键值"][j]][k][
            lang_meta["名称与文件名之间的映射关系"][i]["name"]
          ] =
            lang_material[lang_meta["名称与文件名之间的映射关系"][i]["name"]][
              lang_meta["需要翻译的键值"][j]
            ][k];
        }
      }
    }
  }
  return lang_current;
};

console.log(getFullLangData());
module.exports = getFullLangData();
