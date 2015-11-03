if(window.MooTools){

	(function() {
		$('miniPremiereV2').getElements('.premiereBrand').addEvents({mouseenter: function() {
			this.addClass('hover');
			var flyoutBtmY = this.getElement('ul').getCoordinates().top+this.getElement('ul').getComputedSize().totalHeight;
			var windowHeight = window.getScroll().y + window.getSize().y;
			if(windowHeight<flyoutBtmY){
				this.getElement('ul').setPosition({
					relativeTo: this,
					position:'left',
					offset: {y:-54,x:-20}
				});
				this.addClass('premiereNoArw');
			}else{
				this.getElement('ul').setPosition({
					relativeTo: this,
					position:'left',
					offset: {y:0,x:-20}
				});
			}
		},mouseleave: function() {
			this.getElement('ul').setPosition({
				relativeTo: this,
				position:'left',
				offset: {y:0,x:-20}
			});
			this.removeClass('hover');
			this.removeClass('premiereNoArw');
		}});
	})();

}else if (window.jQuery){

	$(function(){
		$('#miniPremiereV2 .premiereBrand').hover(function(){
			$(this).addClass('hover');
			var flyoutBtmY = $(this).find('ul').offset().top + $(this).find('ul').outerHeight(true);
			var windowHeight = $('body').scrollTop() + $(window).height();
			if(windowHeight<flyoutBtmY){
				$(this).find('ul').css({
					left: '-20px',
					top: '-54px'
				});
				$(this).addClass('premiereNoArw');
			}else{
				$(this).find('ul').css({
					left: '-20px',
					top: '0px'
				});
			}
		},function(){
			$(this).find('ul').css({
				left: '-20px',
				top: '0px'
			});
			$(this).removeClass('hover');
			$(this).removeClass('premiereNoArw');
		});
	});
	
}