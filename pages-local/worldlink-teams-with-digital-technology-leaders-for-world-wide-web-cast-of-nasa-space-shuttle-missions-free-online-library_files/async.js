lib={
	trim:function(str){return str.replace(/^\s+/,'').replace(/\s+$/,'')},
	decode:function(str){return str==null?null:decodeURI(str).replace(/\+/g,' ')},
	EndsWith:function(str,suffix){return str.indexOf(suffix,str.length-suffix.length)!=-1},
	StartsWith:function(str,start){return str.slice(0,start.length)==start},
	cookie:{
		cookieName:function(permanent,domainWide){return'c'+(permanent?1:0)+(domainWide?1:0)},
		save:function(n,v,permanent,domainWide){
			var d=new Date();d.setFullYear(d.getFullYear()+10);
			document.cookie=n+'='+v+(permanent?'; expires='+d.toUTCString():'')+(domainWide?'; domain='+info.Domain:'')+'; path=/';
		},
		set:function(name,value,permanent,domainWide){
			var n=this.cookieName(permanent,domainWide);
			var v=this.getRaw(n),nv=value?name+'='+value:null;
			if(v){
				var d=v.split('&');
				for(var i=0;i<d.length;i++)if(lib.StartsWith(d[i],name+'=')){if(nv==null)d.splice(i,1);else d[i]=nv;break};
				if(nv!=null&&i>=d.length)d.push(nv);
				v=d.join('&');
			} else v=nv;
			this.save(n,v,permanent,domainWide);
		},
		remove:function(name,permanent,domainWide){
			var n=this.cookieName(permanent,domainWide);
			var v=this.getRaw(n);
			if(v)this.save(n,v.replace(new RegExp(name+"=[^&]*[&]?"),"").replace(/&$/,''),permanent,domainWide);
		},
		get:function(name,permanent,domainWide){
			if(arguments.length==3){
				var n=this.cookieName(permanent,domainWide);
				var v=this.getRaw(n);
				if(!v)return null;
				v=v.split('&');p=name+'=';
				for(var i=0;i<v.length;i++)if(lib.StartsWith(v[i],p))return decodeURIComponent(v[i].substring(p.length));
				return null;
			}
			else return this.get(name,0,0)||this.get(name,1,0)||this.get(name,0,1)||this.get(name,1,1);
		},
		getRaw:function(name){var d=document.cookie.split('; '),p=name+'=';for(var i=0;i<d.length;i++)if(lib.StartsWith(d[i],p))return d[i].substring(p.length);return null}
		},
	AsyncRequest:function(url,t,callback,onerror){
		var scr=document.createElement('script');
		scr.type='text/javascript';
		//scr.defer=true;
		scr.async=true;
		if(t)scr.text=t;
		scr.src=url;
		if(callback){scr.onreadystatechange=callback;scr.onload=callback}
		if(onerror){scr.onerror=onerror}
		document.getElementsByTagName('head').item(0).appendChild(scr);
	}
};



lib.AsyncRequest('//apis.google.com/js/plusone.js', '{"lang": "en"}');
lib.AsyncRequest('//connect.facebook.net/en_US/sdk.js#xfbml=1&appId=209093762443963&version=v2.0');

var nav={
	dw:document.body.offsetWidth,
	dh:document.body.offsetHeight,
	ww:window.innerWidth||document.documentElement.clientWidth,
	wh:window.innerHeight||document.documentElement.clientHeight,
	sw:screen.width,
	sh:screen.height,
	loc:(function(){var l=document.location,s=l.toString();return s.substr(0,s.length-l.hash.length)})(),
	ref:document.referrer
};


