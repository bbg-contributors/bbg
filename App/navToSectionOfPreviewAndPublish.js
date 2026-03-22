module.exports = function (item) {
  const sections = ["preview", "git_publish", "scp_publish", "manual_publish"];

  sections.forEach((section) => {
    const content = document.getElementById(`${section}_navhash`);
    const navItem = document.getElementById(`${section}_navitem`);

    if (content !== null) {
      content.style.display = section === item ? "block" : "none";
    }

    if (navItem !== null) {
      navItem.setAttribute("class", section === item ? "nav-link active" : "nav-link");
    }
  });
};
