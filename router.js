
export default async function(target = null) {
    // get cntPath
    if (target === null) {
        bbg.cntPath = window.location.hash.replaceAll("#", "");
        if (bbg.cntPath === "") {
            bbg.cntPath = "/start";
            window.history.pushState(null, null, "#/start");
        }
    } else {
        bbg.cntPath = target;
        window.history.pushState(null, null, `#${target}`);
    }

    function removeLastSlashRecursively(str) {
        if (str.endsWith("/")) {
            return removeLastSlashRecursively(str.slice(0, -1));
        } else {
            return str;
        }
    }

    bbg.cntPath = removeLastSlashRecursively(bbg.cntPath);
    if (bbg.cntPath === "/start") {
        bbg.renderStartPage();
    } else if (bbg.cntPath === "/manage/index") {
        if (typeof (bbg.blogData) === "undefined") {
            await bbg.tryReloadDirHandle();
            if (typeof (bbg.blogData) === "undefined") {
                await bbg.routePage("/start");
                return;
            }
        }
        await bbg.renderBlogManagerIndexPage();
    } else if (bbg.cntPath === "/manage/articles") {
        if (typeof (bbg.blogData) === "undefined") {
            await bbg.tryReloadDirHandle();
            if (typeof (bbg.blogData) === "undefined") {
                await bbg.routePage("/start");
                return;
            }
        }
        await bbg.renderBlogManagerArticlesPage();
    } else if (bbg.cntPath === "/manage/pages") {
        if (typeof (bbg.blogData) === "undefined") {
            await bbg.tryReloadDirHandle();
            if (typeof (bbg.blogData) === "undefined") {
                await bbg.routePage("/start");
                return;
            }
        }
        await bbg.renderBlogManagerPagesPage();
    } else if (bbg.cntPath.startsWith("/manage/articles/") || bbg.cntPath.startsWith("/manage/pages/")) {
        if (typeof (bbg.blogData) === "undefined") {
            await bbg.tryReloadDirHandle();
            if (typeof (bbg.blogData) === "undefined") {
                await bbg.routePage("/start");
                return;
            }
        }
        await bbg.renderMarkdownEditorPage();
    } else if (bbg.cntPath === "/manage/settings") {
        if (typeof (bbg.blogData) === "undefined") {
            await bbg.tryReloadDirHandle();
            if (typeof (bbg.blogData) === "undefined") {
                await bbg.routePage("/start");
                return;
            }
        }
        await bbg.renderBlogSettingsPage();
    } else {
        bbg.renderFailureToRoutePage();
        console.error(`Error in bbg.routePage func: Unable to find page for path '${bbg.cntPath}'.`);
    }
}