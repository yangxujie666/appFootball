var detilesHtml=require("../templates/detiles.string");
SPA.defineView("detiles",{
	html:detilesHtml,
	init:{//初始化我们的变量和方法
		
	},
	plugins:["delegated",{//需要依赖的插件,单独是引用时直接以字符串引入,如果需要参数或默认方法可以放在对象中
		name:"avalon",
		options:function(vm){
			vm.img=null,
			vm.title=null,
			vm.descripe=null
		}
	}],
	bindEvents:{
		show:function(){
			var that=this;
			that.vm=that.getVM();//spa中设置获取本视口vm的方法,这里vm相当于angular中的$scope,用于抛出变量和函数,可以在视口直接调用
			var detilesiSC=this.widgets.detilesScroll;//this.widgets.detilesScroll是我们在dom结构中设置的scroll的id,当要对scroll做处理时候需要指定一个id
			detilesiSC.options.scrollX=true;//设置滚动条x轴滚动
			detilesiSC.options.scrollY=false;//禁止滚动条y轴滚动

			$.ajax({
				url:"/mock/listdetiles.json",
				data:this.param,//this指的是视口，这里thisparam是接收到传的参数
				dataType:"json",
				type:"get",
				success:function(data){
						that.vm.img=data.img;
						that.vm.title=data.title;
						that.vm.descripe=data.descripe;
				}
			})
		}
	}
});