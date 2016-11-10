/**
 * 表格显示
 * @param add
 */
function addshow(id,title) {
	$("#"+id).dialog({
		width : 600,
		height : 500,
		closed : false,
		cache : false,
		modal : true,
		title:title
	});
}

function colse(colsed){
	$("#"+colsed).dialog({
		closed : true
	});	
}

/**
 * 清空数据
 * 
 * @param fr
 * @param dv
 */
function clear(fr, dv) {
	$("#" + fr).form("clear");
	$("#" + dv).dialog({
		closed : true
	});
}