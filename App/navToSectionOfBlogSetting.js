module.exports = function (item) {
  const sectionList = [
    "basic_info_theme_config",
    "domain_related_function",
    "announcement_board",
    "favicon",
    "bgimage",
    "live2dwidget",
    "thirdpartytheme",
    "comment_settings",
    "cdn_settings",
    "advanced",
    "check_data_consistency"
  ];

  for(let i = 0; i < sectionList.length; i++) {
    if (sectionList[i] === item) {
      document.getElementById(item+"_navhash").setAttribute("style", "display:block;");
      document.getElementById(item+"_navitem").setAttribute("class", "nav-link active");
    } else {
      document.getElementById(sectionList[i]+"_navhash").setAttribute("style", "display:none;");
      document.getElementById(sectionList[i]+"_navitem").setAttribute("class", "nav-link");
    }
  }
};