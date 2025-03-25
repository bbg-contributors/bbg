
import i18n from "../i18n.js";


async function openModifyArticleFilenameDialog(articleId) {
    const articleData = bbg.blogData["文章列表"][articleId];
    const dialog = mdui.dialog({
        headline: i18n("blogmanager_articles_modifyfilename_title"),
        body: /* html */ `
                <mdui-text-field label="${i18n("blogmanager_articles_modifyfilename_newfilename")}" value="${articleData["文件名"]}" id="modify_article_filename_newfilename"></mdui-text-field>
                <br /><br />
                <mdui-button id="modify_article_filename_save" icon="check">${i18n("universal_save")}</mdui-button>
                <mdui-button id="modify_article_filename_close" icon="close" variant="outlined">${i18n("universal_close")}</mdui-button>`,
    });

    document.querySelector("#modify_article_filename_save").addEventListener("click", async () => {
        const newFileName = document.querySelector("#modify_article_filename_newfilename").value;
        if (newFileName === articleData["文件名"]) {
            window.alert(i18n("blogmanager_articles_modifyfilename_samefilename"));
            return;
        }
        if (bbg.blogData["文章列表"].find((item) => item["文件名"] === newFileName) !== undefined) {
            window.alert(i18n("blogmanager_articles_modifyfilename_filenameexist"));
            return;
        }
        const oldFileName = articleData["文件名"];
        articleData["文件名"] = newFileName;
        await bbg.fs.renameFile(bbg.blogArticlesDirHandle, oldFileName, newFileName);
        await bbg.saveBlogDataFile();
        dialog.open = false;
    });

    document.querySelector("#modify_article_filename_close").addEventListener("click", () => {
        dialog.open = false;
    });
}

async function openDeleteArticleDialog(articleId) {
    const articleData = bbg.blogData["文章列表"][articleId];
    const dialog = mdui.dialog({
        headline: i18n("blogmanager_articles_delete_title"),
        body: /* html */ `
                <p>${i18n("blogmanager_articles_delete_desc")}</p>
                <br />
                <mdui-button id="delete_article_confirm" icon="delete">${i18n("universal_delete")}</mdui-button>
                <mdui-button id="delete_article_cancel" icon="close" variant="outlined">${i18n("universal_cancel")}</mdui-button>`,
    });

    document.querySelector("#delete_article_confirm").addEventListener("click", async () => {
        const fileName = articleData["文件名"];
        bbg.blogData["文章列表"].splice(articleId, 1);
        await bbg.fs.removeFile(bbg.blogArticlesDirHandle, fileName);
        await bbg.saveBlogDataFile();
        dialog.open = false;
        bbg.routePage();
    }
    );

    document.querySelector("#delete_article_cancel").addEventListener("click", () => {
        dialog.open = false;
    }
    );
}

