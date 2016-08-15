	var mask=require("./mask");
	var home_html=require("../templates/home");
	var dataList=require("./jsonData/beautylist");
	var beauty_data=dataList.beautylistData.data,
		live_data=dataList.livelistData.data,
		ul_len1=Math.ceil(beauty_data.length/2),
		ul_len2=Math.ceil(live_data.length/2);
	var isc;
	SPA.defineView("home",{
		html:home_html,
		plugins:["delegated",{
			name:"avalon",
			options:function(vm){
				vm.listdata=[];
				vm.livedata=[];
			}
		}],
		init:{
			vm:null,
			livelistArr:[],
			formatData:function(data){//转化json数据的形式,两个数据放在一个对象或数组中，重新形成一个数组
				var newArr=[];
				for(var i=0,len=Math.ceil(data.length/2);i<len;i++){
					newArr[i]=[data[2*i],data[2*i+1]]
				}

				return newArr;
			},
			getdata:function(url,obj){//获取数据
				var that=this;
				that.vm=that.getVM();
				$.ajax({
					url:url,
					data:{rtype:"origin"},
					dataType:"json",
					success:function(e){
						that.livelistArr=e.data;
						that.vm[obj]=that.formatData(e.data);			
					}
				});
			}
		},		
		bindActions:{
			"swith_nav":function(e){
				var ind=$(e.el).index();
				$(e.el).addClass("nav_active").siblings().removeClass("nav_active");
				showList(ind);
	
			},
			"swith-main":function(e){
				$(e.el).addClass("active").siblings().removeClass("active");
				this.hotSwp.slideTo($(e.el).index())//this.hotSwp.slideTo(下标)可以跳转到swiper中指定下标的的视口
			},
			"swith_aside":function(){
				$("#menu").show();
				mask.showMask();
			}	
		},
		bindEvents:{
			
			beforeShow:function(){
				var vm=this.getVM();
				this.getdata("/mock/beautylist.json","listdata");
				this.getdata("/mock/livelist.json","livedata");
			},
			show:function(){
				var a=0;
				var that=this;
				var vm=this.getVM();
				that.mySwp=new Swiper("#scroller",{						
						loop:false,
						onSlideChangeStart: function(swiper){ //页面切换结束，执行的代码，swiper是一个数组，swiper.activeIndex是当前页面的索引
						   var ind=swiper.activeIndex;
						   $("#nav_ul li").eq(ind).addClass("nav_active").siblings().removeClass("nav_active");
						} 
					});
				that.hotSwp=new Swiper("#hot-swiper",{						
						loop:false,
						onSlideChangeStart: function(swiper){ //页面切换结束，执行的代码，swiper是一个数组，swiper.activeIndex是每个页面的索引
						   var ind=swiper.activeIndex;
						   $("#tit_ul li").eq(ind).addClass("active").siblings().removeClass("active");
						} 
				});

				// 下拉刷新--上拉加载
			    var myScroll=this.widgets.homeListScroll;//获取定义的滚动对象
			    var scrollSize = 40;//设置初始移动位置
			    myScroll.scrollBy(0,-scrollSize);//scrollBy(x,y)设置scroll初始位置
			    var head=$(".head img"),//刷新图片
			    topImgHasClass=head.hasClass("up");//刷新图片是否有up样式名
			    var foot=$(".foot img"),//加载图片
			    bottomImgHasClass=head.hasClass("down");//加载图片是否有down样式名
			    myScroll.on("scroll",function(){//添加滚动事件
			        var y=this.y,//this.y当前滚动的距离
			            maxY=this.maxScrollY-y;
			            if(y>=0){
			                 !topImgHasClass && head.addClass("up");
			                 return "";
			            }
			            if(maxY>=0){
			                 !bottomImgHasClass && foot.addClass("down");
			                 return "";
			            }
			    })

			    myScroll.on("scrollEnd",function(){
			        if(this.y>=-scrollSize && this.y<0){
			              myScroll.scrollTo(0,-scrollSize);
			              head.removeClass("up");
			        }else if(this.y>=0){
			            head.attr("src","/images/ajax-loader.gif");
			            $.ajax({
			                  url:"/mock/refresh-livelist.json",
			                 // url:"/api/getLivelist.php",
			                  type:"get",
			                  data:{
			                      rtype:"refresh"
			                  },
			                  success:function(rs){
			                      that.vm.listdata = that.formatData(rs.data);
			                      myScroll.refresh();
			                      myScroll.scrollTo(0,-scrollSize);
					              head.removeClass("up");
					              head.attr("src","/images/arrow.png");
			                  }
			              })
			        }

			        var maxY=this.maxScrollY-this.y;
			        var self=this;
			        if(maxY>-scrollSize && maxY<0){
			              myScroll.scrollTo(0,self.maxScrollY+scrollSize);
			              foot.removeClass("down")
			        }else if(maxY>=0){
			            foot.attr("src","/images/ajax-loader.gif")
			              // 请求加载数据
			              $.ajax({
			                  url:"/mock/more-livelist.json",
			                 // url:"/api/getLivelist.php",
			                  type:"get",
			                  data:{
			                      rtype:"more"
			                  },
			                  success:function(rs){
			                      that.livelistArr = that.livelistArr.concat(rs.data);
			                      that.vm.listdata = that.formatData(that.livelistArr);

			                      /*var newArr = that.livelistArr.concat(rs.data);
			                      that.vm.livedata = that.formatData(newArr);
			                      that.livelistArr = newArr;*/

			                      myScroll.refresh();
			                      myScroll.scrollTo(0,self.y+30);
			                      foot.removeClass("down");
			                      foot.attr("src","/images/arrow.png")
			                      /*console.log(that.livelistArr)
			                      console.log(that.vm.livedata)*/
			                  }
			              })
			        }
			    })
			}
		}
	});
	// 显示列表页面
	function showList(ind){
		var wid=$(window).width();
		$(".scrollBox")
		.css({
			"-webkit-transform":"translate3d("+(-ind*wid)+"px,0,0)",
			"-webkit-transition":"transform .3s"
		})
	}
	// 渲染dom
	/*function ranDom(len,arr,obj){
		var beauty_html="";
		for(var i=0;i<len;i++){
			if(2*i<arr.length-1){
				beauty_html+='<ul>'
			                +'<li>'
			                  +'<img src="'+arr[2*i].img+'">'
			                  +'<p>'+arr[2*i].title+'</p>'
			                +'</li>'
			                +'<li></li>'
			                +'<li>'
			                  +'<img src="'+arr[2*i+1].img+'">'
			                  +'<p>'+arr[2*i+1].title+'</p>'
			                +'</li>'
			             +'</ul>';

			}else{
				beauty_html+='<ul>'
			                +'<li>'
			                  +'<img src="'+arr[2].img+'">'
			                  +'<p>'+arr[2].title+'</p>'
			                +'</li>'
			                +'<li></li>'
			                +'<li></li>'
			             +'</ul>';
			}
			
		}
		$(obj).html(beauty_html);
	}*/
	//init();
