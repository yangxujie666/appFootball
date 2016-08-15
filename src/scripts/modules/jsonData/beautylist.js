require("../../lib/zepto.min.js");

function getData(url,dataType,async){
	var data=null;
	var async=typeof(async)=="undefined"?async:false;
	$.ajax({
		url:url,
		dataType:dataType,
		async:async,
		success:function(e){
			data=e;
		}
	})
	return data;
}
var dataJson={
	beautylistData:getData("mock/beautylist.json","json",false),
	livelistData:getData("mock/livelist.json","json",false),
	moreLivelistData:getData("mock/more-livelist.json","json",false),
	searchlistData:getData("mock/searchlist.json","json",false),
	waterfallData:getData("mock/waterfall.json","json",false)
}
module.exports=dataJson;