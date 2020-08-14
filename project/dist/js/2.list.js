define(['jquery','jquerylazyload','jquery.pagination'], function($) {
    return {
        init: function() {
            let $list =$('.list')

            //排序的初始值，将排序前后的li放置在数组中
            let array_default = []; //排序前的数组，默认的
            let array = []; //排序中的数组
            let prev = null; //当前的li里面的价格。
            let next = null; //下一个li里面的价格
            //'http://10.31.152.52/er/project/php/list.php'

            //获取数据并渲染
            $.ajax({
                url:'http://10.31.152.52/er/project/php/list.php',
                dataType:'json',
                success:function(data){
                    // console.log(data)
                    //渲染
                    let str = '';
                    for(let value of data){
                        str += `<li>
                            <a href = "3.detail.html?id=${value.id}">
                                <img class="lazy" data-original="${value.picurl}" width="215.5" height="200">
                                <p>${value.title}</p>
                                <span>价格：${value.price}</span>
                                <span>${value.sales}</span>
                            </a>
                            </li>`;
                    };
                    $list.html(str)
                    //懒加载
                    $('img.lazy').lazyload({
                        effect: "fadeIn" //图片显示方式 谈入
                    });

                    //排序的准备
                    array_default = []; //排序前的li数组
                    array = []; //排序中的数组
                    prev = null;
                    next = null;
    
                    //将页面的li元素加载到两个数组中
                    $('.list li').each(function(index, element) {
                        array[index] = $(this);
                        array_default[index] = $(this);
                    })
                }
            })

            //加载分页的代码  $('.page').pagination({})
            $('.page').pagination({
                pageCount: 16, //总的页数
                jump: true, //是否开启跳转到指定的页数，布尔值。
                prevContent: '上一页',
                nextContent: '下一页',
                // coping: true, //是否开启首页和尾页，布尔值。
                // homePage: '首页',
                // endPage: '尾页',
                callback: function(api) { //api:对象，包含分页信息，分页的页码。
                    //点击页码将获取到的页码传给后端。
                    // api.getCurrent()分页的页码
                    $.ajax({
                        url: 'http://10.31.152.52/er/project/php/list.php',
                        data: { 
                            page: api.getCurrent()//将分页对象返回的页码传输给后端
                        },
                        dataType: 'json'
                    }).done(function(data) { //根据页码重新获取接口数据，进行渲染。
                        let str = '';
                        for(let value of data){
                            str += `<li>
                                        <a href = "3.detail.html?id=${value.id}">
                                            <img class="lazy" data-original="${value.picurl}" width="215.5" height="200">
                                            <p>${value.title}</p>
                                            <span>价格：${value.price}</span>
                                            <span>${value.sales}</span>
                                        </a>
                                </li>`;
                        };
                        $list.html(str)//分页结束
                        
                        //懒加载
                        $('img.lazy').lazyload({
                            effect: "fadeIn" //图片显示方式 谈入
                        });

                        //排序的准备
                        array_default = []; //排序前的li数组
                        array = []; //排序中的数组
                        prev = null;
                        next = null;
        
                        //将页面的li元素加载到两个数组中
                        $('.list li').each(function(index, element) {
                            array[index] = $(this);
                            array_default[index] = $(this);
                        })
                    })
                }
            })

            //排序
            const $btn = $('.sort>div')
            //默认排序
            $btn.eq(0).on('click', function() {
                $(this).addClass('active').siblings().removeClass('active')
                $.each(array_default, function(index, value) { //遍历追加
                    $('.list').append(value);
                });
            });
            //价格升序
            $btn.eq(1).on('click', function() {
                $(this).addClass('active').siblings().removeClass('active')
                for (let i = 0; i < array.length - 1; i++) {
                    for (let j = 0; j < array.length - i - 1; j++) {
                        prev = parseFloat(array[j].find('span').eq(0).html().substring(3)); //当前li的价格
                        next = parseFloat(array[j + 1].find('span').eq(0).html().substring(3)); //下一个li的价格
                        //通过价格的判断，改变的是li的位置。
                        if (prev > next) {
                            let temp = array[j];
                            array[j] = array[j + 1];
                            array[j + 1] = temp;
                        }
                    }
                }
                $('.list').empty(); //清空原来的列表
                $.each(array, function(index, value) { //重新渲染，追加
                    $('.list').append(value);
                });
            });
        }
    }
})