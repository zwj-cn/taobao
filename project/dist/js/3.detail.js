define(['jquery','jquerycookie'], function($) {
    return {
        init: function() {
            //获取地址栏的id
            let $id = +location.search.match(/\d+/g)
            $.ajax({
                //'http://10.31.152.52/er/project/php/detail.php'
                //http://10.31.152.52/er/project/php/detail.php
                url:'http://10.31.152.52/er/project/php/detail.php',
                type:"post",
                data:{
                    'id':$id
                },
                dataType:'json',
                //根据id找到数据，将数据渲染出来
                success:function(data){
                    $('#spic>img').attr('src',data.picurl)
                    $('.al>.title').html(data.title)
                    $('.al>.price').html('￥'+data.price)
                    //调用将购物车信息以数组形式存入cookie的函数
                    save()
                    big()
                }
            })
            //创建存放商品id和商品数目的数组
            let $arrid = []
            let $arrnum = [];
            //判断cookie中是否含有商品id和商品数目
            function save(){
                //判断cookie中是否含有商品id和数量
                function istrue(){
                    $arrid = []
                    $arrnum = [];
                    if($.cookie('id') && $.cookie('num')){
                        let $strid = $.cookie('id');
                        let $strnum = $.cookie('num');
                        $strid.replace(/\d+/g,function(res){
                            $arrid.push(+res)
                        })
                        $strnum.replace(/\d+/g,function(res){
                            $arrnum.push(+res)
                        })
                    }
                }
                $('.buy').on('click',function(){
                    istrue()
                    //在cookie中查找id，存在更新$arrnum数组，将数组存入cookie，不存在则创建
                    if($arrid.indexOf($id)=='-1'){
                        $arrid.push($id)
                        $arrnum.push(+$('.num>input').val())
                        $.cookie('id', $arrid, {
                            expires: 7,
                            path: '/'
                        });
                        $.cookie('num', $arrnum, {
                            expires: 7,
                            path: '/'
                        });
                    }else{
                        let index = $arrid.indexOf($id)
                        let renum = $arrnum[index] + +$('.num>input').val()
                        $arrnum[index] = renum
                        $.cookie('num', $arrnum, {
                            expires: 7,
                            path: '/'
                        });
                    }
                })
            }

            //放大镜
            function big(){
                let $width =  $('#spic').width() * $('#bf').width() / $('#bpic').width()
                let $height = $('#spic').height() * $('#bf').height() / $('#bpic').height()
                // console.log($width);
                //移入并显示放大镜，并根据放大后的宽高比例修改宽高
                $('#spic').on('mouseover',function(){
                    $('#sf').show().width($width).height($height)
                    $('#bf').show()
                    let $src = $('#spic>img').attr('src')
                    $('#bpic').attr('src',$src)
                    let $bili = $('#bpic').width() / $('#spic').width()

                    //鼠标移动
                    $('#spic').on('mousemove',function(e){
                        let $leftvalue = e.pageX - $('#spic').offset().left - $('#sf').width() / 2;
                        $leftvalue += 52
                        let $topvalue = e.pageY - $('#spic').offset().top - $('#sf').height() / 2;
                        // console.log($leftvalue,$topvalue)
                        if ($leftvalue <= 52) {
                            $leftvalue = 52;
                        } else if ($leftvalue >= $('#spic').width() - $('#sf').width() + 52) {
                            $leftvalue = $('#spic').width() - $('#sf').width() +52;
                        }
                        if ($topvalue <= 0) {
                            $topvalue = 0;
                        } else if ($topvalue >= $('#spic').height() - $('#sf').height()) {
                            $topvalue = $('#spic').height() - $('#sf').height();
                        }
                        $('#sf').css({'left':$leftvalue})
                        $('#sf').css({'top':$topvalue})
                        let $left = -$bili * ($leftvalue - 52)
                        let $top = -$bili * $topvalue
                        $('#bpic').css({'left':$left})
                        $('#bpic').css({'top':$top})
                    })
                })
               //鼠标移出
               $('#spic').on('mouseout',function(){
                    $('#sf').hide()
                    $('#bf').hide()
               })
            }
        }
    }
})