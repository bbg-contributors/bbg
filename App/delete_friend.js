module.exports = function (i) {

  save_friend_book();

  render_friend_book_list();

  blog["友人帐"].splice(i, 1);

  render_friend_book_list();

  save_friend_book();
}
