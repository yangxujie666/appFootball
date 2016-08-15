require("../lib/zepto.min.js");
console.log($)
var data=null;
$.ajax({
	url:"mock/beautylist.json",
	dataType:"json",
	async:false,
	success:function(e){
		data=e;
	}
})
module.exports=data;