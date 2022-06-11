module.exports = function () {

  document.getElementById("friend_book_list").innerHTML = "";
  for (let i = 0; i < blog["友人帐"].length; i++) {
    document.getElementById("friend_book_list").innerHTML += `
        <tr>
          <td><input class="form-control" placeholder="名称" id="friend_book_list_${i}_name" value="${blog['友人帐'][i]['名称']}"></input></td>
          <td><input class="form-control" placeholder="链接" id="friend_book_list_${i}_link" value="${blog['友人帐'][i]['链接']}"></input></td>
          <td><input class="form-control" placeholder="简介" id="friend_book_list_${i}_description" value="${blog['友人帐'][i]['简介']}"></input></td>
          <td><input class="form-control" placeholder="图标url" id="friend_book_list_${i}_icon" value="${blog['友人帐'][i]['图标']}"></input></td>
          <td><button class="fluentbtn" onclick="delete_friend(${i})"><i class="fa fa-close" ></i></button></td>
        </tr>
        `;
  }
}