async function openCreateNewArticleDialog() {
    const dialog = mdui.dialog({
        headline: i18n("blogmanager_articles_newarticle_title"),
        body: /* html */ `
                <mdui-text-field label="${i18n("blogmanager_articles_editmeta_filename")}" id="new_article_filename" value="${generateRandomString(12)}.md"></mdui-text-field>
                <br /><br />
                <mdui-text-field label="${i18n("blogmanager_articles_editmeta_article_title")}" id="new_article_title"></mdui-text-field>
                <br /><br />
                <mdui-text-field label="${i18n("blogmanager_articles_editmeta_article_desc")}" id="new_article_desc" autosize min-rows="2" max-rows="5"></mdui-text-field>
                <br /><br />
                <mdui-text-field label="${i18n("blogmanager_articles_editmeta_article_tags")}" id="new_article_tags"></mdui-text-field>
                <br /><br />
                <div class="mdui-prose">
                <div><span class="timedatepicker">${i18n("blogmanager_articles_editmeta_article_publishdate")}</span><input id="new_article_publish_date_picker" /></div></div>
                <br />
                <mdui-checkbox checked id="blogmanager_articles_newarticle_enable_comment">${i18n("blogmanager_articles_editmeta_enable_comment")}</mdui-checkbox>
                <br />
                <mdui-checkbox id="blogmanager_articles_newarticle_on_top">${i18n("blogmanager_articles_editmeta_on_top")}</mdui-checkbox>
                <br />
                <mdui-checkbox id="blogmanager_articles_newarticle_hide_the_article">${i18n("blogmanager_articles_editmeta_hide_the_article")}</mdui-checkbox>
                <br /><br />
                <mdui-button id="new_article_save" icon="check">${i18n("universal_save")}</mdui-button>
                <mdui-button id="new_article_close" icon="close" variant="outlined">${i18n("universal_close")}</mdui-button>`,
    });

    flatpickr("#new_article_publish_date_picker", {
        enableTime: true,
        dateFormat: "Y-m-d H:i",
        defaultDate: new Date(),
    });

    document.querySelector("#new_article_save").addEventListener("click", async () => {
        const newFileName = document.querySelector("#new_article_filename").value;
        if (bbg.blogData["文章列表"].find((item) => item["文件名"] === newFileName) !== undefined) {
            window.alert(i18n("blogmanager_articles_modifyfilename_filenameexist"));
            return;
        }

        if (!newFileName.endsWith(".md")) {
            window.alert(i18n("blogmanager_articles_newarticle_invalidfiletype"));
            return;
        }

        if (newFileName.trim() === "") {
            window.alert(i18n("blogmanager_articles_newarticle_emptyfilename"));
            return;
        }

        if (document.querySelector("#new_article_title").value.trim() === "") {
            window.alert(i18n("blogmanager_articles_newarticle_emptytitle"));
            return;
        }

        const newArticleData = {
            "文件名": newFileName,
            "文章标题": document.querySelector("#new_article_title").value,
            "摘要": document.querySelector("#new_article_desc").value,
            "标签": document.querySelector("#new_article_tags").value.split(","),
            "创建时间（时间戳）": new Date(document.querySelector("#new_article_publish_date_picker").value).getTime(),
            "修改时间（时间戳）": new Date(document.querySelector("#new_article_publish_date_picker").value).getTime(),
            "启用评论": document.querySelector("#blogmanager_articles_newarticle_enable_comment").checked,
            "是否置顶": document.querySelector("#blogmanager_articles_newarticle_on_top").checked,
            "是否隐藏": document.querySelector("#blogmanager_articles_newarticle_hide_the_article").checked,
        };
        bbg.blogData["文章列表"].unshift(newArticleData);
        await bbg.fs.createFile(bbg.blogArticlesDirHandle, newFileName);
        await bbg.saveBlogDataFile();
        dialog.open = false;
        bbg.routePage();
    });

    document.querySelector("#new_article_close").addEventListener("click", () => {
        dialog.open = false;
    }
    );

}

async function openEncryptArticleDialog(articleId) {
    const articleData = bbg.blogData["文章列表"][articleId];
    const dialog = mdui.dialog({
        headline: i18n("blogmanager_articles_more_encrypt"),
        body: /* html */ `
                <mdui-text-field label="${i18n("blogmanager_articles_encrypt_pass")}" type="password" id="encrypt_article_password"></mdui-text-field>
                <br /><br />
                <mdui-button id="encrypt_article_confirm" icon="lock">${i18n("universal_confirm")}</mdui-button>
                <mdui-button id="encrypt_article_cancel" icon="close" variant="outlined">${i18n("universal_cancel")}</mdui-button>`,
    });

    document.querySelector("#encrypt_article_confirm").addEventListener("click", async () => {
        const password = document.querySelector("#encrypt_article_password").value;
        const original_content = await bbg.fs.readFile(await bbg.fs.getFileHandle(bbg.blogArticlesDirHandle, articleData["文件名"]));
        const encryptedContent = await content_encrypt(original_content, password);
        await bbg.fs.writeFile(await bbg.fs.getFileHandle(await bbg.blogArticlesDirHandle, articleData["文件名"]), encryptedContent);
        bbg.blogData["文章列表"][articleId]["是否加密"] = true;
        await bbg.saveBlogDataFile();
        await bbg.routePage();
        dialog.open = false;
    }
    );

    document.querySelector("#encrypt_article_cancel").addEventListener("click", () => {
        dialog.open = false;
    }
    );
}

