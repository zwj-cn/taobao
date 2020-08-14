<?php
require "conn.php";
//分页
$pagesize = 20; //一个页面展示20条数据。
$result = $conn->query("select * from list"); 
$num = $result->num_rows; 
$pagenum = ceil($num / $pagesize); //总页数
//根据页码获取页码对应的数据
if (isset($_GET['page'])) {//判断页码是否存在
    $pagevalue = $_GET['page'];//存在，将页码赋值给$pagevalue
} else {//前端没有传入页码 默认页码为1
    $pagevalue = 1;
}
$page = ($pagevalue - 1) * $pagesize;//计算开始条数
$res = $conn->query("select * from list limit $page,$pagesize");//查找开始条数，根据显示条数$pagesize找出对应的数据段
//输出数据
$arr = [];
for($i=0;$i<$res->num_rows;$i++){
    $arr[$i] = $res->fetch_assoc();
}
echo json_encode($arr);