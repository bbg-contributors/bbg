const { readFileSync } = require("fs");
const path = require("path");

lang_meta = JSON.parse(
  readFileSync(__dirname + "/i18n/meta.json", "utf8")
);

lang_meta["需要翻译的键值"] = new Array();

const template_zh_CN = Object.keys(JSON.parse(readFileSync(`${__dirname}/i18n/multi_language/zh_CN.json`,"utf-8")));
const template_en_US = Object.keys(JSON.parse(readFileSync(`${__dirname}/i18n/multi_language/en_US.json`,"utf-8")));

for(let i=0;i<template_zh_CN.length;i++){
  lang_meta["需要翻译的键值"].push(template_zh_CN[i])
}

for(let i=0;i<template_en_US.length;i++){
  if(lang_meta["需要翻译的键值"].includes(template_en_US[i])){

  }else{
    lang_meta["需要翻译的键值"].push(template_en_US[i])
  }

}

const getFullLangData = function () {
  lang_current = new Object();
  lang_material = new Object();

  for (let i = 0; i < lang_meta["名称与文件名之间的映射关系"].length; i++) {
    lang_material[lang_meta["名称与文件名之间的映射关系"][i]["name"]] =
      JSON.parse(
        readFileSync(
          __dirname +
            "/i18n/multi_language/" +
            lang_meta["名称与文件名之间的映射关系"][i]["id"] +
            ".json",
          "utf8"
        )
      );
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

module.exports = getFullLangData();