async function openModifyEncryptionDialog(articleId) {
    const articleData = bbg.blogData["文章列表"][articleId];
    const dialog = mdui.dialog({
        headline: i18n("blogmanager_articles_modify_envryption"),
        body: /* html */ `
                <p>${i18n("blogmanager_articles_modify_encryption_desc")}</p>
                <mdui-text-field label="${i18n("blogmanager_articles_encrypt_original_pass")}" type="password" id="modify_encrypt_article_original_password"></mdui-text-field>
                <mdui-text-field label="${i18n("blogmanager_articles_encrypt_new_pass")}" type="password" id="modify_encrypt_article_new_password"></mdui-text-field>
                <br /><br />
                <mdui-button id="modify_encrypt_article_confirm" icon="lock">${i18n("universal_confirm")}</mdui-button>
                <mdui-button id="modify_encrypt_article_cancel" icon="close" variant="outlined">${i18n("universal_cancel")}</mdui-button>
                `,
    });

    document.querySelector("#modify_encrypt_article_confirm").addEventListener("click", async () => {
        const original_password = document.querySelector("#modify_encrypt_article_original_password").value;
        const new_password = document.querySelector("#modify_encrypt_article_new_password").value;
        const original_content = await bbg.fs.readFile(await bbg.fs.getFileHandle(bbg.blogArticlesDirHandle, articleData["文件名"]));
        try {
            const decryptedContent = await content_decrypt(original_content, original_password);
            if (new_password.trim() === "") {
                await bbg.fs.writeFile(await bbg.fs.getFileHandle(bbg.blogArticlesDirHandle, articleData["文件名"]), decryptedContent);
                bbg.blogData["文章列表"][articleId]["是否加密"] = false;
                await bbg.saveBlogDataFile();
                bbg.routePage();
            } else {
                const encryptedContent = await content_encrypt(decryptedContent, new_password);
                await bbg.fs.writeFile(await bbg.fs.getFileHandle(bbg.blogArticlesDirHandle, articleData["文件名"]), encryptedContent);
            }
            dialog.open = false;
        } catch (error) {
            window.alert(i18n("blogmanager_articles_modify_envryption_wrongpass"));
        }
    }
    );

    document.querySelector("#modify_encrypt_article_cancel").addEventListener("click", () => {
        dialog.open = false;
    }
    );
}

