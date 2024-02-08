module.exports = function (item) {
  if(item === "preview"){
    document.getElementById("preview_navhash").setAttribute("style", "display:block;");
    document.getElementById("publish_navhash").setAttribute("style", "display:none");
    document.getElementById("preview_navitem").setAttribute("class", "nav-link active");
    document.getElementById("publish_navitem").setAttribute("class", "nav-link");
  } else if(item === "publish"){
    document.getElementById("preview_navhash").setAttribute("style", "display:none;");
    document.getElementById("publish_navhash").setAttribute("style", "display:block;");
    document.getElementById("preview_navitem").setAttribute("class", "nav-link");
    document.getElementById("publish_navitem").setAttribute("class", "nav-link active");
  }
};