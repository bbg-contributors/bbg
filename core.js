
export default class BBG {

    async isValidBlogDirectory (dirHandle) {

        const indexHtmlExists = await bbg.fs.existsFile(dirHandle, "index.html");
        const dataDirExists = await bbg.fs.existsDir(dirHandle, "data");
    
        if (dataDirExists === false || indexHtmlExists === false) {
            return false;
        }
    
        const blogDataDirHandle = await bbg.fs.getDirHandle(dirHandle, "data");
    
        const indexJsonExists = await bbg.fs.existsFile(blogDataDirHandle, "index.json");
        const articleDirExists = await bbg.fs.existsDir(blogDataDirHandle, "articles");
        const pagesDirExists = await bbg.fs.existsDir(blogDataDirHandle, "pages");
    
        if (indexJsonExists === false || articleDirExists === false || pagesDirExists === false) {
            return false;
        }
    
        return true;
    }

    async loadBlogDataFile() {
        const properPermissionAcquired = await bbg.blogRootDirHandle.queryPermission({ mode: "readwrite" });
        if (properPermissionAcquired !== "granted") {
            return;
        }
        bbg.blogDataDirHandle = await bbg.fs.getDirHandle(bbg.blogRootDirHandle, "data");
        bbg.blogDataFileHandle = await bbg.fs.getFileHandle(bbg.blogDataDirHandle, "index.json");
        bbg.blogData = JSON.parse(await bbg.fs.readFile(bbg.blogDataFileHandle));
        bbg.blogArticlesDirHandle = await bbg.fs.getDirHandle(bbg.blogDataDirHandle, "articles");
        bbg.blogPagesDirHandle = await bbg.fs.getDirHandle(bbg.blogDataDirHandle, "pages");
        await localforage.setItem("blogRootDirHandle", bbg.blogRootDirHandle);
    }

    async openBlogDirectory() {
        const dirHandle = await bbg.fs.pickDirectory();
    
        const isValidBlogDirectory = await bbg.isValidBlogDirectory(dirHandle);
        if (isValidBlogDirectory) {
            bbg.blogRootDirHandle = dirHandle;
            await bbg.loadBlogDataFile();
            await bbg.routePage("/manage/index");
            console.info(bbg.blogData);
        } else {
            window.alert(i18n("errmsg_blogdir_incorrect"));
        }
    
    };
    
    getCurrentTimeType() {
        const currentHour = new Date().getHours();
        if (currentHour >= 5 && currentHour < 12) {
            return "morning";
        } else if (currentHour >= 12 && currentHour < 18) {
            return "afternoon";
        } else {
            return "evening";
        }
    }
    
    async saveBlogDataFile() {
        await bbg.fs.writeFile(bbg.blogDataFileHandle, JSON.stringify(bbg.blogData));
    }

    async tryReloadDirHandle() {
        if (await localforage.getItem("blogRootDirHandle") === null) {
            return;
        }
        bbg.blogRootDirHandle = await localforage.getItem("blogRootDirHandle");
        await bbg.loadBlogDataFile();
    }

    constructor() {

    }
}