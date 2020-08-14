<?php
require "conn.php";
$sql = "select * from love";
$res = $conn->query($sql);
$arr = [];
for($i=0;$i<$res->num_rows;$i++){
    $arr[$i] = $res->fetch_assoc();
}
echo json_encode($arr);