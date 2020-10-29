var scrollOutTime = null;
var scrollFlag = true;
$(window).scroll(function () {   
	if(scrollOutTime){
		clearTimeout(scrollOutTime);
	}
	if(scrollFlag){
		$('.header').animate({opacity:'0.5'},200);
		scrollFlag = false;
	}
  
  scrollOutTime = setTimeout(function(){
  	$('.header').animate({opacity:'1'},200);
  	scrollFlag = true;
  },500);
});

$(function(){
	var wow = new WOW({
		// 容器类名
		boxClass: 'wow',
		// 定义动画库的公共类
		animateClass: 'animate__animated',
		offset: 0,
		mobile: true,
		live: true
	});
	wow.init();
})