async function openModifyArticleOrderDialog(articleId) {
    const articleData = bbg.blogData["文章列表"][articleId];
    const dialog = mdui.dialog({
        headline: i18n("blogmanager_articles_more_modify_order"),
        body: /* html */ `
                <div class="mdui-prose">
                    <p>${i18n("blogmanager_articles_reorder_desc_seg1")}</p>
                    <mdui-list style="height:240px;overflow-y:auto" id="reorder_dialog_article_list">

                    </mdui-list>
                    <p>${i18n("blogmanager_articles_reorder_desc_seg2")}</p>
                        <mdui-radio-group id="blogmanager_articles_reorder_position" value="after">
                        <mdui-radio value="before">${i18n("blogmanager_articles_reorder_before")}</mdui-radio>
                        <mdui-radio value="after">${i18n("blogmanager_articles_reorder_after")}</mdui-radio>
                    </mdui-radio-group>
                </div>
                
                <br /><br />
                <mdui-button id="modify_article_order_save" icon="check">${i18n("universal_save")}</mdui-button>
                <mdui-button id="modify_article_order_close" icon="close" variant="outlined">${i18n("universal_close")}</mdui-button>`,
    });

    let articleListHtml = "";
    for (let i = 0; i < bbg.blogData["文章列表"].length; i++) {
        articleListHtml += /* html */ `<mdui-list-item id="reorder_dialog_article_list_${i}">${bbg.blogData["文章列表"][i]["文章标题"]}</mdui-list-item>`;
    }

    document.querySelector("#reorder_dialog_article_list").innerHTML = articleListHtml;

    for (let i = 0; i < bbg.blogData["文章列表"].length; i++) {
        document.querySelector(`#reorder_dialog_article_list_${i}`).addEventListener("click", () => {
            for (let j = 0; j < bbg.blogData["文章列表"].length; j++) {
                document.querySelector(`#reorder_dialog_article_list_${j}`).removeAttribute("active");
            }
            document.querySelector(`#reorder_dialog_article_list_${i}`).setAttribute("active", "");
        });
        if (i === articleId) {
            document.querySelector(`#reorder_dialog_article_list_${i}`).style.display="none";
        }
    }

    document.querySelector("#modify_article_order_save").addEventListener("click", async () => {
        for (let i = 0; i < bbg.blogData["文章列表"].length; i++) {
            if (document.querySelector(`#reorder_dialog_article_list_${i}`).hasAttribute("active")) {
                if (document.querySelector("#blogmanager_articles_reorder_position").value === "before") {
                    // code segment 1
                    bbg.blogData["文章列表"].splice(articleId, 1);
                    if (articleId < i) {
                        i = i - 1;
                    }
                    bbg.blogData["文章列表"].splice(i, 0, articleData);
                } else {
                    // code segment 2
                    bbg.blogData["文章列表"].splice(articleId, 1);
                    if (articleId < i) {
                        i = i - 1;
                    }
                    bbg.blogData["文章列表"].splice(i + 1, 0, articleData);
                }
                break;
            }
        }
        dialog.open = false;
        await bbg.saveBlogDataFile();
        bbg.routePage();
    }
    );

    document.querySelector("#modify_article_order_close").addEventListener("click", () => {
        dialog.open = false;
    });
}