var acs={
a:0,
ab:function(){var ad=document.querySelector('.afs_ads');if(!ad||ad.innerHTML.length==0||ad.clientHeight===0)return 1},
chk:function(bf){
	var l=document.querySelectorAll('div.'+info.a);this.a=[];
	for(i=0;i<l.length;i++){
		var e=l[i],c=e.firstChild,d={id:e.id.substr(e.id.length-1,1),y:0,x:0,h:e.clientHeight,w:e.clientWidth,v:(e.innerHTML==''||(c&&c.style&&(c.style.display=='none'||c.style.visibility=='hidden'))?0:1)};
		while(e.offsetParent){d.y+=e.offsetTop;d.x+=e.offsetLeft;e=e.offsetParent}
		var q=d.id+'+'+d.x+'+'+d.y+'+'+d.h+'+'+d.w;
		if(!bf||!d.h||!d.v)this.a.push(q);
	}
},
fill:function(bf){
	var u='//www'+'.thefreelibrary.com/_/track.ashx?r='+Math.random()+(bf||this.ab()?'&ab=1&':'&');	
	this.chk(bf);
	if(this.a.length==0&&(bf||lib.cookie.get('track',0,1)))return;
	for(i in nav)u+=i+'='+encodeURIComponent(nav[i])+'&';
	for(i in info)u+=i+'='+encodeURIComponent(info[i])+'&';
	u+='l='+this.a.join(',');
	lib.AsyncRequest(u);
	}
};
window.setTimeout('acs.fill(0)', 20);

function dictionary() {
if (click_block){
click_block=0;
return;
}
if (!IE)
	od(document.getSelection().toString());
else{
	var t=document.selection.createRange();
	if(document.selection.type=='Text' && t.text>''){
		document.selection.empty();
		od(t.text);
		}
	}
	function od(t){
		while (t.substr(t.length-1,1)==' ')
			t=t.substr(0,t.length-1);
		
		while (t.substr(0,1)==' ')
			t=t.substr(1);
		
	if (t) window.open('http://www.thefreedictionary.com/'+encodeURIComponent(t), 'dict', 'width=750,height=550,resizable=1,menubar=1,scrollbars=1,status=1,titlebar=1,toolbar=1,location=1,personalbar=1');
	}
}

function m_over(url){
window.status=url;
return true;
}
function m_out(){
window.status='';
}
function changeTextSize(s){
	if (s){	
	var TD=Rules[0].style;
	TD.fontSize=s+'pt';
	setCookie('fontSize', s);
}}

function myerror(){
window.onerror=null;
return true;
}

function SendRating(eImg){
    if (usrSelf) return false;
	var nurl;
	if (artId > 0){
		if (/*usrAuthenticated && */userRate==-1){
			userRate=getVote(eImg);
			nurl=URLPref+'_/Users/AddRating.aspx?artId='+artId+'&vote='+userRate;
			nurl+='&t='+Math.random();
			lib.AsyncRequest(nurl);
		}/* else if (!usrAuthenticated){
			userRate=getVote(eImg);
			nurl=URLPref+ '_/Users/Registration.aspx?cmd=Rating&srcUrl='+escape(location.href)+'&arg0='+artId+'&arg1='+userRate;
			location=nurl;
		}*/
	}
	return false;
}
function onStarOver(eImg){
	if (userRate==-1 && !usrSelf){
		for (i=1; i<=5; i++){
			var rate_star=ById('rate_star_'+i);
			if (i <=getVote(eImg))	rate_star.src='_/static/FilledStar.png';
			else rate_star.src='_/static/EmptyStar.png';
		}
	}
}
function drwRating(){
	var cl=Math.ceil(curRating);
	var gl=Math.floor(curRating);
	for (i=1; i<=5; i++){
		var rate_star=ById('rate_star_'+i);
		if (i <=gl){
			if (userRate > 0 || usrSelf){
				rate_star.className='rating';
				rate_star.src='/_/static/SavedStar.png';
			} else{
				rate_star.className='usr_rating';
				rate_star.src='/_/static/FilledStar.png';
			}
		} else if (i==cl){
			if (userRate > 0 || usrSelf){
				rate_star.className='rating';
				rate_star.src='/_/static/SavedHalfStar.png';
			} else{
				rate_star.className='usr_rating';
				rate_star.src='/_/static/HalfStar.png';
			}
		} else{
			rate_star.src='_/static/EmptyStar.png';
			if (userRate > 0 || usrSelf) rate_star.className='rating';
			else rate_star.className='usr_rating';
		}
	}
	var htxt=curRating.toString()+' ['+totalVotes.toString()+' vote(s)]';
	if (!usrSelf)
		htxt+=(userRate==-1) ? ' You can rate this article by selecting 1 to 5 stars on the left.' : ' You have rated this article as '+userRate;
	else
		htxt+=' You can not rate your own article.'
	ById('rating_value').innerHTML=htxt;
}

