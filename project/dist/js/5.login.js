define(['jquery','sha1','jquerycookie'], function($) {
    return {
        init: function() {
            $('.btn').on('click',function(){
                let $username = $('.username').val()
                let $password = hex_sha1($('.password').val())
                $.ajax({
                    type:"post",
                    url:'http://10.31.152.52/er/project/php/login.php',
                    data:{
                        username:$username,
                        password:$password
                    },
                    success:function(data){
                        if(data){
                            $.cookie('name', $username, {
                                expires: 7,
                                path: '/'
                            });
                            location.href = '1.first_page.html';
                        }else{
                            $('li').eq(3).show().html('用户名或密码错误')
                        }
                    }
                })
            })
        }
    }
})