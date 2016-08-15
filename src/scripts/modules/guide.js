var guide_html=require("../templates/guide.string");
SPA.defineView("guide",{
	html:guide_html,
	plugins:["delegated"],
	bindActions:{
		"switch.index":function(){
			SPA.open("index");
		}
	},
	bindEvents:{
		show:function(){
			var mySwp=new Swiper(".swiper-container",{
				loop:false
			});
		}
	}
})