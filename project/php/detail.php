<?php
require "conn.php";
$id = $_POST['id'];
$sql = "select * from list where id = '$id'";
$res = $conn->query($sql);
echo json_encode($res->fetch_assoc());