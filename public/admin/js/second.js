

$(function () {
  //
  var page = 1;
  var pageSize = 5;

  render();
  function render() {
    $.ajax({
      type: "get",
      url: "/category/querySecondCategoryPaging",
      data: {
        page: page,
        pageSize: pageSize
      },
      success: function (info) {
        // console.log(info);
        $("tbody").html(template("tpl", info));


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

  $(".btnadd").on("click", function () {
    // console.log(564);
    $("#addModal").modal("show");
    $.ajax({
      type: "get",
      url: "/category/querySecondCategoryPaging",
      data: {
        page: 1,
        pageSize: 100
      },
      success: function (info) {
        // console.log(info);
        $(".dropdown-menu").html(template("tpl1", info));
      }
    })
  })

  // 给a注册绑定事件

  // 获取文本内容，修改一级分类位置的文本

  // 这个地方没有出来
  $(".dropdown-menu").on("click", "a", function () {
    //大坑，奶奶的
    var txt = $(this).text();
    $(".dd-text").text(txt);
    var id = $(this).data("id");
    $("[name='categoryId']").val(id);
// console.log(1111);
    $("form").data("bootstrapValidator").updateStatus("categoryId", "VALID")
  
  })



  $("#fileupload").fileupload({
    dataType: 'json',
    done: function (e,data) {
      // 图片上传的回调函数 e 事件对象
      console.log(data.result.picAddr);
      $(".img_box img").attr("src", data.result.picAddr);

      $("[name='brandLogo']").val(data.result.picAddr);
      $("form").data("bootstrapValidator").updateStatus("brandLogo", "VALID");
    }
  });

  $("form").bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    excluded: [],
    fields: {
      categoryId: {
        validators: {
          notEmpty: {
            message: "请选择一级分类",
          }
        }
      },
      brandName: {
        validators: {
          notEmpty: {
            message: "请选择二级分类名称",
          }
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: "请选择上传图片",
          }
        }
      },
    }
  });

  $("form").on("success.form.bv", function (e) {
    e.preventDefault();

    $.ajax({
      type: "post",
      url: "/category/addSecondCategory",
      data: $("form").serialize(),
      success: function (info) {
        if (info.success) {
          $("#addModal").modal("hide");
          page = 1;

          render();

          $("form").data("bootstrapValidator").resetForm(true);
          $(".dd-text").text("请选择一级分类");
          $(".img_box img").attr("src", "images/none.png")
        }
      }
    })
  })
})

