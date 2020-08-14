<?php
$conn = new mysqli('localhost','root','root','test');
//是否重名
if(isset($_POST['name'])){
    $name = $_POST['name'];
    $res = $conn->query("select * from user where name='$name'");
    if($res->fetch_assoc()){
        echo true;
    }else{
        echo false;
    }
}
//是否提交
if(isset($_POST['submit'])){
    $user = $_POST['username'];
    $pass = sha1($_POST['password']);
    $conn->query("insert user values(null,'$user','$pass')");
//页面跳转
    header('location:http://10.31.152.52/er/project/dist/5.login.html');
}