function getVote(elm){
	var vt=elm.id.substr(elm.id.length-1);
	return parseInt(vt);
}

var abused_span_callback;
function abusedComment(e, comm_id){
	abused_span_callback=e;
	var sUrl=URLPref+'_/Users/Abuse.aspx?cmd=Abuse&commId='+comm_id;
	AsyncRequest(sUrl);
	return false;
}
var comm_done=false;
function onCommKey(evt){
	if (evt.keyCode==13){
		onCommSubmit();
		return true;
	} else	return false;
}

function checkComments() {var l = location.toString();var t = l.indexOf('#ttl=');if (t < 0) return;var c = l.indexOf('&comm=', t);ById('comm_title').value=decodeURIComponent(l.substring(t+5, c));ById('comm_text').value=decodeURIComponent(l.substring(c+6));}
function onCommSubmit(){
	if (comm_done) return false;
	var comm=ById('comm_text');
	var rnd=ById('comm_rnd');
	var err=ById('comm_error');
	if (comm.value.length==0){err.innerHTML='Comment text is required.'; return false;}
	if (rnd && rnd.value.length==0){err.innerHTML='Human validation code is required.'; return false;}
	err.innerHTML='Please wait ...';
	if ( artId > 0 ){
		err.innerHTML='&nbsp;';
		var nurl=URLPref;
		if (usrAuthenticated){
			nurl+='_/Users/SubmitComment.aspx?artId='+artId+'&artTitle='+artTitle+'&title='+encodeURIComponent(ById('comm_title').value)+'&comment='+encodeURIComponent(comm.value)+'&usrRnd='+rnd.value;
			nurl+='&t='+Math.random();
			comm_done=true;
			AsyncRequest(nurl);
		} else{
			nurl=location.href+'#ttl='+encodeURIComponent(ById('comm_title').value)+'&comm='+encodeURIComponent(comm.value);
			location = 'https:' + '//secure.farlex.com/Registration.aspx?siteId=3&returnURL=' + encodeURIComponent(nurl);
		}
	}
	return false;
}
function clearControl(){
	comm_done=false;
	var comm_captcha=ById('comm_captcha');
	comm_captcha.src = 'http:'+'//www2.thefreelibrary.com/_/access/image-rnd.ashx?len=4&' + Math.random();
	setTimeout('ById("comm_title").value="";ById("comm_text").value="";ById("comm_rnd").value=""',20);
}
function onLogin(){
	var ok=true;
	if (ById('userName').value.length==0){
		ById('err_userName').innerHTML='*';
		ok=false;
	}
	else ById('err_userName').innerHTML='&nbsp;';
	if (ById('userPwd').value.length==0){
		ById('err_userPwd').innerHTML='*';
		ok=false;
	} else
		ById('err_userPwd').innerHTML='&nbsp;';
	ById('srcUrl').value=document.URL;
	return ok;
}
function highlight(t) {
	var y = "";
	var i = -1;
	var k = ads.kw.toLowerCase();
	var lt = t.toLowerCase();
    
	while (t.length > 0) {
		i = lt.indexOf(k, i+1);
		if (i < 0) break;
		else {
			y += t.substring(0, i)+'<b>'+t.substr(i, k.length)+'</b>';
			t = t.substr(i + k.length);
			lt = t.toLowerCase();
			i = -1;
		}	}	return y+t;
}
