
const xssStrict = require("xss");

module.exports = function () {
  document.getElementById("friend_book_list").innerHTML = "";
  for (let i = 0; i < blog["友人帐"].length; i++) {
    document.getElementById("friend_book_list").insertAdjacentHTML("beforeend",`
        <tr>
          <td><input class="form-control" placeholder="${langdata.SITE_NAME[lang_name]}" id="friend_book_list_${i}_name" value="${xssStrict(blog["友人帐"][i]["名称"])}"></input></td>
          <td><input class="form-control" placeholder="${langdata.SITE_LINK[lang_name]}" id="friend_book_list_${i}_link" value="${xssStrict(blog["友人帐"][i]["链接"])}"></input></td>
          <td><input class="form-control" placeholder="${langdata.SITE_INTRODUCTION[lang_name]}" id="friend_book_list_${i}_description" value="${xssStrict(blog["友人帐"][i]["简介"])}"></input></td>
          <td><input class="form-control" placeholder="${langdata.SITE_AVATAR_URL[lang_name]}" id="friend_book_list_${i}_icon" value="${xssStrict(blog["友人帐"][i]["图标"])}"></input></td>
          <td><button class="btn btn-outline-primary friendbtn" onclick="delete_friend(${i})"><i class="fa fa-close" ></i></button></td>
          <td><button class="btn btn-outline-primary friendbtn" onclick="let_friend_up(${i})"><i class="fa fa-arrow-up"></i></button></td>
          <td><button class="btn btn-outline-primary friendbtn" onclick="let_friend_down(${i})"><i class="fa fa-arrow-down"></i></button></td>

        </tr>
        `);
    loadIME(`#friend_book_list_${i}_name`);
    loadIME(`#friend_book_list_${i}_link`);
    loadIME(`#friend_book_list_${i}_description`);
    loadIME(`#friend_book_list_${i}_icon`);
  }
};
