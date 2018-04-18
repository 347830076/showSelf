//图片居中显示  
function center_img(dom) {
	dom.style.visibility = 'hidden';
	var pWideth = dom.parentNode.offsetWidth;
	var pHeight = dom.parentNode.offsetHeight;
	var Wideth = dom.width;
	var Height = dom.height;
	
	if(Wideth >= Height){
		dom.width = pWideth;
		if(dom.height >= pHeight){
			dom.width = dom.width * pHeight / dom.height;
			dom.height = pHeight;	
		}	
	}else{
		dom.height = pHeight;
		if(dom.width >= pWideth){
			dom.height = dom.height * pWideth / dom.width;
			dom.width = pWideth;	
		}	
	}

	dom.style.marginLeft = (pWideth - dom.width) / 2 + 'px';
	dom.style.marginTop = (pHeight - dom.height) / 2 + 'px';
	dom.style.visibility = 'visible';
}