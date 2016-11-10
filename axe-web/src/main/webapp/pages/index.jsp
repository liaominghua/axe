<%@ page language="java" contentType="text/html; charset=utf-8"   pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "hmain-contentp://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
   <%@include file="base.jsp"%> 
   <script type="text/javascript">
var index = 0;  
function addPanel(url,title){  
    if(!$('#main-content').tabs('exists', title)){  
        $('#main-content').tabs('add',{  
            title: title,  
            content: '<iframe src="'+url+'" frameBorder="0" border="0"  style="width: 100%; height: 100%;"/>',  
            closable: true  
        });  
    }else{  
        $('#main-content').tabs('select', title);  
    }  
}  
function removePanel(){  
    var tab = $('#main-content').tabs('getSelected');  
    if (tab){  
        var index = $('#main-content').tabs('getTabIndex', tab);  
        $('#main-content').tabs('close', index);  
    }  
}  
</script> 
</head>
<body class="easyui-layout">
	<div data-options="region:'west',split:true,title:'West'" style="width: 10%; padding: 2%;">
		<ul class="easyui-tree" style="color: black;" id="easyuitree">
				<li>
					<span>垫资管理</span>
					<ul>
						<li id="admin-tr1" ><span>
						<a href="javascript:void(0)" onclick="addPanel('t0/index.do','T0赎回报表')">
						T0赎回报表
						</a>
						</span></li>
						<li id="admin-tr2"><span>
						<a href="javascript:void(0)" onclick="addPanel('r2a/index.do','赎回转申购报表')" >
						赎回转申购报表
						</a>
						</span></li>
						<li id="admin-tr2"><span>
						<a href="javascript:void(0)" onclick="addPanel('r2a/loan.do','赎回转申购垫资处理')" >
						赎回转申购垫资处理
						</a>
						</span></li>
						<li id="admin-tr2"><span>
						<a href="javascript:void(0)" onclick="addPanel('r2a/order.do','垫资流水号查询')" >
						垫资流水号查询
						</a>
						</span></li>
					</ul></li>
	
		</ul>
	</div>
	
	<div id="main-content" data-options="region:'center',title:'Center'" style="width: 100%; height: 100%;" class="easyui-tabs" ></div>
</body>
</html>


</body>