module.exports = function(iconName, type = "svg") {
  const icon_path = "./icons/" + iconName + "." + type;
  return `<img src="${icon_path}" alt="${iconName} icon" style="height: 1em">`;

};