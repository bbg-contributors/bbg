module.exports = function () {
  document.getElementById("friend_book_list").innerHTML = "";
  for (let i = 0; i < blog["友人帐"].length; i++) {
    document.getElementById("friend_book_list").innerHTML += `
        <tr>
          <td><input class="form-control" placeholder="${langdata.SITE_NAME[lang_name]}" id="friend_book_list_${i}_name" value="${blog["友人帐"][i]["名称"]}"></input></td>
          <td><input class="form-control" placeholder="${langdata.SITE_LINK[lang_name]}" id="friend_book_list_${i}_link" value="${blog["友人帐"][i]["链接"]}"></input></td>
          <td><input class="form-control" placeholder="${langdata.SITE_INTRODUCTION[lang_name]}" id="friend_book_list_${i}_description" value="${blog["友人帐"][i]["简介"]}"></input></td>
          <td><input class="form-control" placeholder="${langdata.SITE_AVATAR_URL[lang_name]}" id="friend_book_list_${i}_icon" value="${blog["友人帐"][i]["图标"]}"></input></td>
          <td><button class="btn btn-outline-primary friendbtn" onclick="delete_friend(${i})"><i class="fa fa-close" ></i></button></td>
          <td><button class="btn btn-outline-primary friendbtn" onclick="let_friend_up(${i})"><i class="fa fa-arrow-up"></i></button></td>
          <td><button class="btn btn-outline-primary friendbtn" onclick="let_friend_down(${i})"><i class="fa fa-arrow-down"></i></button></td>

        </tr>
        `;
  }
};
