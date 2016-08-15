	var mask=require("./mask");
	var index_html=require("../templates/index");//引入string的内容
	var dataList=require("./jsonData/beautylist");
	var beauty_data=dataList.beautylistData.data,
		live_data=dataList.livelistData.data,
		ul_len1=Math.ceil(beauty_data.length/2),
		ul_len2=Math.ceil(live_data.length/2);
	var isc;
	SPA.defineView("index",{//定义一个视口,这里相当于angular中的路由配置,页面监听到index这个视口,因此会自动跳转到这个视口(自己的理解)
		html:index_html,//index视口的内容，把string内容转化为HTML结构(自己的理解)
		plugins:["delegated"],//依赖的插件
		modules: [{//这个视口的模板
		    name: 'indexContent',//为我们视口设置的一个名字,供以后调用
		    container: '.context',//index是视口存放其他视口内容的容器
		    views: ['home', 'seach', 'me'],//index视口中要存放的所有视口
		    defaultTag: 'home'//设置index视口中存放的默认视口
		 }],
		bindActions:{//绑定页面的点击事件
			"swith_tabs":function(e,data){//在fekit中点击事件是通过在html结构中添加action-type属性参数e.el是点击的这个元素，是一个dom元素,data指我们在html结构中添加的data属性值对的集合
				$(e.el).addClass("cur").siblings().removeClass("cur");
				$(e.el).children().addClass("ft_cur");
				$(e.el).siblings().children().removeClass("ft_cur");
				this.modules.indexContent.launch(data.tag);
			},
			"swith.guide":function(e){
				this.hide();//隐藏当前视口
				
			},
			"swith.dialog":function(e){
				SPA.open("me",{//打开一个新的视口,如果是指一个视口参数，那么打开一个新的视口,如果是两个参数,调用插件dialog或者是actionsheet等,则是在视口的基础上打开视口(当打开的视口背景透明时可以看到之前得到的视口)
					ani:{//配置插件的参数
						name:"dialog",
						width:280,
						height:200
					}
				});
			},
			"goto.detiles":function(e,data){
				SPA.open("detiles",{
					param:data//为打开的新视口传递参数
				});
			}

		}
	});


