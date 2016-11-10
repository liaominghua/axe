$(function() {
	doSearch();
});
/**
 * 查出所有的资管产品设置信息
 */
function doSearch() {
	$("#zgproductconfigtable").datagrid(
			{ 
				queryParams:{
					"status":$("#status").combobox("getValue"),
					"assetname":$("#assetname").val(),
					"assetcode":$("#assetcode").val()
				},
				url : "list.do",
				animate : true,
				fitColumns : true, // 自适应列宽
				rownumbers : true, // 设置为true将显示行数
				loadMsg : "正在载入,请稍候...",// 当从远程站点载入数据时，显示的一条快捷信息
				striped : true, // 设置为true将交替显示行背景
				nowrap : false,//允许换行
				singleSelect :true,//只允许选择一行。
				pagination : true,// 设置true将在数据表格底部显示分页工具栏	
				columns : [ [
						{
							field : "assetname",
							title : "产品名称",
							width : 100,
							align : 'center'
						},
						{
							field : "assetcode",
							title : "产品代码",
							width : 100,
							align : 'center'
						},
						{
							field : "duration",
							title : "投资期限",
							width : 100,
							align : 'center'
						},
						{
							field : "firstperformbench",
							title : "首投业绩基准",
							width : 100,
							align : 'center'
						},	{
							field : "buystartdate",
							title : "申购开放起始",
							width : 100,
							align : 'center',
							formatter : function(value, rec, index) {
								return formatDate1(rec.buystartdate);
							}
						},	{
							field : "status",
							title : "状态",
							width : 100,
							align : 'center',
							 formatter: function(value, row, index) {
				        		  if(value=="0"){
				        			  return "封闭中";
				        		  } else if(value=="1"){
				        			  return "开放中";
				        		  }
		                      }
						},
						{
							field : "del",
							title : "操作",
							width : 50,
							align : 'center',
							formatter : function(value, rec, index) {
								var b = '<a href="javascript:update(' + "'"+ rec.assetcode + "','" + index + "'"+ ');">修改 </a>';
								var c = '<a href="javascript:del(' + "'"+ rec.assetcode + "','" + index + "'"+ ');">删除</a>';
								return b + c;
							}
						} ] ],
				frozenColumns : [ [ {
					field : 'ck',
					checkbox : true
				} ] ]
			});
}

/**
 * 修改时将数据填充到表格
 * @param ids
 * @param index
 */
function update(ids, index) {
	var row = $("#zgproductconfigtable").datagrid("getSelected");
	if(row){
		addshow("updatezgproductconfig","资管产品配置");
		$.ajax({
			type : "post",
			url : "getzgproductconfig.do",
			data : "id=" + ids,
			success : function(result) {
				var msg = eval('(' + result + ')');
				$("#assetcode_update").val(msg.assetcode);
				$("#assetname_update").val(msg.assetname);
				$("#description_update").val(msg.description);
				$("#fundmanager_update").val(msg.fundmanager);
				$("#investstrategy_update").val(msg.investstrategy);
				$("#investrange_update").val(msg.investrange);
				$("#managerdescription_update").val(msg.managerdescription);
				$("#profitrule_update").val(msg.profitrule);
				$("#managefeerate_update").numberbox('setValue',msg.managefeerate);
				$("#consignfeerate_update").numberbox('setValue',msg.consignfeerate);
				$("#establishdate_update").datebox("setValue", msg.establishdate);
				$("#duration_update").numberbox('setValue',msg.duration);
				$("#perform_update").val(msg.perform);
				$("#openrule_update").val(msg.openrule);
				search($("#assetcode_update").val());
			}
		});
	}

	
} 
/**
 * 修改资管产品信息
 */
function updatezgproductconfig() {
	var all=$("#zgcontracttable_update").datagrid("getData");
	$.ajax({
		type : "post",
		url : "updatezgproductconfig.do",
		data :  "assetcode=" + $("#assetcode_update").val()+ "&description="
		+ encodeURIComponent($("#description_update").val())+ "&assetname="
		+ encodeURIComponent($("#assetname_update").val())+ "&fundmanager="
		+ encodeURIComponent($("#fundmanager_update").val())+ "&investstrategy="
		+ encodeURIComponent($("#investstrategy_update").val())+ "&investrange="
		+ encodeURIComponent($("#investrange_update").val())+ "&managerdescription="
		+ encodeURIComponent($("#managerdescription_update").val())+ "&profitrule="
		+ encodeURIComponent($("#profitrule_update").val())+ "&managefeerate="
		+ $("#managefeerate_update").numberbox('getValue')+ "&perform=" 
		+ encodeURIComponent($("#perform_update").val())+ "&openrule=" 
		+ encodeURIComponent($("#openrule_update").val())+ "&duration=" 
		+ $("#duration_update").numberbox('getValue')+ "&consignfeerate="
		+ $("#consignfeerate_update").numberbox('getValue')	+ "&establishdate=" 
		+ formatDate($("#establishdate_update").datebox("getValue"))+ "&list=" 
		+ JSON.stringify(all),
		success : function(result) {
			doSearch();
			 $('#zgcontracttable_update').datagrid("loadData",{ "total":"0",rows:[] });
			clear('frm1', 'updatezgproductconfig');
			var msg = eval('(' + result + ')');
			$.messager.alert('提示', msg.message);

		}
	});
}

function clear_update(frid,divid){
	$('#zgcontracttable_update').datagrid("loadData",{ "total":"0",rows:[] });
	clear(frid,divid);
}
/**
 * 添加资管产品信息
 */
