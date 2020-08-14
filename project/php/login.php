<?php 
require "conn.php";
//检测用户名和密码
if(isset($_POST['username'])&&isset($_POST['password'])){
    $name = $_POST['username'];
    $pass = $_POST['password'];
    $result=$conn->query("select * from user where name = '$name' and pass = '$pass'");
    if($result->fetch_assoc()){
        echo true;
    }else{
        echo false;
    }
}