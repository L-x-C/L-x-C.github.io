function getTop(i,j){
	return 30+i*240;		
}
function getLeft(i,j){
	return 30+j*180;
}
function updateBoardView(){
	$('.number-cell').remove();		//清空
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
					'color': getColor(board[i][j]),
				});
				numberCell.text(board[i][j]);
			}
			hasConflicated[i][j] = false;
		}
	}
}
function showText(x,y,t){
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
}