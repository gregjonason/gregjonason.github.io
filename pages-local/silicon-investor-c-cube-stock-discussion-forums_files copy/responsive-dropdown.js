

$(window).load(function(){
/* test for @media-query support */
$('body').append($('<div id="test-media-query">').css({visibility: 'hidden', position: 'absolute'}));
$('head').prepend('<style type="text/css" media="only all" id="test-media-query-style">');
styleSht = document.styleSheets[0];
if (styleSht.cssRules || styleSht.rules) {
	if (styleSht.insertRule) {styleSht.insertRule('#test-media-query {display:none !important;}', styleSht.cssRules.length);
	} else if (styleSht.addRule) {styleSht.addRule('#test-media-query', 'display:none');}
}
mediaQuery = $('#test-media-query').css('display') === 'none';
$('#test-media-query, #test-media-query-style').remove();

/* if not supported then use the jQuery routine */
if (!mediaQuery) {

	/* remove media query stylesheets */
	$('link[href="responsive-dropdown/size1024.css"], link[href="responsive-dropdown/size768.css"], link[href="responsive-dropdown/size480.css"]').remove();

	/* on page entry and page resize check the window width and add/remove stylesheets depending on width */
	$(window).on("resize", function () {
		widthDoc = $(window).width();

		if (!$('link[href="responsive-dropdown/size1024.css"]').length && widthDoc<=1024) {$("<link>").appendTo($('head')).attr({type:'text/css',rel:'stylesheet',href:'responsive-dropdown/size1024.css'});}
		if (widthDoc>1024) {$('link[href="responsive-dropdown/size1024.css"]').remove();}

		if (!$('link[href="responsive-dropdown/size768.css"]').length && widthDoc<=768) {$("<link>").appendTo($('head')).attr({type:'text/css',rel:'stylesheet',href:'responsive-dropdown/size768.css'});}
		if (widthDoc>768) {$('link[href="responsive-dropdown/size768.css"]').remove();}

		if (!$('link[href="responsive-dropdown/size480.css"]').length && widthDoc<=480) {$("<link>").appendTo($('head')).attr({type:'text/css',rel:'stylesheet', href:'responsive-dropdown/size480.css'});}
		if (widthDoc>480) {$('link[href="responsive-dropdown/size480.css"]').remove();}

	}).resize();

}

});
