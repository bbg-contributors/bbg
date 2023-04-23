module.exports=function(type,content){
  let toast_id = randomString(6);
  let toast_icon = "";

  if(type === "success"){
    toast_icon = "<i class='fa fa-check'></i>";
  }

  if(type === "danger"){
    toast_icon = "<i class='fa fa-times'></i>";
  }

  document.getElementById("root").insertAdjacentHTML("beforeend",`<div id="${toast_id}" style="position:fixed;top:20px;left:30%;" class="toast align-items-center text-bg-${type} border-0">
  <div class="d-flex align-items-center border-0">
    <div class="toast-body">
      ${toast_icon} ${content}
    </div>
    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
  </div>
</div>`);

  let toast = new bootstrap.Toast(document.getElementById(toast_id),{delay:4000});

  toast.show();

  console.log(toast_id);
};