
var board = [];
var score = 0;
var hasConflicated = [];

$(document).ready(function() {
	// alert($(window).width());
	newGame();
});


function newGame(){
	// 初始化游戏
	init();
	// 生成2个随机格子
	createOneCell();
	createOneCell();
}

function init(){
	score = 0;
	$('#score').text(score);
	for (var i = 0; i < 4; i++) {
		for(var j = 0;j < 4;j++){
			var cell=$("#cell-"+i+"-"+j);
			cell.css({						//初始化获得每个小格的位置
				'top': getTop(i,j),		
				'left': getLeft(i,j)
			});
		}
	}
	// 将board初始化为而为数组
	for (var i = 0; i < 4; i++) {
		board[i] = [];
		hasConflicated[i] = [];
		for (var j = 0; j < 4; j++) {
			board[i][j] = 0;
			hasConflicated[i][j] = false;
		};
	};
	updateBoardView();
}
function getTop(i,j){
	if($(window).width()<=980){
		return 30+i*240;	
	}else{
		return 15+i*120;		
	}
	
}
function getLeft(i,j){
	if($(window).width()<=980){
		return 30+j*180;
	}else{
		return 15+j*90;
	}

}
// 显示方格
function updateBoardView(){
	$('.number-cell').remove();		//清空
	if($(window).width()<=980){
		for (var i = 0; i < 4; i++) {
			for(var j = 0;j < 4;j++){
				$('#container').append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
				var numberCell = $("#number-cell-"+i+"-"+j);
				// 小方格里无内容与有内容时的样式
				if(board[i][j] == 0){
					numberCell.css({
						'width': 0,
						'height': 0,
						'top': getTop(i,j) + 100,
						'left': getLeft(i,j) + 100 
					});
				}else{
					numberCell.css({
						'width': '150px',
						'height': '210px',
						'top': getTop(i,j),
						'left': getLeft(i,j),
						'backgroundColor': getBgColor(board[i][j]),
						'color': getColor(board[i][j])
					});
					numberCell.text(board[i][j]);
				}
				hasConflicated[i][j] = false;
			}
		}
	}else{
		for (var i = 0; i < 4; i++) {
			for(var j = 0;j < 4;j++){
				$('#container').append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
				var numberCell = $("#number-cell-"+i+"-"+j);
				// 小方格里无内容与有内容时的样式
				if(board[i][j] == 0){
					numberCell.css({
						'width': 0,
						'height': 0,
						'top': getTop(i,j) + 50,
						'left': getLeft(i,j) + 50 
					});
				}else{
					numberCell.css({
						'width': '75px',
						'height': '105px',
						'top': getTop(i,j),
						'left': getLeft(i,j),
						'backgroundColor': getBgColor(board[i][j]),
						'color': getColor(board[i][j])
					});
					numberCell.text(board[i][j]);
				}
				hasConflicated[i][j] = false;
			}
		}
	}
}
function getBgColor(text){
	// return text == 2?"#66CCFF":"#fff";
	switch(text){
		case "平民":
			return "#66CCFF";
			break;
		case "党棍":
			return "#FF6680";
			break;
		default:
			return "#fff";
			break;
	}
}
function getColor(text){
	switch(text){
		case "平民":case "党棍":
			return "#fff";
			break;
		default:
			return "#000";
			break;
	}
}

