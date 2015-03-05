$(function(){
	$('img.lazy').lazyload({					//触发lazyload
		effect:'fadeIn'
	});
	var searchOpt=0;
	// 当搜索栏导航条被点击时，触发选中效果
	$('.nav li').click(function(event) {
		$('.nav li').removeClass('active');
		$(this).addClass('active');
		searchOpt=$(this).index();			//记录当前选中的选项，以后续判断不同搜索链接
	});
	// 搜索输入栏被点击时加长
	$('#searchInput').click(function(event) {
		event.stopPropagation();
		$(this).removeClass('col-sm-3 col-sm-offset-4').addClass('col-sm-5 col-sm-offset-3');
		$('#searchBtn').html('百度一下!').css('background', '#2932E1');
	});
	// 除了搜索输入栏和搜索按钮其他点击时取消搜索输入栏效果
	$('html').not('#searchInput #searchBtn').click(function(event) {
		$('#searchInput').removeClass('col-sm-5 col-sm-offset-3').addClass('col-sm-3 col-sm-offset-4');
		$('#searchBtn').html('搜索').css('background', '#F47564');
	});
	// 根据输入内容与选中的搜索项目进行判断搜索
	$('#searchBtn').click(function(event) {
		event.stopPropagation();
		var searchContent=$('#searchInput input').val();
		switch(searchOpt){
			case 0:
				window.open("http://www.baidu.com/#wd="+searchContent);
				break;
			case 1:
				window.open("http://news.baidu.com/ns?word="+searchContent);
				break;
			case 2:
				window.open("http://image.baidu.com/i?tn=baiduimage&ipn=r&ct=201326592&cl=2&lm=-1&st=-1&fm=index&fr=&sf=1&fmq=&pv=&ic=0&nc=1&z=&se=1&showtab=0&fb=0&width=&height=&face=0&istype=2&ie=utf-8&word="+searchContent);
				break;
			case 3:
				window.open("http://music.baidu.com/search?key="+searchContent);
				break;
			case 4:
				window.open("http://maps.baidu.com/"+searchContent);
				break;
			case 5:
				window.open("http://v.baidu.com/v?word="+searchContent);
				break;
		}
	});
	// 判断输入进入每个导航a的方向
	$('.content a').bind('mouseenter mouseleave',  function(e) {
		var w=$(this).width();
		var h=$(this).height();				//获得a的宽高
		var realOffsetLeft=$(this).offset().left;
		var realOffsetTop=$(this).offset().top;
		var scrollT=$('body').scrollTop();
		var x=(e.pageX-realOffsetLeft-w/2)*(w>h?(h/w):1);	
		var y=(h/2-e.pageY+realOffsetTop)*(h>w?(w/h):1);		//获得距中心点坐标系坐标
		var direction = Math.round((Math.atan2(y, x) * (180 / Math.PI)+360) / 90) % 4;		//将a沿对角线分为4个象限，获得相应位置
		var dirName = new Array('右方','上侧','左方','下侧');
		if(e.type=='mouseenter'){
			switch(direction){
				case 0:
					$(this).find('div').height(h).width(w).css({		//根据不同方向移动到距离原始位置（动画开始位置）
						'top': '0px',
						'left': w+'px',
						'lineHeight':h+'px'
					}).show().stop().animate({							//开始动画
						'top': '0px',
						'left': '0px'},
						'fast');
					break;
				case 1:
					$(this).find('div').height(h).width(w).css({
						'top': -h+'px',
						'left': '0px',
						'lineHeight':h+'px'
					}).show().stop().animate({
						'top': '0px',
						'left': '0px'},
						'fast');
					break;
				case 2:
					$(this).find('div').height(h).width(w).css({
						'top': '0px',
						'left': -w+'px',
						'lineHeight':h+'px'
					}).show().stop().animate({
						'top': '0px',
						'left': '0px'},
						'fast');
					break;
				case 3:
					$(this).find('div').height(h).width(w).css({
						'top': h+'px',
						'left': '0px',
						'lineHeight':h+'px'
					}).show().stop().animate({
						'top': '0px',
						'left': '0px'},
						'fast');
					break;
			}

		}else{
			switch(direction){
				case 0:
					$(this).find('div').stop().animate({
						'top': '0px',
						'left': w+'px'},
						'fast');
					break;
				case 1:
					$(this).find('div').stop().animate({
						'top': -h+'px',
						'left': '0px'},
						'fast');
					break;
				case 2:
					$(this).find('div').stop().animate({
						'top': '0px',
						'left': -w+'px'},
						'fast');
					break;
				case 3:
					$(this).find('div').stop().animate({
						'top': h+'px',
						'left': '0px'},
						'fast');
					break;
			}

		}
	});

})