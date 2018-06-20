
//每个页面一加载就要发送ajax请求，判断当前用户是否登录
//如果当前用户没有登录，需要跳转到登录页面
//如果是login页面，需要先发送ajax请求
if(location.href.indexOf("login.html") == -1) {
$.ajax({
  type:"get",
  url:"/employee/checkRootLogin",
  success:function(info){
    // console.log(info);
    if(info.error){
      location.href = "login.html"
      console.log(111);
      
    }
  }
})
}
NProgress.configure({showSpinner: false});//关闭进度环

$(document).ajaxStart(function(){
  // console.log("开始啦");
  NProgress.start();
})
$(document).ajaxStop(function(){
  // console.log("结束了");
  setTimeout(function(){
    NProgress.done();
  },500);
});


// 点击分类管理，让二级分类显示与隐藏
$(".child").prev().on("click",function(){
  // console.log(111);
  $(this).next().slideToggle();
})

//点击切换按钮，显示隐藏侧边栏
$(".menu").on("click",function(){
  $(".lt_aside").toggleClass("now");
  $(".lt_main").toggleClass("now");
  console.log(222)
})

//退出功能
// 点击退出按钮，显示模态框，点击退出模态框中确认按钮，退出即可
$(".exit").on("click",function(){
  $("#exitModal").modal("show");
  console.log(333)
});
$(".btnexit").on("click",function(){
  // location.href = "login.html";
  $.ajax({
    type:"get",
    url:"/employee/employeeLogout",
    success:function(info){
      if(info.success){
        location.href = "login.html";
        console.log(444)
      }
    }
  })
})


