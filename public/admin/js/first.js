$(function () {
  var page = 1;
  var pageSize = 8;
  render();
  function render() {
    $.ajax({
      type: "get",
      url: "/category/queryTopCategoryPaging",
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
          size: 'small',
          onPageClicked: function (a, b, c, p) {
            page = p;

            render();
          }
        })

      }
    })
  }

  // 给添加分类按钮注册点击事件，显示模态框
  // 点击添加按钮，表单校验，成功，阻止页面跳转

  $(".btnadd").on("click", function () {
    $("#addModal").modal("show");
  })
  $("form").bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      categoryName: {
        validators: {
          notEmpty: {
            message: "一级分类名称不能为空",
          }
        }
      }
    }
  });
  $("form").on("success.form.bv",function(e){
    e.preventDefault();
    // console.log(222);
    $.ajax({
      type:"post",
      url:"/category/addTopCategory",
      data:$("form").serialize(),
      success:function(info){
        // console.log(info);
        $.ajax({
          type:"post",
          url:"/category/addTopCategory",
          data:$("form").serialize(),
          success:function(info){
            console.log(info);
            if(info.success){
              $("#addModal").modal("hide");
              console.log(112)
              page = 1;
              render();
              $("form").data("bootstrapValidator").resetForm();
            }
          }
        })
      }
    })
  })
})