// 生成一个随机格子
function createOneCell(){
	if(noSpace(board)){
		return false;
	}
	// 随机生成一个位置 [0~3][0~3]
	var randLocX = parseInt(Math.floor(Math.random() * 4));
	var randLocY = parseInt(Math.floor(Math.random() * 4));
	var times = 0;
	while(times < 50){
		if(board[randLocX][randLocY] == 0){
			break;
		}else{
			randLocX = parseInt(Math.floor(Math.random() * 4));
			randLocY = parseInt(Math.floor(Math.random() * 4));
		}
		times++;
	}
	if(times == 50){
		for (var i = 0; i < 4; i++) {
			for(var j = 0; j < 4; j++){
				if(board[i][j] == 0){
					randLocX = i;
					randLocY = j;
				}
			}
		}
	}

	// 随机生成一个内容
	var randText = Math.random() < 0.5 ? "平民" : "党棍";
	// 在随机位置显示随机内容
	board[randLocX][randLocY] = randText;
	showText(randLocX,randLocY,randText);
}
function noSpace(board){
	for(var i = 0;i < 4;i++){
		for(var j = 0;j < 4;j++){
			if(board[i][j] == 0){
				return false;
			}
		}
	}
	return true;
}
function showText(x,y,t){
	if($(window).width()<=980){
		var numberCell = $("#number-cell-"+x+"-"+y);
		numberCell.text(t);
		numberCell.css({
			'backgroundColor': getBgColor(t),
			'color':  getColor(t)
		});
		numberCell.animate({
			width: '150px', 
			height: '210px',
			top: getTop(x,y),
			left: getLeft(x,y)
		}, 150);
	}else{
		var numberCell = $("#number-cell-"+x+"-"+y);
		numberCell.text(t);
		numberCell.css({
			'backgroundColor': getBgColor(t),
			'color':  getColor(t)
		});
		numberCell.animate({
			width: '75px', 
			height: '105px',
			top: getTop(x,y),
			left: getLeft(x,y)
		}, 150);
	}
}

// 通过上下左右控制
$(document).keydown(function(event) {
	switch(event.keyCode){
		case 37:  //左
			if(moveLeft()){
				setTimeout("createOneCell()",210);
				setTimeout("isGameover()", 300);
			}
			break;
		case 38:  //上
			if(moveUp()){
				setTimeout("createOneCell()",210);
				setTimeout("isGameover()", 300);
			}
			break;
		case 39:  //右
			if(moveRight()){
				setTimeout("createOneCell()",210);
				setTimeout("isGameover()", 300);
			}
			break;
		case 40:  //下
			if(moveDown()){
				setTimeout("createOneCell()",210);
				setTimeout("isGameover()", 300);
			}
			break;
		default:
			break;
	}
});
function moveLeft(){
	if(!canMoveLeft(board)){
		return false;
	}else{
		for (var i = 0; i < 4; i++) {
			for(var j = 1;j < 4;j++){
				if(board[i][j] != 0){
					for(var k = 0;k < j;k++){
						if(board[i][k] == 0 && noBlockHorizontal(i,k,j,board)){
							//移动
							showMove(i,j,i,k);
							board[i][k] = board[i][j];
							board[i][j] = 0;
							continue;
						}else if(board[i][k] == board[i][j] && noBlockHorizontal(i,k,j,board) && !hasConflicated[i][k]){
							//移动
							showMove(i,j,i,k);
							//合并
							board[i][k] = levelUp(board[i][j]);
							board[i][j] = 0;
							updateScore(board[i][k]);
							$("#score").text(score);
							hasConflicated[i][k] = true;
							continue;
						}
					}
				}
			}
		};
		setTimeout("updateBoardView()",200);
		return true;
	}
}
function moveRight(){
	if(!canMoveRight(board)){
		return false;
	}else{
		for (var i = 0; i < 4; i++) {
			for(var j = 2;j >= 0;j--){
				if(board[i][j] != 0){
					for(var k = 3;k > j;k--){
						if(board[i][k] == 0 && noBlockHorizontal(i,j,k,board)){
							//移动
							showMove(i,j,i,k);
							board[i][k] = board[i][j];
							board[i][j] = 0;
							continue;
						}else if(board[i][k] == board[i][j] && noBlockHorizontal(i,j,k,board) && !hasConflicated[i][k]){
							//移动
							showMove(i,j,i,k);
							//合并
							board[i][k] = levelUp(board[i][j]);
							board[i][j] = 0;
							updateScore(board[i][k]);
							$("#score").text(score);
							hasConflicated[i][k] = true;
							continue;
						}
					}
				}
			}
		};
		setTimeout("updateBoardView()",200);
		return true;
	}
}

