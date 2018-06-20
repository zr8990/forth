$(function () {
  /*表单的校验 bootstrapValidator,会自动进行表单校验，只需要配置一些校验的规则即可
  表单提交的时候，以及输入内容的时候会自动校验，
  如果校验失败，会阻止表单提交
  如果表单校验成功了，才会让表单继续提交*/
  $("form").bootstrapValidator({
    // 用户名不能为空，用户密码不能为空，用户密码长度6-12位

    fields: {
      username: {
        validators: {
          notEmpty: {
            message: '用户名不能为空'
          },
          stringLength: {
            message: "用户名长度3~9位",
            min: 3,
            max: 9

          },
          callback: {
            message: "用户名不正确"
          }
        }
      },
      password: {
        validators: {
          notEmpty: {
            message: "用户密码不能为空"
          },
          stringLength: {
            message: "用户密码长度6~12位",
            min: 6,
            max: 12
          },
          callback: {
            message: "用户密码不正确"
          }
        }
      }
    },
    //显示小图标，直接复制
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    }
  });
  $("form").on("success.form.bv", function (e) {
    e.preventDefault();
    console.log("haha");
    $.ajax({
      type: "post",
      url: "/employee/employeeLogin",
      data: $("form").serialize(),
      dataType: "json",
      success: function (info) {
        console.log(info);
        if (info.success) {
          location.href = "index.html";
        }
        if (info.error === 1000) {
          // alert("用户名填写不正确");

          // 手动让用户名的校验失败
          // 更新哪个字段
          // 更新为什么状态  INVALID  VALID
          $("form").data("bootstrapValidator").updateStatus("username", "INVALID", "callback");
        }
        if (info.error === 1001) {
          // alert("用户密码填写不正确");
          $("form").data("bootstrapValidator").updateStatus("password", "INVALID", "callback")
        }
      }
    })
  });
  $("[type='reset']").on("click", function () {
    $("form").data("bootstrapValidator").resetForm(true);
  })


});