function addconfig() {
	var all=$("#zgcontracttable_add").datagrid("getData");
	$.ajax({
		type : "post",
		url : "addzgproductconfig.do",
		data : "assetcode=" + $("#assetcode_add").val() + "&description="
				+ encodeURIComponent($("#description_add").val())+ "&fundmanager="
				+ encodeURIComponent($("#fundmanager_add").val())+ "&investstrategy="
				+ encodeURIComponent($("#investstrategy_add").val())+ "&investrange="
				+ encodeURIComponent($("#investrange_add").val())+ "&managerdescription="
				+ encodeURIComponent($("#managerdescription_add").val())+ "&profitrule="
				+ encodeURIComponent($("#profitrule_add").val())+ "&managefeerate="
				+ encodeURIComponent($("#managefeerate_add").numberbox('getValue'))+ "&perform=" 
				+ encodeURIComponent($("#perform_add").val())+ "&openrule=" 
				+ encodeURIComponent($("#openrule_add").val())+ "&duration="
				+ $("#duration_add").numberbox('getValue')+ "&consignfeerate=" 
				+ $("#consignfeerate_add").numberbox('getValue')+ "&establishdate=" 
				+ formatDate($("#establishdate_add").datebox("getValue"))+ "&openrule="
				+ encodeURIComponent($("#openrule_add").val())+"&assetname="
				+ $("#assetname_add").val()+"&list="
				+ JSON.stringify(all),
		success : function(result) {
			doSearch();
			 $('#zgcontracttable_add').datagrid("loadData",{ "total":"0",rows:[] });
			clear("frm","addzgproductconfig");
			var msg = eval('(' + result + ')');
			$.messager.alert('提示', msg.message);

		}
	});
}
function clear_add(frid,divid){
	 $('#zgcontracttable_add').datagrid("loadData",{ "total":"0",rows:[] });
	clear(frid,divid);
}
/**
 * 删除资管产品配置信息
 * 
 * @param ids
 * @param index
 */
function del(assetcode, index) {
	$.messager.confirm("提示", "此数据删除后无法恢复，您确定要删除吗？", function(flag) {
		if (flag) {
			// 提交
			$.ajax({
				type : "post",
				url : "delzgproductconfig.do",
				data : "assetcode=" + assetcode,
				success : function(result) {
					doSearch();
					var msg = eval('(' + result + ')');
					$.messager.alert('提示', msg.message);
				}
			});
		}
	});
}

function show_product(id){
	addshow(id,"资管产品配置");
	findkcproduct();
}

function findkcproduct() {
	$("#kcproduct_table").datagrid(
			{
				queryParams:{
					"assetname":$("#assetname_search").val(),
					"assetcode":$("#assetcode_search").val()
				},
				url : "kcproductlist.do",
				animate : true,
				fitColumns : true, // 自适应列宽
				rownumbers : true, // 设置为true将显示行数
				loadMsg : "正在载入,请稍候...",// 当从远程站点载入数据时，显示的一条快捷信息
				striped : true, // 设置为true将交替显示行背景
				nowrap : false,
				fit : false,
				singleSelect :true,//只允许选择一行
				pagination : true,// 设置true将在数据表格底部显示分页工具栏
				pageNumber : 1,
				pageSize : 10,
				pageList : [ 5, 10, 15, 20, 25 ],
				columns : [ [
						{
							field : "del",
							title : "操作",
							width : 50,
							align : 'center',
							formatter : function(value, rec, index) {
									return '<a href="javascript:fund(' + "'"
											+ rec.assetcode + "','" + rec.assetname+ "'"
											+ ');">选择</a>';
							}
						},{
							field : "assetname",
							title : "产品名称",
							width : 100,
							align : 'center'
						}, {
							field : "assetcode",
							title : "产品代码",
							width : 100,
							align : 'center'
						},
						{
							field : "manager",
							title : "管理人",
							width : 100,
							align : 'center'
						} ] ],
				frozenColumns : [ [ {
					field : 'ck',
					checkbox : false
				} ] ]
			});
}

function fund(fundcode,fundname){
		$("#assetcode_add").val(fundcode);
		$("#assetname_add").val(fundname);
		$("#kcproduct").dialog({
			closed : true
		});	
}

/**
 * 时间格式化显示（yyyy-MM-dd H:m:ss）
 * @param now（yyyy-MM-dd H:m:ss）
 * @returns {String}
 */
function formatDate(now)   {
	if(now ==""){
		return "";
	}
	var date = new Date(now);     
	var year=date.getYear()+1900;     
	var month=date.getMonth()+1;     
	var dateTime=date.getDate();
	return year+"-"+month+"-"+dateTime;     
}
function add_show(id,tableid){
	addshow(id, "新增资管产品配置");
}

/**
 * 时间格式化显示（yyyy-MM-dd）
 * @param now（yyyy-MM-dd）
 * @returns {String}
 */
function formatDate1(now)   {
	if(now ==""){
		return "";
	}
	var date = new Date(now);     
	var year=date.getYear()+1900;     
	var month=date.getMonth()+1;     
	var dateTime=date.getDate();
	var hours = date.getHours()<10?'0'+date.getHours():date.getHours();
	var minutes = date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes();
	return year+"-"+month+"-"+dateTime+" "+hours+":"+minutes;     
}

function show_contract(id,type){
	var assetcode = $("#assetcode_add").val();	
	if(type ==2){
		assetcode = $("#assetcode_update").val();	
	}
	if(assetcode == ''){
		$.messager.alert('提示', '资管产品代码不能为空');
	}
	
}
