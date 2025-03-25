
import imports from "./lib.js";
import utils from "./utils.js";
import FileSystem from "./fs.js";
import "./theme.js";

bbg.app.version_str = bbg.app.version_arr.join("");

// settings dialog

bbg.fs = new FileSystem();



// page routing

bbg.hasBlockedRefresh = false;

bbg.blockRefresh = () => {
    if (bbg.hasBlockedRefresh) {
        return;
    }
    window.addEventListener('beforeunload', function (event) {
        event.preventDefault();
        event.returnValue = "";
    });
    bbg.hasBlockedRefresh = true;
}




window.addEventListener("hashchange", async () => {
    await bbg.routePage();
});