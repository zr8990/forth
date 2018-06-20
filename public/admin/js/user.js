$(function () {
  var page = 1;
  var pageSize = 8;
  render();
  function render() {
    $.ajax({
      type: "get",
      url: "/user/queryUser",
      data: {
        page: page,
        pageSize: pageSize
      },
      success: function (info) {
        // console.log(info);
        var html = template("tpl", info);
        $("tbody").html(html);

        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: page,
          totalPages: Math.ceil(info.total / info.size),
          size: "small",
          onPageClicked: function (a, b, c, p) {
            // console.log(222);
            page = p;
            render();
          }
        })
      }
    })
  }

  //给启用或禁用注册点击事件，显示模态框，获取到启用禁用的模态框
  //点击确定的时候发送ajax请求，启用或禁用该用户，
  //成功的时候隐藏模态框，重新渲染
  $("tbody").on("click", ".btn", function () {
    $("#userModal").modal("show");
    // console.log(123);
    // 记录td中的id的值
    var id = $(this).parent().data("id");
    var isDelete = $(this).hasClass("btn-success") ? 1 : 0;
    console.log(id,isDelete);

    $(".btnconfirm").off().on("click", function () {

      $.ajax({
        type:"post",
        url:"/user/updateUser",
        data:{
          id:id,
          isDelete:isDelete
        },
        success:function(info){
          console.log(info);
          if(info.success){
            $("#userModal").modal("hide");
            render();
          }
        }
      })
    })

  })
})