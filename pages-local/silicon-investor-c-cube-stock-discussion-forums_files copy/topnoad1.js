function sizeads() { 
	document.getElementById('adDiv1').innerHTML = random_imglink();
	document.getElementById('adDiv2').innerHTML = random_imglink();
};

function random_imglink() {
	var ry=Math.floor(Math.random()*8)
	if (ry==0)
	ry=1
	return '<a href="home.aspx"><img src="bannerads/P'+ry+'_120x90.png" border=0></a>'
}

/*
window.onresize = function() { sizeads(); };
sizeads();
*/
document.getElementById('adDiv1').innerHTML = random_imglink();
document.getElementById('adDiv2').innerHTML = random_imglink();