function moveUp(){
	if(!canMoveUp(board)){
		return false;
	}else{
		// for (var i = 1; i < 4; i++) {
		// 	
		for(var j = 0;j < 4;j++){
			for (var i = 1; i < 4; i++) {
				if(board[i][j] != 0){
					for(var k = 0;k < i;k++){
						if(board[k][j] == 0 && noBlockVertical(j,k,i,board)){
							//移动
							// alert("a");
							showMove(i,j,k,j);
							board[k][j] = board[i][j];
							board[i][j] = 0;
							continue;
						}else if(board[k][j] == board[i][j] && noBlockVertical(j,k,i,board) && !hasConflicated[k][j]){
							//移动
							// alert("b");
							showMove(i,j,k,j);
							//合并
							board[k][j] = levelUp(board[i][j]);
							board[i][j] = 0;
							updateScore(board[k][j]);
							$("#score").text(score);
							hasConflicated[k][j] = true;
							continue;
						}
					}
				}
			}
		};
		setTimeout("updateBoardView()",200);
		return true;
	}
}
function moveDown(){
	if(!canMoveDown(board)){
		return false;
	}else{
		// for (var i = 0; i < 3; i++) {
		// 	for(var j = 0;j < 4;j++){
		for(var j = 0;j < 4;j++){
			for (var i = 2; i >= 0; i--) {
				if(board[i][j] != 0){
					for(var k = 3;k > i;k--){
						if(board[k][j] == 0 && noBlockVertical(j,i,k,board)){
							//移动
							showMove(i,j,k,j);
							board[k][j] = board[i][j];
							board[i][j] = 0;
							continue;
						}else if(board[k][j] == board[i][j] && noBlockVertical(j,i,k,board) && !hasConflicated[k][j]){
							//移动
							showMove(i,j,k,j);
							//合并
							board[k][j] = levelUp(board[i][j]);
							board[i][j] = 0;
							updateScore(board[k][j]);
							$("#score").text(score);
							hasConflicated[k][j] = true;
							continue;
						}
					}
				}
			}
		};
		setTimeout("updateBoardView()",200);
		return true;
	}
}
function updateScore(text){
	switch(text){
		case "平民":
			score += 1;
			break;
		case "党棍":
			score += 2*2/2;
			break;
		case "党鞭":
			score += 4*4/2;
			break;
		case "议员":
			score += 8*8/2;
			break;
		case "部长":
			score += 16*16/2;
			break;
		case "国务卿":
			score += 32*32/2;
			break;
		case "众议长":
			score += 64*64/2;
			break;
		case "幕僚长":
			score += 128*128/2;
			break;
		case "参议长":
			score += 256*256/2;
			break;
		case "副总统":
			score += 512*512/2;
			break;
		case "总统":
			score += 1024*1024/2;
			break;
		default:
			score = 0;
			break;
	}
}
function levelUp(text){
	switch(text){
		case "平民":
			return "党棍";
			break;
		case "党棍":
			return "党鞭";
			break;
		case "党鞭":
			return "议员";
			break;
		case "议员":
			return "部长";
			break;
		case "部长":
			return "国务卿";
			break;
		case "国务卿":
			return "众议长";
			break;
		case "众议长":
			return "幕僚长";
			break;
		case "幕僚长":
			return "参议长";
			break;
		case "参议长":
			return "副总统";
			break;
		case "副总统":
			return "总统";
			break;
		default:
			return "上帝";
			break;
	}
}
function isGameover(){
	if(noSpace(board) && noMove(board)){
		$('#gameover').fadeIn('slow');
	}
	$("#goBtn").click(function(event) {
		$('#gameover').fadeOut('slow');
	});
}

function noMove(board){
	if(canMoveLeft(board) || canMoveRight(board) || canMoveDown(board) || canMoveUp(board)){
		return false;
	}
	return true;
}

