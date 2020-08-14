define(['jquery','jquerylazyload','jquerycookie'], function($) {
    return {
        init: function() {
            const $li = $('.banner>.bann>.main>.left>li')
            const $lis = $('.banner>.bann>.main>.no>.lis');
            const $center = $('.banner>.bann>.main>.center')
            const $rlis = $('.banner>.bann>.main>.no>.rlis')
            // 二级菜单，滑动到li菜单模块显示
            $li.hover(function(){
                $('.no').show()
                $lis.eq($(this).index()).show().siblings().hide();
                $rlis.attr('style','opacity:1')
            },function(){
                $('.no').hide()
            })
            $('.no').hover(function(){
                $('.no').show()
            },function(){
                $('.no').hide()
            })

            //滑动到主题市场时，搜索框变换，固定在顶部
            $(window).on('scroll',function(){
                if($('.bann').offset().top<=$(window).scrollTop()){
                    $('.topsear').show().css({'z-index':999}).siblings('sear').hide()
                }else{
                    $('.topsear').hide().siblings('sear').show();
                }
            })

            //center模块中的轮播
            const $oli = $('.banner>.bann>.main>.center>.top>ol>li')
            const $pic = $('.banner>.bann>.main>.center>.top>.pic')
            const $img = $('.banner>.bann>.main>.center>.top>.pic>img')
            const $top = $('.banner>.bann>.main>.center>.top')
            const $le = $('.banner>.bann>.main>.center>.top>.le')
            const $ri = $('.banner>.bann>.main>.center>.top>.ri')
            $pic.width($img.width()*$img.size())
            let $num = 0
            let timer = null
            //移入轮播的盒子
            $top.on('mouseover',function(){
                $le.show()
                $ri.show()
                //圆点
                $oli.on('click',function(){
                    $num = $(this).index()
                    lunbo()
                })
                clearInterval(timer)
            })
            //左箭头
            $le.on('click',function(){
                $num--
                if($num<0){
                    $num = $oli.size()- 1;
                    $pic.css({
                        left:-$img.width()*($num+1)
                    })
                }
                lunbo()
            })
            //右箭头
            $ri.on('click',function(){
                $num++
                if($num == $oli.size()){
                    $oli.eq(0).addClass('active').siblings().removeClass('active')
                }
                if($num > $oli.size()){
                    $num = 1;
                    $pic.css({
                        left:-$img.width()*($num-1)
                    })
                }
                lunbo()
            })
            //自动播放
            timer = setInterval(function(){
                $ri.click()
            },2000)
            //移出盒子继续轮播
            $top.on('mouseout',function(){
                $le.hide()
                $ri.hide()
                timer = setInterval(function(){
                    $ri.click()
                },2000)
            })
            //封装轮播的函数
            function lunbo(){
                $oli.eq($num).addClass('active').siblings().removeClass('active')
                $pic.stop(true).animate({
                    left:-$img.width()*$num
                },200)
            }

            //充话费、旅行...tab切换
            const $last = $('.banner>.bann>.last>.tab2>ul>li')
            const $lastli = $('.banner>.bann>.last>.tab2>ol>li')
            $last.on('mouseover',function(){
                $lastli.eq($(this).index()).show().siblings().hide()
                $(this).css({'border':'1px solid #F40','border-bottom':'none'}).siblings().css({'border':'0','border-bottom':'1px solid #F40'})
            })

            //阶梯跳转
            const $tab2 = $('.banner>.bann>.last>.tab2')
            const $ind = $('.banner>.ind')
            //超过一定距离固定头部
            $(window).on('scroll',function(){
                if($tab2.offset().top<$(window).scrollTop()){
                    $('.banner>.floor').css({'position':'fixed','top':'60px'})
                }else{
                    $('.banner>.floor').css({'position':'absolute','top':'637px'})
                }
            })
            //到达对应区域,阶梯变换样式
            $(window).on('scroll',function(){
                $ind.each(function(index,ele){
                    if($(ele).offset().top>$(window).scrollTop()){
                        $('.banner>.floor>li').eq(index).addClass('acv').siblings().removeClass('acv')
                        return false
                    }
                })
            })
            //点击阶梯跳转到对应区域
            $('.banner>.floor>li').not('#back').on('click',function(){
                $(this).addClass('acv').siblings().removeClass('aacv')
                let $heig =$ind.eq($(this).index()).offset().top
                $('html').stop(true).animate({
                    scrollTop:$heig
                })
            })
            //回顶部
            $('#back').on('click',function(){
                $('html').animate({
                    scrollTop: 0
                });
            })

            //渲染
            //ajax传递数据
            const $love = $('.banner>.love>.list')
            // http://10.31.152.52/er/project/php/love.php
            // url:'http://localhost/er/project/php/love.php',
            $.ajax({
                    url:'http://10.31.152.52/er/project/php/love.php',
                    dataType:'json',
                    success:function(data){
                        let str = '';
                        for(let value of data){
                            str += `<li>
                                <img class="lazy" data-original="${value.picurl}" width="215.5" height="200">
                                <p>${value.title}</p>
                                <span>价格：${value.price}</span>
                                <span>${value.sales}</span>
                                </li>`;
                        };
                        $love.html(str)
                        $('img.lazy').lazyload({
                            effect: "fadeIn" //图片显示方式 谈入
                        });
                    }
            })
            

            //获取cookie中的数据，如果cookie存在，显示用户名，点击退出，用户名消失
            if($.cookie('name')){
                $('.username').html($.cookie('name'))
                $('.back').html("退出")
                $('.back').attr('href','javascript:;')
            }
            $('.back').on('click',function(){
                $('.username').html('亲，请登录')
                $('.back').html("免费注册")
                $.cookie('name', '', {
                    expires: -1,
                    path: '/'
                });
            })
            if($('.back').html()=="免费注册"){
                $('.back').attr('href','6.reg.html')
            }
        }
    }
})