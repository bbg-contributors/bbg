module.exports = function () {
  if (
    window.confirm(
      `
      公共评论服务由 BBG 免费向您提供，确认注册使用之后，您无需再注册 Leancloud 账号即可为你的站点开启评论功能；但是，请注意我们会拥有你的站点的评论数据的完整的访问和控制权限。我们不对评论数据的可用性、可靠性、完整性、安全性作任何形式的保证，并且我们随时可以在不另行通知的情况下终止相关服务。请注意，此评论服务启用了站点隔离，因此不同的域名会被视作不同的站点，从而展示不同的评论。\n
      你是否接受以上内容？如果选择“是”，目前对站点设置所作的更改将会保存生效，然后我们将为您注册 BBG 公共评论服务；如果选择“否”，你的站点将保持原样。
      `,
    )
  ) {
    save_blog_settings();

    blog["全局评论设置"]["启用valine评论"] = true;
    blog["全局评论设置"]["valine设置"].leancloud_appid = "SykuVs4qcWMkl4RUtKEUlmog-gzGzoHsz";
    blog["全局评论设置"]["valine设置"].leancloud_appkey = "0jowkR4ct0lJbWcvocymEkKw";
    blog["全局评论设置"]["valine设置"]["是否使用bbg公共评论服务"] = true;

    BlogInstance.writeBlogData();
    window.alert("注册成功。");
    window.location.reload();
  }
};
