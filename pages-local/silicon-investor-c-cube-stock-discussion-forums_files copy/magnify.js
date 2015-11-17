$(document).ready(function(){
	$('#intelliTXT img').each(function(){
		var nw = $(this).get(0).naturalWidth
		if(nw > 1024) {
			$(this).attr('class', 'magnify');
			$(this).attr('data-magnifyto', nw);
			/* $(this).css('z-index', 99999);  */
		}
	});

});