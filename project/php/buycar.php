<?php
require "conn.php";
$sql = "select * from list";
$res = $conn->query($sql);
//输出数据
$arr = [];
for($i=0;$i<$res->num_rows;$i++){
    $arr[$i] = $res->fetch_assoc();
}
echo json_encode($arr);