// 能否上下左右移动
function canMoveLeft(board){
	for (var i = 0; i < 4; i++) {
		for(var j = 1;j < 4;j++){
			if(board[i][j] != 0){	//当前格有内容
				if(board[i][j-1] == 0 || board[i][j-1] == board[i][j]){				//如果当前格左边的格有空的或者有可以合并的
					return true;
				}
			}
		}
	}
	return false;
}
function canMoveRight(board){
	for (var i = 0; i < 4; i++) {
		for(var j = 2;j >= 0;j--){
			if(board[i][j] != 0){	//当前格有内容
				if(board[i][j+1] == 0 || board[i][j+1] == board[i][j]){				//如果当前格右边的格有空的或者有可以合并的
					return true;
				}
			}
		}
	}
	return false;
}
function canMoveUp(board){
	for(var j = 0;j < 4;j++){
		for (var i = 1; i < 4; i++) {
			if(board[i][j] != 0){	//当前格有内容
				if(board[i-1][j] == 0 || board[i-1][j] == board[i][j]){				//如果当前格左边的格有空的或者有可以合并的
					return true;
				}
			}
		}
	}
	return false;
}
function canMoveDown(board){
	for(var j = 0;j < 4;j++){
		for (var i = 2; i >= 0; i--) {
			if(board[i][j] != 0){	//当前格有内容
				if(board[i+1][j] == 0 || board[i+1][j] == board[i][j]){				//如果当前格左边的格有空的或者有可以合并的
					return true;
				}
			}
		}
	}
	return false;
}

// 水平方向之间无空格
function noBlockHorizontal(i,left,right,board){
	for(var x = left+1;x < right;x++){
		if(board[i][x] != 0){
			return false;
		}
	}
	return true;
}
// 垂直方向之间无空格
function noBlockVertical(j,top,bottom,board){
	for(var y = top+1;y < bottom;y++){
		if(board[y][j] != 0){
			return false;
		}
	}
	return true;
}
function showMove(fromX,fromY,toX,toY){
	var numberCell = $("#number-cell-"+fromX+"-"+fromY);
	numberCell.animate({
		top: getTop(toX,toY),
		left: getLeft(toX,toY)
	}, 180);
}


// 出现规则
$("#rule").click(function(event) {
	if($(window).width()<=980){
		if($(this).text() == "规则?"){
			$("#info").animate({
				'width': '680px'
			}, 800);
			$("#rule").text('收起规则?');
		}else{
			$("#info").animate({
				'width': '0'
			}, 800);
			$("#rule").text('规则?');
		}
	}else{
		if($(this).text() == "规则?"){
			$("#info").animate({
				'width': '680px'
			}, 800);
			$("#rule").text('收起规则?');
		}else{
			$("#info").animate({
				'width': '0'
			}, 800);
			$("#rule").text('规则?');
		}
	}
});


// 移动端
var touchX1 = 0,
	touchX2 = 0,
	touchY1 = 0,
	touchY2 = 0;
window.addEventListener('touchstart', function(e){
	touchX1 = e.touches[0].pageX;
	touchY1 = e.touches[0].pageY;
}, false);
window.addEventListener('touchmove',function(e){
	e.preventDefault();
},false);
window.addEventListener('touchend', function(e){
	touchX2 = e.changedTouches[0].pageX;
	touchY2 = e.changedTouches[0].pageY;
	// 左滑
	if(touchX1 - touchX2 > 100){		
		if(moveLeft()){
			setTimeout("createOneCell()",210);
			setTimeout("isGameover()", 300);
		}
	}else if(touchX2 - touchX1 >100){
		// 右滑
		if(moveRight()){
			setTimeout("createOneCell()",210);
			setTimeout("isGameover()", 300);
		}
	}else if(touchY1 - touchY2 >100){
		// 上滑
		if(moveUp()){
			setTimeout("createOneCell()",210);
			setTimeout("isGameover()", 300);
		}
	}else if(touchY2 - touchY1 >100){
		if(moveDown()){
			setTimeout("createOneCell()",210);
			setTimeout("isGameover()", 300);
		}
	}else{
		return false;
	}
}, false);


