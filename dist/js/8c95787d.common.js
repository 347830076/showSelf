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