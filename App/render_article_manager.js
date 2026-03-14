const AppPath = require("@electron/remote").app.getPath("userData");
const storage = require("electron-json-storage");
const xssStrict = require("xss");
storage.setDataPath(AppPath);

module.exports = function () {
  const articleTagCloudDialog = new bootstrap.Modal(
    document.getElementById("article_tag_cloud_dialog"),
  );

  const perPageSetting = parseInt(blog["文章列表中每页的文章数为"], 10);
  const listState = {
    page: 1,
    tags: [],
    createdFrom: "",
    createdTo: "",
    perPage: Number.isFinite(perPageSetting) && perPageSetting > 0 ? perPageSetting : 10,
  };

  const tagSelectorState = {
    keyword: "",
    open: false,
  };

  const tagCloudLayoutSetting = storage.getSync("article_tag_cloud_layout_v1");
  const tagCloudState = {
    orderly: tagCloudLayoutSetting !== undefined && tagCloudLayoutSetting.orderly === true,
    randomColor: tagCloudLayoutSetting === undefined || tagCloudLayoutSetting.randomColor === true,
  };

  function escapeForAttribute(value) {
    return xssStrict(String(value)).replaceAll("\"", "&quot;");
  }

  function saveTagCloudAppSettings() {
    storage.set("article_tag_cloud_layout_v1", {
      orderly: tagCloudState.orderly,
      randomColor: tagCloudState.randomColor,
    }, (error) => {
      if (error) {
        console.error(error);
      }
    });
  }

  function getTagCloudColor(tagName, tagIndex) {
    if (!tagCloudState.randomColor) {
      return "#185a9d";
    }

    let hash = 0;
    for (let i = 0; i < tagName.length; i++) {
      hash = ((hash << 5) - hash) + tagName.charCodeAt(i);
      hash |= 0;
    }

    const hue = Math.abs(hash + tagIndex * 17) % 360;
    return `hsl(${hue}, 58%, 42%)`;
  }

  function getArticleTags(articleIndex) {
    if (!Array.isArray(blog["文章列表"][articleIndex]["标签"])) {
      return [];
    }
    return blog["文章列表"][articleIndex]["标签"].filter(tag => tag !== "");
  }

  function getTagStats() {
    const tagStats = new Map();

    for (let i = 0; i < blog["文章列表"].length; i++) {
      const uniqueTags = [...new Set(getArticleTags(i))];
      for (const tag of uniqueTags) {
        if (!tagStats.has(tag)) {
          tagStats.set(tag, 0);
        }
        tagStats.set(tag, tagStats.get(tag) + 1);
      }
    }

    return Array.from(tagStats.entries())
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag, "zh-Hans-CN"));
  }

  function getDateStartTimestamp(dateString) {
    if (dateString === "") {
      return null;
    }
    return new Date(`${dateString}T00:00:00`).getTime();
  }

  function getDateEndTimestamp(dateString) {
    if (dateString === "") {
      return null;
    }
    return new Date(`${dateString}T23:59:59.999`).getTime();
  }

  function articleMatchesFilters(articleIndex) {
    const article = blog["文章列表"][articleIndex];
    const createdTimestamp = article["创建时间（时间戳）"];
    const articleTags = getArticleTags(articleIndex);
    const createdFrom = getDateStartTimestamp(listState.createdFrom);
    const createdTo = getDateEndTimestamp(listState.createdTo);

    if (createdFrom !== null && createdTimestamp < createdFrom) {
      return false;
    }

    if (createdTo !== null && createdTimestamp > createdTo) {
      return false;
    }

    if (listState.tags.length !== 0 && !listState.tags.some(tag => articleTags.includes(tag))) {
      return false;
    }

    return true;
  }

  function getFilteredArticleIndexes() {
    const pinnedArticles = [];
    const normalArticles = [];

    for (let i = 0; i < blog["文章列表"].length; i++) {
      if (!articleMatchesFilters(i)) {
        continue;
      }

      if (blog["文章列表"][i]["是否置顶"]) {
        pinnedArticles.push(i);
      } else {
        normalArticles.push(i);
      }
    }

    return [...pinnedArticles, ...normalArticles];
  }

  function bindArticleActions(articleIndex) {
    document.querySelector(`#article_item_${articleIndex}_edit_article_btn`).onclick = function () {
      edit_article(xssStrict(blog["文章列表"][articleIndex]["文件名"]), articleIndex);
    };

    document.querySelector(`#article_item_${articleIndex}_edit_article_meta_btn`).onclick = function () {
      edit_article_meta(articleIndex);
    };

    document.querySelector(`#article_item_${articleIndex}_delete_article_btn`).onclick = function () {
      delete_article(articleIndex);
    };

    document.querySelector(`#article_item_${articleIndex}_let_article_up_btn`).onclick = function () {
      let_article_up(articleIndex);
    };

    document.querySelector(`#article_item_${articleIndex}_let_article_down_btn`).onclick = function () {
      let_article_down(articleIndex);
    };

    if (blog["文章列表"][articleIndex]["是否加密"]) {
      document.querySelector(`#encryption_related_func_${articleIndex}`).insertAdjacentHTML("beforeend", `
        &nbsp;
        <button class="warning_btn" onclick="ui_decrypt_article(${articleIndex})"><i class="fa fa-unlock"></i>&nbsp;&nbsp;${langdata.DECRYPT_ARTICLE[lang_name]}</button>
      `);
    } else {
      document.querySelector(`#encryption_related_func_${articleIndex}`).insertAdjacentHTML("beforeend", `
        &nbsp;
        <button class="success_btn" onclick="ui_encrypt_article(${articleIndex})"><i class="fa fa-lock"></i>&nbsp;&nbsp;${langdata.ENCRYPT_ARTICLE[lang_name]}</button>
      `);
    }
  }

  function renderArticleCard(articleIndex) {
    const article = blog["文章列表"][articleIndex];
    const articleList = document.getElementById("article_manager_article_list");

    articleList.insertAdjacentHTML("beforeend", `
      <div class="article-item" id="article-item-${articleIndex}">
        ${article["是否置顶"] ? `<div class="article-item-sub"><i class="fa fa-thumb-tack"></i> ${langdata.ARTICLE_IS_TOP[lang_name]}</div>` : ""}
        <h2>${xssStrict(article["文章标题"])}</h2>
        <div class="article-item-sub" id="article-item-sub-${articleIndex}">
          <i class="fa fa-calendar"></i> ${langdata.ARTICLE_CREATEDAT[lang_name]} <span style="border-bottom: 1px dashed #676161;">${convertTimeStampToLocalTime(article["创建时间（时间戳）"])}</span>，${langdata.LASTMODIFIEDAT[lang_name]} <span style="border-bottom: 1px dashed #676161;">${convertTimeStampToLocalTime(article["修改时间（时间戳）"])}</span><br />
        </div>
        <br />
        <p>${xssStrict(article["摘要"])}</p>
        <button class="primary_btn" id="article_item_${articleIndex}_edit_article_btn"><i class="fa fa-edit"></i>&nbsp;&nbsp;${langdata.EDIT_AND_PREVIEW_ARTICLE_CONTENT[lang_name]}</button>
        &nbsp;
        <button class="primary_btn" id="article_item_${articleIndex}_edit_article_meta_btn"><i class="fa fa-info-circle"></i>&nbsp;&nbsp;${langdata.EDIT_ARTICLE_META[lang_name]}</button>
        &nbsp;
        <button class="danger_btn" id="article_item_${articleIndex}_delete_article_btn"><i class="fa fa-trash-o"></i>&nbsp;&nbsp;${langdata.DELETE_ARTICLE[lang_name]}</button>
        <span id="encryption_related_func_${articleIndex}"></span>
        <br /><br />
        <button class="secondary_btn" id="article_item_${articleIndex}_let_article_up_btn"><i class="fa fa-arrow-up"></i>&nbsp;&nbsp;${langdata.LET_ARTICLE_GO_UP[lang_name]}</button>
        &nbsp;
        <button class="secondary_btn" id="article_item_${articleIndex}_let_article_down_btn"><i class="fa fa-arrow-down"></i>&nbsp;&nbsp;${langdata.LET_ARTICLE_GO_DOWN[lang_name]}</button>
      </div>
    `);

    if (getArticleTags(articleIndex).length !== 0) {
      document.querySelector(`#article-item-sub-${articleIndex}`).insertAdjacentHTML("beforeend", `
        <i class="fa fa-tags"></i> ${langdata.TAGS[lang_name]}
      `);

      for (const tagName of getArticleTags(articleIndex)) {
        document.querySelector(`#article-item-sub-${articleIndex}`).insertAdjacentHTML("beforeend", `
          <button class="btn btn-light btn-sm article-inline-tag-btn" data-tag-name="${escapeForAttribute(tagName)}">${xssStrict(tagName)}</button>
        `);
      }
    }

    bindArticleActions(articleIndex);
  }

  function closeTagSelector() {
    tagSelectorState.open = false;
    document.getElementById("article_tag_selector_popover").style.display = "none";
    document.getElementById("open_article_tag_selector_btn").setAttribute("aria-expanded", "false");
  }

  function openTagSelector() {
    tagSelectorState.open = true;
    document.getElementById("article_tag_selector_popover").style.display = "block";
    document.getElementById("open_article_tag_selector_btn").setAttribute("aria-expanded", "true");
    document.getElementById("article_tag_filter_search").focus();
  }

  function renderTagSelectorPopover() {
    const tagStats = getTagStats();
    const tagSelectorList = document.getElementById("article_tag_selector_list");
    const normalizedKeyword = tagSelectorState.keyword.trim().toLowerCase();
    const visibleTags = normalizedKeyword === ""
      ? tagStats
      : tagStats.filter(item => item.tag.toLowerCase().includes(normalizedKeyword));

    if (visibleTags.length === 0) {
      tagSelectorList.innerHTML = `<div class="article-tag-selector-empty">${langdata.TAG_SELECTOR_EMPTY[lang_name]}</div>`;
      return;
    }

    tagSelectorList.innerHTML = visibleTags.map(item => `
      <label class="article-tag-selector-option">
        <input
          type="checkbox"
          class="form-check-input article-tag-selector-checkbox"
          value="${escapeForAttribute(item.tag)}"
          ${listState.tags.includes(item.tag) ? "checked" : ""}
        >
        <span class="article-tag-selector-name">#${xssStrict(item.tag)}</span>
        <span class="article-tag-selector-count">${item.count}</span>
      </label>
    `).join("");

    for (const checkbox of tagSelectorList.querySelectorAll(".article-tag-selector-checkbox")) {
      checkbox.onchange = function () {
        if (this.checked) {
          if (!listState.tags.includes(this.value)) {
            listState.tags.push(this.value);
          }
        } else {
          listState.tags = listState.tags.filter(tag => tag !== this.value);
        }
        listState.page = 1;
        syncFilterForm();
        renderArticleList();
        if (tagSelectorState.open) {
          openTagSelector();
          renderTagSelectorPopover();
        }
      };
    }
  }

  function syncFilterForm() {
    document.getElementById("article_filter_created_from").value = listState.createdFrom;
    document.getElementById("article_filter_created_to").value = listState.createdTo;

    const activeTag = document.getElementById("article_filter_active_tag");
    if (listState.tags.length === 0) {
      activeTag.innerHTML = `<span class="article-manager-filter-empty">${langdata.ARTICLE_FILTER_TAG_EMPTY[lang_name]}</span>`;
    } else {
      activeTag.innerHTML = listState.tags.map(tag => `
        <span class="article-manager-active-tag">
          #${xssStrict(tag)}
          <button class="article-manager-tag-remove-btn" data-tag-name="${escapeForAttribute(tag)}" type="button">&times;</button>
        </span>
      `).join("");

      for (const removeBtn of activeTag.querySelectorAll(".article-manager-tag-remove-btn")) {
        removeBtn.onclick = function () {
          listState.tags = listState.tags.filter(tag => tag !== this.getAttribute("data-tag-name"));
          listState.page = 1;
          syncFilterForm();
          renderArticleList();
          renderTagSelectorPopover();
        };
      }
    }

    const triggerText = listState.tags.length === 0
      ? langdata.SELECT_TAG_FILTER[lang_name]
      : langdata.SELECTED_TAG_COUNT[lang_name].replace("%s", listState.tags.length);
    document.getElementById("open_article_tag_selector_btn_text").textContent = triggerText;
  }

  function openArticleTagCloudDialog() {
    const stats = getTagStats();
    const dialogTitle = document.getElementById("article_tag_cloud_dialog_title");
    const dialogContent = document.getElementById("article_tag_cloud_dialog_content");
    const closeButton = document.getElementById("close_article_tag_cloud_btn");

    dialogTitle.innerHTML = `<i class="fa fa-tags"></i> ${langdata.TAG_CLOUD[lang_name]}`;
    closeButton.textContent = langdata.OK[lang_name];

    if (stats.length === 0) {
      dialogContent.innerHTML = `<div class="tag-cloud-empty">${langdata.TAG_CLOUD_EMPTY[lang_name]}</div>`;
      articleTagCloudDialog.show();
      return;
    }

    const counts = stats.map(item => item.count);
    const minCount = Math.min(...counts);
    const maxCount = Math.max(...counts);
    let tagCloudHtml = `
      <p class="tag-cloud-summary">${langdata.TAG_CLOUD_DESCRIPTION[lang_name]}</p>
      <div class="tag-cloud-options">
        <label class="form-check form-switch tag-cloud-order-toggle">
          <input class="form-check-input" type="checkbox" id="tag_cloud_order_toggle" ${tagCloudState.orderly ? "checked" : ""}>
          <span class="form-check-label">${langdata.TAG_CLOUD_ORDERLY_LAYOUT[lang_name]}</span>
        </label>
        <label class="form-check form-switch tag-cloud-order-toggle">
          <input class="form-check-input" type="checkbox" id="tag_cloud_random_color_toggle" ${tagCloudState.randomColor ? "checked" : ""}>
          <span class="form-check-label">${langdata.TAG_CLOUD_RANDOM_COLOR[lang_name]}</span>
        </label>
      </div>
      <div class="tag-cloud-list ${tagCloudState.orderly ? "tag-cloud-list-orderly" : ""}" id="tag_cloud_list">
    `;

    for (let index = 0; index < stats.length; index++) {
      const item = stats[index];
      const sizeRatio = maxCount === minCount ? 0.5 : (item.count - minCount) / (maxCount - minCount);
      const fontSize = (0.95 + sizeRatio * 1.4).toFixed(2);
      const rotateDeg = ((index % 5) - 2) * 5;
      const offsetY = ((index % 4) - 1.5) * 6;
      const offsetX = ((index % 6) - 2.5) * 2.5;
      const tagColor = getTagCloudColor(item.tag, index);

      tagCloudHtml += `
        <button
          type="button"
          class="tag-cloud-tag"
          data-tag-name="${escapeForAttribute(item.tag)}"
          style="font-size:${fontSize}rem;color:${tagColor};transform:translate(${offsetX}px, ${offsetY}px) rotate(${rotateDeg}deg)"
        >
          #${xssStrict(item.tag)}<span class="tag-cloud-tag-count">${item.count} ${langdata.TAG_ARTICLE_COUNT_SUFFIX[lang_name]}</span>
        </button>
      `;
    }

    tagCloudHtml += "</div>";
    dialogContent.innerHTML = tagCloudHtml;

    document.getElementById("tag_cloud_order_toggle").onchange = function () {
      tagCloudState.orderly = this.checked;
      saveTagCloudAppSettings();
      document.getElementById("tag_cloud_list").classList.toggle("tag-cloud-list-orderly", tagCloudState.orderly);
    };

    document.getElementById("tag_cloud_random_color_toggle").onchange = function () {
      tagCloudState.randomColor = this.checked;
      saveTagCloudAppSettings();
      openArticleTagCloudDialog();
    };

    for (const tagButton of dialogContent.querySelectorAll(".tag-cloud-tag")) {
      tagButton.onclick = function () {
        listState.tags = [this.getAttribute("data-tag-name")];
        listState.page = 1;
        articleTagCloudDialog.hide();
        closeTagSelector();
        syncFilterForm();
        renderTagSelectorPopover();
        renderArticleList();
      };
    }

    articleTagCloudDialog.show();
  }

  function renderArticleList() {
    const filteredArticleIndexes = getFilteredArticleIndexes();
    const totalPages = Math.max(1, Math.ceil(filteredArticleIndexes.length / listState.perPage));
    const articleList = document.getElementById("article_manager_article_list");
    const resultSummary = document.getElementById("article_manager_result_summary");
    const pagination = document.getElementById("article_manager_pagination");

    if (listState.page > totalPages) {
      listState.page = totalPages;
    }

    syncFilterForm();
    articleList.innerHTML = "";

    resultSummary.innerHTML = `
      ${langdata.ARTICLE_FILTER_RESULT_SUMMARY[lang_name]}
      <span class="article-manager-summary-count">${filteredArticleIndexes.length}</span>
    `;

    if (filteredArticleIndexes.length === 0) {
      articleList.innerHTML = `<div class="alert alert-secondary">${langdata.NO_ARTICLES_MATCH_FILTER[lang_name]}</div>`;
    } else {
      const pageStart = (listState.page - 1) * listState.perPage;
      const pageItems = filteredArticleIndexes.slice(pageStart, pageStart + listState.perPage);

      for (const articleIndex of pageItems) {
        renderArticleCard(articleIndex);
      }

      for (const tagButton of articleList.querySelectorAll(".article-inline-tag-btn")) {
        tagButton.onclick = function () {
          listState.tags = [this.getAttribute("data-tag-name")];
          listState.page = 1;
          syncFilterForm();
          renderTagSelectorPopover();
          renderArticleList();
        };
      }
    }

    pagination.innerHTML = `
      <button class="secondary_btn" id="article_manager_prev_page_btn" ${listState.page <= 1 ? "disabled" : ""}>
        <i class="fa fa-angle-left"></i>&nbsp;&nbsp;${langdata.PREVIOUS_PAGE[lang_name]}
      </button>
      <span class="article-manager-page-status">${langdata.ARTICLE_MANAGER_PAGE_STATUS[lang_name].replace("%s", listState.page).replace("%s", totalPages)}</span>
      <button class="secondary_btn" id="article_manager_next_page_btn" ${listState.page >= totalPages ? "disabled" : ""}>
        ${langdata.NEXT_PAGE[lang_name]}&nbsp;&nbsp;<i class="fa fa-angle-right"></i>
      </button>
    `;

    document.getElementById("article_manager_prev_page_btn").onclick = function () {
      if (listState.page <= 1) {
        return;
      }
      listState.page -= 1;
      renderArticleList();
    };

    document.getElementById("article_manager_next_page_btn").onclick = function () {
      if (listState.page >= totalPages) {
        return;
      }
      listState.page += 1;
      renderArticleList();
    };
  }

  document.getElementById("container").insertAdjacentHTML("beforeend", getUiFileContent(
    "article_manager_title_ui.html",
  ));

  document.getElementById("container").insertAdjacentHTML("beforeend", `
    <div class="fluentinterface article-manager-filter-panel">
      <div class="article-manager-filter-row">
        <div class="article-manager-filter-item article-manager-filter-item-date">
          <label class="form-label">${langdata.ARTICLE_FILTER_DATE_FROM[lang_name]}</label>
          <input type="date" class="form-control" id="article_filter_created_from">
        </div>
        <div class="article-manager-filter-item article-manager-filter-item-date">
          <label class="form-label">${langdata.ARTICLE_FILTER_DATE_TO[lang_name]}</label>
          <input type="date" class="form-control" id="article_filter_created_to">
        </div>
        <div class="article-manager-filter-item article-manager-filter-item-tag">
          <label class="form-label">${langdata.ARTICLE_FILTER_TAG[lang_name]}</label>
          <div class="article-tag-selector-wrap" id="article_tag_selector_wrap">
            <button class="secondary_btn article-tag-selector-trigger" id="open_article_tag_selector_btn" type="button" aria-expanded="false">
              <i class="fa fa-filter"></i>&nbsp;&nbsp;<span id="open_article_tag_selector_btn_text"></span>
            </button>
            <div class="article-tag-selector-popover" id="article_tag_selector_popover" style="display:none;">
              <input type="text" class="form-control" id="article_tag_filter_search" placeholder="${langdata.SEARCH_TAGS[lang_name]}">
              <div class="article-tag-selector-toolbar">
                <button class="btn btn-sm btn-outline-secondary" id="select_all_visible_tags_btn" type="button">${langdata.SELECT_ALL[lang_name]}</button>
                <button class="btn btn-sm btn-outline-secondary" id="clear_all_tags_btn" type="button">${langdata.CLEAR[lang_name]}</button>
              </div>
              <div class="article-tag-selector-list" id="article_tag_selector_list"></div>
            </div>
          </div>
        </div>
        <div class="article-manager-filter-item article-manager-filter-item-selected">
          <label class="form-label">${langdata.SELECTED_TAGS[lang_name]}</label>
          <div id="article_filter_active_tag" class="article-manager-selected-tags"></div>
        </div>
        <div class="article-manager-filter-item article-manager-filter-item-actions">
          <button class="secondary_btn" id="reset_article_filters_btn" type="button"><i class="fa fa-undo"></i>&nbsp;&nbsp;${langdata.RESET_FILTERS[lang_name]}</button>
          <button class="secondary_btn" id="open_article_tag_cloud_btn_panel" type="button"><i class="fa fa-tags"></i>&nbsp;&nbsp;${langdata.TAG_CLOUD[lang_name]}</button>
        </div>
        <div class="article-manager-filter-item article-manager-filter-item-summary">
          <span id="article_manager_result_summary" class="article-manager-result-summary"></span>
        </div>
      </div>
    </div>
    <div id="article_manager_article_list"></div>
    <div id="article_manager_pagination" class="article-manager-pagination"></div>
  `);

  document.getElementById("edit_article_meta_dialog_footer").innerHTML
    = getUiFileContent("edit_article_meta_dialog_footer_ui.html");

  document.getElementById("open_article_tag_cloud_btn").onclick = openArticleTagCloudDialog;
  document.getElementById("open_article_tag_cloud_btn_panel").onclick = openArticleTagCloudDialog;

  document.getElementById("article_filter_created_from").onchange = function () {
    listState.createdFrom = this.value;
    listState.page = 1;
    renderArticleList();
  };

  document.getElementById("article_filter_created_to").onchange = function () {
    listState.createdTo = this.value;
    listState.page = 1;
    renderArticleList();
  };

  document.getElementById("open_article_tag_selector_btn").onclick = function (event) {
    event.stopPropagation();
    if (tagSelectorState.open) {
      closeTagSelector();
    } else {
      openTagSelector();
      renderTagSelectorPopover();
    }
  };

  document.getElementById("article_tag_filter_search").oninput = function () {
    tagSelectorState.keyword = this.value;
    renderTagSelectorPopover();
  };

  document.getElementById("select_all_visible_tags_btn").onclick = function () {
    const tagStats = getTagStats();
    const normalizedKeyword = tagSelectorState.keyword.trim().toLowerCase();
    const visibleTags = normalizedKeyword === ""
      ? tagStats
      : tagStats.filter(item => item.tag.toLowerCase().includes(normalizedKeyword));
    const visibleNames = visibleTags.map(item => item.tag);

    for (const tagName of visibleNames) {
      if (!listState.tags.includes(tagName)) {
        listState.tags.push(tagName);
      }
    }

    listState.page = 1;
    syncFilterForm();
    renderTagSelectorPopover();
    renderArticleList();
  };

  document.getElementById("clear_all_tags_btn").onclick = function () {
    listState.tags = [];
    listState.page = 1;
    syncFilterForm();
    renderTagSelectorPopover();
    renderArticleList();
  };

  document.getElementById("reset_article_filters_btn").onclick = function () {
    listState.tags = [];
    listState.createdFrom = "";
    listState.createdTo = "";
    listState.page = 1;
    tagSelectorState.keyword = "";
    document.getElementById("article_tag_filter_search").value = "";
    syncFilterForm();
    renderTagSelectorPopover();
    renderArticleList();
  };

  document.addEventListener("click", function (event) {
    const selectorWrap = document.getElementById("article_tag_selector_wrap");
    if (!selectorWrap.contains(event.target)) {
      closeTagSelector();
    }
  });

  renderTagSelectorPopover();
  renderArticleList();
  document.getElementById("nav_to_article_manager").classList.add("active");
};
