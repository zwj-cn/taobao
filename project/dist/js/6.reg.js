define(['jquery'], function($) {
    return {
        init: function() {
            let $userflag = 1;
            let $passflag = 1;
            let $repass = 1;
            let $test = 1;
            //表单验证
            //用户名
            $('.username').on('focus',function(){
                $('.use').show().html("请输入长度不超过10位的由汉字、字母、数字、下划线组成的用户名")
            })
            $('.username').on('blur',function(){
                if($('.username').val() != ''){
                    let $reg = /^[a-zA-Z\u4e00-\u9fa5]+[0-9]*\_*[a-zA-Z\u4e00-\u9fa5]*$/g
                    let $len = $(this)[0].value.replace(/[\u4e00-\u9fa5]/g,'**').length
                    //验证长度
                    if($len<=10){
                        if($reg.test($(this).val())){
                            //是否重名
                            let $name = $(this).val()
                            $.ajax({
                                //http://10.31.152.52/er/project/php/reg.php
                                url:'http://10.31.152.52/er/project/php/reg.php',
                                type:"post",
                                data:{
                                    'name':$name
                                },
                                success:function(data){
                                    if(!data){
                                        $userflag = 1;
                                        $('.use').html("输入正确")
                                    }else{
                                        $userflag = 0;
                                        $(this).val('')
                                        $('.use').html("重名")
                                    }
                                }
                            })
                        }else{
                            $userflag = 0;
                            $(this).val('')
                            $('.use').html("输入有误")
                        }
                    }else{
                        $userflag = 0;
                        $(this).val('')
                        $('.use').html("输入有误")
                    }

                }else{
                    $userflag = 0;
                    $('.use').html("输入不能为空")
                }  
            })

            //密码
            $('.pass').on('focus',function(){
                $('.stro').show()
                $('.stro>span').eq(0).html('请输入6-12位密码').siblings().hide()
            })
            $('.pass').on('input',function(){
                if($(this).val().length<=12 && $(this).val().length>=6){
                    var $regnum = /[0-9]/;
                    let $regup = /[A-Z]/; 
                    let $reglow = /[a-z]/; 
                    let $regother = /[\W\_]/;
                    let $count = 0;
                    if ($regnum.test($(this).val())){
                        $count++;
                    }
                    if ($regup.test($(this).val())) {
                        $count++;
                    }
                    if ($reglow.test($(this).val())) {
                        $count++;
                    }
                    if ($regother.test($(this).val())) {
                        $count++;
                    }
                    switch ($count) {
                        case 1:
                            $('.stro>span').eq(0).html('').siblings().show()
                            $('.stro>span').eq(1).css({'color':'red'}).siblings().css({'color':'#d7d7d7'})
                            $passflag = 0;
                            break;
                        case 2:
                        case 3:
                           $('.stro>span').eq(0).html('').siblings().show()
                            $('.stro>span').eq(2).css({'color':'red'}).siblings().css({'color':'#d7d7d7'})
                            $passflag = 1;
                            break;
                        case 4:
                           $('.stro>span').eq(0).html('').siblings().show()
                            $('.stro>span').eq(3).css({'color':'red'}).siblings().css({'color':'#d7d7d7'})
                            $passflag = 1;
                            break;
                    }
    
                }else{
                    $passflag = 0;
                    $('.stro>span').eq(0).html('密码长度不对')
                }
            })
            $('.pass').on('blur',function(){
                if($(this).val() == ''){
                    $passflag = 0;
                    $('.stro>span').eq(0).html('密码不能为空')
                }
                else if($passflag){
                    $('.stro>span').eq(0).html('输入正确')
                }
            })

            //确认密码
            $('.repass').on('focus',function(){
                $('ul>li').eq(7).show().html('请再次输入密码')
            })
            $('.repass').on('blur',function(){
                if($('.repass').val() != ''){
                    if($(this).val()==$('.pass').val()){
                        $repass = 1;
                        $('ul>li').eq(7).html('密码正确')
                    }else{
                        $repass = 0;
                        $(this).val('')
                        $('ul>li').eq(7).html('密码不正确')
                    }
                }else{
                    $repass = 0;
                    $('ul>li').eq(7).html('密码不能为空')
                }
            })

            //验证码
            //验证码生成
            let str = [];
            function test(){
                let arr=[];
                for(let i=48;i<=57;i++){
                    arr.push(String.fromCharCode(i));
                }
                for(let i=65;i<=90;i++){
                    arr.push(String.fromCharCode(i));
                }
                for(let i=97;i<=122;i++){
                    arr.push(String.fromCharCode(i));
                }
                str = []
                for(let i=0;i<6;i++){
                    let index = parseInt(Math.random()*arr.length);
                    if(index>9){
                        let flag = Math.random()>0.5?true:false;
                        if(flag){
                            str.push(arr[index].toUpperCase());
                        }else{
                            str.push(arr[index].toLowerCase());
                        }
                    }else{
                        str.push(arr[index]);
                    }
                }
                
            }
            //更换验证码
            $('.change').on('click',function(){
                test()
                $(this).siblings('p').html(str.join(''))
            })
            //验证
            $('.test').on('focus',function(){
                $('ul>li').eq(9).show().html('请输入验证码')
            })
            $('.test').on('blur',function(){
                if($('.test').val() != ''){
                    if($(this).val()==$(this).siblings('p').html()){
                        $test = 1;
                        $('ul>li').eq(9).html('验证码正确')
                    }else{
                        $test = 0;
                        $(this).val('')
                        $('ul>li').eq(9).html('验证码不正确')
                    }
                }else{
                    $test = 0;
                    $('ul>li').eq(9).html('验证码不能为空')
                }
            })
            //注册
            $('form').on('submit',function(){
                if($('.username').val() == ''){
                    $userflag = 0;
                    $('.use').show().html("会员名不能为空")
                }
                if($('.pass').val() == ''){
                    $passflag = 0;
                    $('.stro').show()
                    $('.stro>span').eq(0).html('密码不能为空').siblings().hide()
                }
                if($('.repass').val() == ''){
                    $repass = 0;
                    $('ul>li').eq(7).show().html('密码不能为空')
                }
                if($('.test').val() == ''){
                    $test = 0;
                    $('ul>li').eq(9).show().html('验证码不能为空')
                }
                if (!$userflag || !$passflag || !$repass || !$test) {
                    return false; 
                }
            })
        }
    }
})