
function render_online_theme_list(){
    document.getElementById("download_online_theme_dialog_content").innerHTML = "";
    // todo
    document.getElementById("download_online_theme_dialog_content").innerHTML += `此功能开发中`;
}

function open_online_theme_dialog(){
    let online_theme_modal = new bootstrap.Modal(document.getElementById('download_online_theme_dialog'));
    online_theme_modal.toggle();
    render_online_theme_list();
}

module.exports = open_online_theme_dialog;