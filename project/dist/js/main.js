require.config({
    paths: { //配置名称和路径。
        'jquery': 'https://cdn.bootcdn.net/ajax/libs/jquery/1.12.4/jquery',
        'jquerycookie': 'https://cdn.bootcdn.net/ajax/libs/jquery-cookie/1.4.1/jquery.cookie',
        'jquerylazyload': 'https://cdn.bootcdn.net/ajax/libs/jquery.lazyload/1.9.1/jquery.lazyload'
    },
    shim:{
       'jquerylazyload':{
           deps:['jquery']
       },
       'jquery.pagination':{
        deps:['jquery']
    }
    }
});
require(['1.first_page','2.list','3.detail','4.buycar','5.login','6.reg']);
require(['jquery'], function($) { //引入jquery模块
    let $now = $('#now'); //获取元素
    let currentmodule = $now.attr('targetpage'); //获取元素的自定义的属性。
    if (currentmodule) { //模块是否存在
        require([currentmodule], function(cmodule) { //加载模块
            cmodule.init();
        });
    }
});