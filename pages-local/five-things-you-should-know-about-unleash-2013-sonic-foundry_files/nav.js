jQuery(document).ready(function($){
	equalizeHeights();
	mobileClicks();

	function mobileClicks(){
		var hasTouch = ("ontouchstart" in window);
		var iOS5 = /iPad|iPod|iPhone/.test(navigator.platform) && "matchMedia" in window;
 		if(hasTouch || iOS5){
		$("#menu-main-menu-top > li > a").click(function() {
			var mvis = $("#menu-main-menu-top .mvis");
			mvis.each(function(){
				if(!$(this).is(":visible")) {
					$(this).removeClass('mvis');
				}
			});
			
			var sub = $(this).parent().find(".sub-menu-wrap");
			if (sub.is(":visible")) {
				if(sub.hasClass('mvis')){
					sub.removeClass('mvis');
				}else{
					sub.addClass('mvis');
					return false;
				}
			}
		});
		}
	}

	function equalizeHeights(){
		$('.large-menu > .sub-menu-wrap > .sub-menu').each(function(){
			var heights = $(this).find('> li').map(function() {
			  return $(this).height();
			}).get(),

			maxHeight = Math.max.apply(null, heights);
			var second = $(this).find("> li.no-children:nth-last-child(2)").height();
			$(this).find("> li").each(function(){
				$(this).height(maxHeight);
			});
			$(this).find("> li.no-children:nth-last-child(2)").height(second);
			$(this).find("> li.no-children:last-child").height(maxHeight - second);
		});
		$('#menu-main-menu-top .sub-menu-wrap').each(function(){
			$(this).removeClass('novis');
		});
	}
});

//Is Mobile?
function is_mobile(){
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ){
		return true;
	}else{
		return false;
	}
}