async function openEditArticleMetaDialog(articleId) {
    const articleData = bbg.blogData["文章列表"][articleId];
    const dialog = mdui.dialog({
        headline: i18n("blogmanager_articles_editmeta_title"),
        body: /* html */ `
                <mdui-text-field label="${i18n("blogmanager_articles_editmeta_article_title")}" value="${xss(articleData["文章标题"])}" id="edit_article_meta_title"></mdui-text-field>
                <br /><br />
                <mdui-text-field label="${i18n("blogmanager_articles_editmeta_article_desc")}" value="${xss(articleData["摘要"])}" id="edit_article_meta_desc" autosize min-rows="2" max-rows="5"></mdui-text-field>
                <br /><br />
                <mdui-text-field label="${i18n("blogmanager_articles_editmeta_article_tags")}" value="${xss(articleData["标签"].join(","))}" id="edit_article_meta_tags"></mdui-text-field>
                <br /><br />
                <div class="mdui-prose">
                <div><span class="timedatepicker">${i18n("blogmanager_articles_editmeta_article_publishdate")}</span><input id="edit_meta_dialog_publish_date_picker" /></div></div>
                <br />
                <div><span class="timedatepicker">${i18n("blogmanager_articles_editmeta_article_lastmodifydate")}</span><input id="edit_meta_dialog_lastmodified_date_picker" /></div></div>
                </div>
                <br />
                <mdui-checkbox id="blogmanager_articles_editmeta_enable_comment">${i18n("blogmanager_articles_editmeta_enable_comment")}</mdui-checkbox>
                <br />
                <mdui-checkbox id="blogmanager_articles_editmeta_on_top">${i18n("blogmanager_articles_editmeta_on_top")}</mdui-checkbox>
                <br />
                <mdui-checkbox id="blogmanager_articles_editmeta_hide_the_article">${i18n("blogmanager_articles_editmeta_hide_the_article")}</mdui-checkbox>
                <br /><br />
                <mdui-button id="edit_article_meta_save" icon="check">${i18n("universal_save")}</mdui-button>
                <mdui-button id="edit_article_meta_close" icon="close" variant="outlined">${i18n("universal_close")}</mdui-button>`,
    });

    flatpickr("#edit_meta_dialog_publish_date_picker", {
        enableTime: true,
        dateFormat: "Y-m-d H:i",
        defaultDate: new Date(articleData["创建时间（时间戳）"]),
    });

    flatpickr("#edit_meta_dialog_lastmodified_date_picker", {
        enableTime: true,
        dateFormat: "Y-m-d H:i",
        defaultDate: new Date(articleData["修改时间（时间戳）"])
    });

    document.querySelector("#blogmanager_articles_editmeta_enable_comment").setAttribute("checked", articleData["启用评论"]);
    document.querySelector("#blogmanager_articles_editmeta_on_top").setAttribute("checked", articleData["是否置顶"]);
    document.querySelector("#blogmanager_articles_editmeta_hide_the_article").setAttribute("checked", articleData["是否隐藏"]);

    document.querySelector("#edit_article_meta_save").addEventListener("click", async () => {
        bbg.blogData["文章列表"][articleId]["文章标题"] = document.querySelector("#edit_article_meta_title").value;
        bbg.blogData["文章列表"][articleId]["摘要"] = document.querySelector("#edit_article_meta_desc").value;
        bbg.blogData["文章列表"][articleId]["标签"] = document.querySelector("#edit_article_meta_tags").value.split(",");
        console.log(new Date(document.querySelector("#edit_meta_dialog_publish_date_picker").value).getTime());
        bbg.blogData["文章列表"][articleId]["创建时间（时间戳）"] = new Date(document.querySelector("#edit_meta_dialog_publish_date_picker").value).getTime();
        bbg.blogData["文章列表"][articleId]["修改时间（时间戳）"] = new Date(document.querySelector("#edit_meta_dialog_lastmodified_date_picker").value).getTime();
        bbg.blogData["文章列表"][articleId]["启用评论"] = document.querySelector("#blogmanager_articles_editmeta_enable_comment").checked;
        bbg.blogData["文章列表"][articleId]["是否置顶"] = document.querySelector("#blogmanager_articles_editmeta_on_top").checked;
        bbg.blogData["文章列表"][articleId]["是否隐藏"] = document.querySelector("#blogmanager_articles_editmeta_hide_the_article").checked;
        await bbg.saveBlogDataFile();
        dialog.open = false;
    });

    document.querySelector("#edit_article_meta_close").addEventListener("click", () => {
        dialog.open = false;
    });
}

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
                                                                    <h1>${i18n("blogmanager_articles_title")} <mdui-button icon="add" variant="outlined" style="margin-left:20px" id="blog_manager_articles_add_new_article_btn">${i18n("blogmanager_articles_add_new_article")}</mdui-button></h1>
                                                                    <p>${i18n("blogmanager_articles_desc")}</p>
                                                                    <br />
                                                                    <div id="blog_manager_articles_list">

                                                                    </div>
                                                                </div>
                                                                
                                                            </mdui-card-content>
                                                        </mdui-card>
                                                    </mdui-layout-main>
                                                </mdui-layout>`;
    bbg.renderNavRail("blog_manager_nav_rail");
    bbg.renderTitleBar("blogmanager_page_app_bar", i18n("blogmanager_title_prefix") + i18n("blogmanager_articles_title"));
    let articlesHtml = "";
    for (let i = 0; i < bbg.blogData["文章列表"].length; i++) {
        console.log(bbg.blogData["文章列表"][i]);
        articlesHtml += /* html */ `
                        <mdui-card id="blog_manager_article_card_${i}" class="blog_manager_articles_article_card" variant="elevated">
                            <mdui-card-content>
                                <h1><a href="javascript:void(0)">${xss(bbg.blogData["文章列表"][i]["文章标题"])}</a> <mdui-chip icon="calendar_month">${new Date(bbg.blogData["文章列表"][i]["创建时间（时间戳）"]).toLocaleString()}</mdui-chip> <mdui-chip icon="history">${new Date(bbg.blogData["文章列表"][i]["修改时间（时间戳）"]).toLocaleString()}</mdui-chip></h1>
                                <p>${bbg.blogData["文章列表"][i]["摘要"].trim() === "" ? i18n("blogmanager_articles_emptydesc") : xss(bbg.blogData["文章列表"][i]["摘要"])}</p>
                                <mdui-button icon="edit" id="article_${i}_card_edit">${i18n("blogmanager_articles_preview_edit")}</mdui-button>
                                <mdui-button icon="edit_note" id="article_${i}_card_edit_meta" variant="outlined">${i18n("blogmanager_articles_edit_meta")}</mdui-button>
                                <mdui-dropdown>
                                    <mdui-button slot="trigger" icon="more_horiz" variant="outlined">${i18n("blogmanager_articles_more")}</mdui-button>
                                    <mdui-menu>
                                        <mdui-menu-item icon="insert_drive_file" id="article_${i}_card_modify_filename">${i18n("blogmanager_articles_more_modify_filename")}</mdui-menu-item>
                                        <mdui-menu-item icon="delete" id="article_${i}_card_delete">${i18n("blogmanager_articles_more_delete")}</mdui-menu-item>
                                        <mdui-menu-item icon="lock" id="article_${i}_card_encrypt_article">${typeof (bbg.blogData["文章列表"][i]["是否加密"]) === "undefined" || bbg.blogData["文章列表"][i]["是否加密"] === false ? i18n("blogmanager_articles_more_encrypt") : i18n("blogmanager_articles_modify_envryption")}</mdui-menu-item>
                                        <mdui-menu-item icon="reorder" id="article_${i}_card_modify_reorder">${i18n("blogmanager_articles_more_modify_order")}</mdui-menu-item>
                                </mdui-dropdown>
                            </mdui-card-content>
                        </mdui-card>`;

    }
    document.querySelector("#blog_manager_articles_list").innerHTML = articlesHtml;

    document.querySelector("#blog_manager_articles_add_new_article_btn").addEventListener("click", async () => {
        await bbg.openCreateNewArticleDialog();
    });



    for (let i = 0; i < bbg.blogData["文章列表"].length; i++) {
        document.querySelector(`#article_${i}_card_edit`).addEventListener("click", async () => {
            await bbg.routePage(`/manage/articles/${bbg.blogData["文章列表"][i]["文件名"]}`);
        });

        document.querySelector(`#article_${i}_card_edit_meta`).addEventListener("click", async () => {
            bbg.openEditArticleMetaDialog(i);
        });

        document.querySelector(`#article_${i}_card_modify_filename`).addEventListener("click", async () => {
            bbg.openModifyArticleFilenameDialog(i);
        });

        document.querySelector(`#article_${i}_card_delete`).addEventListener("click", async () => {
            bbg.openDeleteArticleDialog(i);
        });

        document.querySelector(`#article_${i}_card_encrypt_article`).addEventListener("click", async () => {
            if (typeof (bbg.blogData["文章列表"][i]["是否加密"]) === "undefined" || bbg.blogData["文章列表"][i]["是否加密"] === false) {
                bbg.openEncryptArticleDialog(i);
            } else {
                bbg.openModifyEncryptionDialog(i);
            }
        });

        document.querySelector(`#article_${i}_card_modify_reorder`).addEventListener("click", async () => {
            bbg.openModifyArticleOrderDialog(i);
        });

    }
}