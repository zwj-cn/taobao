define(['jquery','jquerycookie'], function($) {
    return {
        init: function() {
            let $arrid = [];
            let $arrnum = [];
            if($.cookie('id') && $.cookie('num')){
                let $strid = $.cookie('id');
                let $strnum = $.cookie('num');
                $strid.replace(/\d+/g,function(res){
                    $arrid.push(+res)
                })
                $strnum.replace(/\d+/g,function(res){
                    $arrnum.push(+res)
                })
                $.ajax({
                    dataType:'json',
                    url:"http://10.31.152.52/er/project/php/buycar.php",
                    success:function(data){
                        let $str = '';
                        let $sum = 0
                        let $oneprice
                        for(let value of data){
                            for(let i=0;i<$arrid.length;i++){
                                if(+value.id == $arrid[i]){
                                    let $allprice = value.price * $arrnum[i]
                                    $str += `<tr>
                                    <td class="all" logo ="${value.id}">
                                        <input type="checkbox" checked="" name="1" id="" class="body" value="" />
                                    </td>
                                    <td class="shop">
                                        <img src="${value.picurl}">
                                    </td>
                                    <td class="pict"></td>
                                    <td class="money">${value.price}</td>
                                    <td class="nums">${$arrnum[i]}</td>
                                    <td class="allmoney">${$allprice}</td>
                                    <td class="del"><a href="javascript:;">删除</a></td>
                                    </tr>`
                                    $sum += $allprice
                                }
                            }
                        }
                        $('tbody').html($str)
                        $('.totalprice').html(`￥：${$sum}`)
                        
                        //全选按钮
                        const $inputs = $('input').not('.allsel').not('.inp>input')
                        $inputs.on('click', function() {
                            if($(this).prop('checked') == true){
                                $(this).prop('checked',true)
                            }else{
                                $(this).prop('checked',false)
                            }
                            //tbody中复选框的全部选中，全选按钮选中
                            if ($('input:checked').not('.carhead>tr>.all').length === $inputs.size()) {
                                $('.allsel').prop('checked', true);
                            } else {
                                $('.allsel').prop('checked', false);
                            }
                            //点击复选框之后，总价格变化
                            $sum = 0
                            $sel = $('input:checked').not('.allsel')
                            if($sel.size()==0){
                                $('.totalprice').html(`￥：0`)
                            }
                            for(let i=0;i< $sel.size();i++){
                                $oneprice =  $sel.eq(i).parent().siblings('.allmoney').html()
                                $sum += +$oneprice
                            }
                            $('.totalprice').html(`￥：${$sum}`)
                        });

                        //全选按钮选中,tbody中复选框的全部选中
                        $('.allsel').on('click', function() {
                            if($(this).prop('checked') == true){
                                $(this).prop('checked',true)
                                $('.allsel').prop('checked',true)
                            }else{
                                $(this).prop('checked',false)
                                $('.allsel').prop('checked',false)
                            }
                            //如果全选按钮未被选中，总价格为0
                            if($('.allsel').prop('checked')==false){
                                $('.totalprice').html(`￥：0`)
                            }
                            $inputs.prop('checked', $(this).prop('checked'));
                        });
                    }
                })
                //删除
                $('tbody').on('click','.del',function(){
                    $(this).parent().remove()
                    let $sid = $(this).siblings('.all').attr('logo')
                    let $index = $arrid.indexOf(+$sid)
                    // console.log($index)
                    $arrid.splice($index,1)
                    $arrnum.splice($index,1)
                    console.log($arrid,$arrnum)
                    $.cookie('id', $arrid, {
                        expires: 7,
                        path: '/'
                    });
                    $.cookie('num', $arrnum, {
                        expires: 7,
                        path: '/'
                    });
                })
            }
        }
    }
})