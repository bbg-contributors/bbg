module.exports = function () {
  blog["全局评论设置"]["valine设置"]["是否使用bbg公共评论服务"] = false;
  blog["全局评论设置"]["启用valine评论"] = false;
  blog["全局评论设置"]["valine设置"].leancloud_appid = "";
  blog["全局评论设置"]["valine设置"].leancloud_appkey = "";
  BlogInstance.writeBlogData();
  toast_creator("success","done");
  document.getElementById("container").innerHTML = "";
  render_blog_settings();
  enterBlogSettingInterfaceOf("comment_settings");
};
