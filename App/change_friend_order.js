
function let_friend_up (friend_id){
  if (friend_id !== 0) {
    const friendObj = blog["友人帐"][friend_id];
    blog["友人帐"].splice(friend_id - 1, 0, friendObj);
    blog["友人帐"].splice(friend_id + 1, 1);
    BlogInstance.writeBlogData();
    render_friend_book_list();
  }
}

function let_friend_down(friend_id){
  if (friend_id !== blog["友人帐"].length - 1) {
    const friendObj = blog["友人帐"][friend_id];
    blog["友人帐"].splice(friend_id + 2, 0, friendObj);
    blog["友人帐"].splice(friend_id, 1);
    BlogInstance.writeBlogData();
    render_friend_book_list();
  }
}

module.exports={
  let_friend_up:let_friend_up,
  let_friend_down:let_friend_down
};