
export default function () {
    document.querySelector("#app").innerHTML = /* html */ `
                                                <div id="blogmanager_page_app_bar">
                                                </div>
    
                                                <mdui-layout>
                                                    <mdui-layout-item id="blog_manager_nav_rail">
                                                    </mdui-layout-item>
                                                    <mdui-layout-main>
                                                        <mdui-card id="blog_manager_page_card">
                                                            <mdui-card-content>
                                                                <div class="mdui-prose">
                                                                    <h2>${i18n("blogmanager_index_good" + bbg.getCurrentTimeType())}</h2>
                                                                    <p>${i18n("blogmanager_index_intro_seg1")} <a href="javascript:void(0)"><b>${xss(bbg.blogData["博客标题"])}</b></a>${i18n("blogmanager_index_intro_seg2")} <a href="javascript:void(0)"><b>${xss(bbg.blogData["博客描述（副标题）"])}</b></a>${i18n("blogmanager_index_intro_seg3")}</p>
                                                                    <br />
                                                                    <mdui-button icon="edit_note" variant="outlined">${i18n("blogmanager_index_editname_or_desc")}</mdui-button>
                                                                    <mdui-button icon="preview" variant="outlined">${i18n("blogmanager_index_preview_site")}</mdui-button>
                                                                    <hr />
                                                                    <h1>${i18n("blogmanager_index_recent_articles")} &nbsp;&nbsp;<mdui-button icon="edit" variant="text">${i18n("blogmanager_index_add_new_article")}</mdui-button></h1>
                                                                    <ul id="blog_manager_index_recent_articles">

                                                                    </ul>
                                                                </div>
                                                                
                                                            </mdui-card-content>
                                                        </mdui-card>
                                                    </mdui-layout-main>
                                                </mdui-layout>`;
    bbg.renderNavRail("blog_manager_nav_rail");
    bbg.renderTitleBar("blogmanager_page_app_bar", i18n("blogmanager_title_prefix") + i18n("blogmanager_index"));
    let recentArticlesHtml = "";
    for (let i = 0; i < 3 && i < bbg.blogData["文章列表"].length; i++) {
        recentArticlesHtml += `<li><a href="javascript:void(0)">${xss(bbg.blogData["文章列表"][i]["文章标题"])}</a></li>`;
    }
    document.querySelector("#blog_manager_index_recent_articles").innerHTML = recentArticlesHtml;
}