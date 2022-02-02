module.exports = function(){
    for(let i=0;i<blog["友人帐"].length;i++){
        blog["友人帐"][i]["名称"] = document.getElementById(`friend_book_list_${i}_name`).value;
        blog["友人帐"][i]["链接"] = document.getElementById(`friend_book_list_${i}_link`).value;
        blog["友人帐"][i]["简介"] = document.getElementById(`friend_book_list_${i}_description`).value;
        blog["友人帐"][i]["图标"] = document.getElementById(`friend_book_list_${i}_icon`).value;
    }
    
    blog["友人帐页面附加信息"] = document.getElementById("friend_book_additional_info").value;
    
    blog["启用内建友人帐页面"] = document.getElementById("enableFriendBookFunction").checked;
    
    blog["友人帐页面允许评论"] = document.getElementById("enableFriendBookComment").checked;
    
    BlogInstance.writeBlogData();
}
