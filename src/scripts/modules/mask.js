module.exports={
	showMask:function(){
		$("body").append("<div class='mask'></div>")
	},
	hideMask:function(){
		$(".mask").remove();
	},
	hideAside:function(){
		$("#menu").hide();
	}

}













