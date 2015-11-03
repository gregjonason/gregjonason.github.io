function sizenews() { 
	var viewportWidth  = document.documentElement.clientWidth;
	var adjWidth  = document.documentElement.clientWidth - 540;
	document.getElementById('newsscroller').style.width = adjWidth+'px'; 
};

window.onresize = function() { sizenews(); };
sizenews();