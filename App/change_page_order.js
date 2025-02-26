function let_page_up (page_id) {
  if (page_id !== 0) {
    const pageObj = blog["页面列表"][page_id];
    blog["页面列表"].splice(page_id - 1, 0, pageObj);
    blog["页面列表"].splice(page_id + 1, 1);
    BlogInstance.writeBlogData();
    toast_creator("success","done");
    document.getElementById("container").innerHTML = "";
    // renderPageManager(); // This line caused the error
    render_page_manager();//fixed
  }
}

function let_page_down (page_id) {
  if (page_id !== blog["页面列表"].length - 1) {
    const pageObj = blog["页面列表"][page_id];
    blog["页面列表"].splice(page_id + 2, 0, pageObj);
    blog["页面列表"].splice(page_id, 1);
    BlogInstance.writeBlogData();
    toast_creator("success","done");
    document.getElementById("container").innerHTML = "";
    // renderPageManager(); // This line caused the error
    render_page_manager();//fixed
  }
}

module.exports = {
  let_page_up,
  let_page_down,
};
