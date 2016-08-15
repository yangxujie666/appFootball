var seach_html=require("../templates/seach");
SPA.defineView("seach",{
	html:seach_html,
	plugins:["delegated"],
	bindEvents:{
		show:function(){
			var fixedIsc=this.widgets.fixed_scroll;
			var target=$("#sec>h3").offset().top,choose=true;
			fixedIsc.on("scroll",function(){//解决scroll滚动过程中元素固定定位的bug问题,思路是当元素滚动到指定位置是时，克隆一个元素添加到scroll盒子之后,脱离scroll后就不会bug问题了

				if( this.y<=-target ){
					if(choose){
						$(".container_scroll").after( $("#sec>h3").clone(true).addClass("sec_fixed") );
						choose=false;
					}
					
				}else{
					$(".sec_fixed").remove();
					choose=true
				}
			})
		}
	}
});