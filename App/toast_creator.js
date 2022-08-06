module.exports=function(type,content){
  let toast_id = randomString(6);
  let toast_icon = "";

  if(type === "success"){
    toast_icon = "<i class='fa fa-check'></i>";
  }

  document.getElementById("root").innerHTML+=`<div id="${toast_id}" style="position:fixed;top:20px;left:30%;" class="toast align-items-center text-bg-${type} border-0">
  <div class="d-flex">
    <div class="toast-body">
      ${toast_icon} ${content}
    </div>
  </div>
</div>`;

  let toast = new bootstrap.Toast(document.getElementById(toast_id),{delay:2000});

  toast.show();

  console.log(toast_id);
};