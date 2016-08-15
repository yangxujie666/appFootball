var aside_html=require("../templates/aside");
var mask=require("./mask");
$("body").append(aside_html);
$("#menu li").on("tap",function(){
	mask.hideMask();
	mask.hideAside();
	var ind=$(this).index();
	var wid=$(window).width();
	$(".scrollBox")
	.css({
		"-webkit-transform":"translate3d("+-(ind*wid)+"px,0,0)",
		"-webkit-transition":"transform .5s"
	})

	$("#nav_ul li")
	.eq(ind)
	.addClass("nav_active")
	.siblings()
	.removeClass("nav_active");
})
$(".mask").on("tap",function(){
	mask.hideMask();
	mask.hideAside();
})