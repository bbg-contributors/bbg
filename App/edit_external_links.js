const xssStrict = require("xss");

module.exports = function () {
  const externalLinksModal = new bootstrap.Modal(
    document.getElementById("edit_external_links_dialog")
  );
  externalLinksModal.toggle();

  document.getElementById("edit_external_links_dialog_title").innerHTML =
    langdata.MANAGE_EXTERNAL_LINKS[lang_name];
  document.getElementById("edit_external_links_dialog_content").innerHTML = "";
  document
    .getElementById("edit_external_links_dialog_content")
    .insertAdjacentHTML(
      "beforeend",
      `
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="mb-3">
          <label class="form-label"><i class="fa fa-link"></i> ${
  langdata.EXTERNAL_LINK_NAME[lang_name]
}</label>
          <input class="form-control" placeholder="${
  langdata.PLEASE_INPUT_EXTERNAL_LINK_NAME[lang_name]
}" id="external_link_name">
        </div>
        <div class="mb-3">
          <label class="form-label"><i class="fa fa-link"></i> ${
  langdata.EXTERNAL_LINK_URL[lang_name]
}</label>
          <input class="form-control" placeholder="${
  langdata.PLEASE_INPUT_EXTERNAL_LINK_URL[lang_name]
}" id="external_link_url">
        </div>
        <div class="mb-3 form-check">
          <input type="checkbox" class="form-check-input" id="external_link_open_in_new_tab">
          <label class="form-check-label" for="external_link_open_in_new_tab">${
  langdata.OPEN_IN_NEW_TAB[lang_name]
}</label>
        </div>
        <button class="btn btn-outline-primary" id="add_external_link_btn"><i class="fa fa-plus"></i> ${
  langdata.ADD_EXTERNAL_LINK[lang_name]
}</button>
        <hr />
        <div id="external_links_table_container">
          <table class="table table-striped table-hover" id="external_links_table">
            <thead>
              <tr>
                <th scope="col">${langdata.EXTERNAL_LINK_NAME[lang_name]}</th>
                <th scope="col">${langdata.EXTERNAL_LINK_URL[lang_name]}</th>
                <th scope="col">${langdata.OPEN_IN_NEW_TAB[lang_name]}</th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
`
    );

  const renderExternalLinksTable = () => {
    const tableBody = document.querySelector("#external_links_table tbody");
    tableBody.innerHTML = ""; // Clear existing rows

    if (blog["菜单中的外部链接"] === undefined) {
      blog["菜单中的外部链接"] = [];
    }

    blog["菜单中的外部链接"].forEach((link, index) => {
      const row = tableBody.insertRow();

      const nameCell = row.insertCell();
      nameCell.innerHTML = xssStrict(link["显示名称"]);

      const urlCell = row.insertCell();
      const linkElement = document.createElement("a");
      linkElement.href = xssStrict(link["url"]);
      linkElement.target = "_blank";
      linkElement.textContent = xssStrict(link["url"]);
      urlCell.appendChild(linkElement);

      const newTabCell = row.insertCell();
      newTabCell.innerHTML = link["是否在新标签页打开"] ? "<i class=\"fa fa-check\"></i>" : "";
      newTabCell.style.textAlign = "center";

      const actionsCell = row.insertCell();
      const deleteButton = document.createElement("button");
      deleteButton.className = "btn btn-outline-danger btn-sm";
      deleteButton.innerHTML = `<i class="fa fa-trash-o"></i> ${langdata.DELETE_EXTERNAL_LINK[lang_name]}`;
      deleteButton.onclick = () => delete_external_link(index);
      actionsCell.appendChild(deleteButton);
      actionsCell.style.textAlign = "center";

      // Add up and down buttons
      const moveCell = row.insertCell();
      const upButton = document.createElement("button");
      upButton.className = "btn btn-outline-secondary btn-sm";
      upButton.innerHTML = "<i class=\"fa fa-arrow-up\"></i>";
      upButton.onclick = () => move_external_link_up(index);

      const downButton = document.createElement("button");
      downButton.className = "btn btn-outline-secondary btn-sm";
      downButton.innerHTML = "<i class=\"fa fa-arrow-down\"></i>";
      downButton.onclick = () => move_external_link_down(index);

      moveCell.appendChild(upButton);
      moveCell.appendChild(downButton);
      moveCell.style.textAlign = "center";
    });
  };

  renderExternalLinksTable();

  document
    .getElementById("add_external_link_btn")
    .addEventListener("click", () => {
      const externalLinkName =
        document.getElementById("external_link_name").value;
      const externalLinkUrl =
        document.getElementById("external_link_url").value;
      const openInNewTab = document.getElementById(
        "external_link_open_in_new_tab"
      ).checked;

      if (externalLinkName === "" || externalLinkUrl === "") {
        toast_creator(
          "warning",
          langdata.PLEASE_INPUT_EXTERNAL_LINK_NAME_AND_URL[lang_name]
        );
        return;
      }

      blog["菜单中的外部链接"].push({
        显示名称: externalLinkName,
        url: externalLinkUrl,
        "是否在新标签页打开": openInNewTab,
      });
      BlogInstance.writeBlogData();
      renderExternalLinksTable();
      document.getElementById("external_link_name").value = "";
      document.getElementById("external_link_url").value = "";
      document.getElementById("external_link_open_in_new_tab").checked = false;
    });

  window.delete_external_link = (i) => {
    blog["菜单中的外部链接"].splice(i, 1);
    BlogInstance.writeBlogData();
    renderExternalLinksTable();
  };

  window.move_external_link_up = (index) => {
    if (index > 0) {
      const temp = blog["菜单中的外部链接"][index];
      blog["菜单中的外部链接"][index] = blog["菜单中的外部链接"][index - 1];
      blog["菜单中的外部链接"][index - 1] = temp;
      BlogInstance.writeBlogData();
      renderExternalLinksTable();
    }
  };

  window.move_external_link_down = (index) => {
    if (index < blog["菜单中的外部链接"].length - 1) {
      const temp = blog["菜单中的外部链接"][index];
      blog["菜单中的外部链接"][index] = blog["菜单中的外部链接"][index + 1];
      blog["菜单中的外部链接"][index + 1] = temp;
      BlogInstance.writeBlogData();
      renderExternalLinksTable();
    }
  };
};
