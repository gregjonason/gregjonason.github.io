String.prototype.format = function() {   
    var args = arguments;   
    return this.replace(/{(\d+)}/g, function(match, number) {        
            return args[number] || '{' + number + '}';     
        }   
     ); 
 };

function rec_remove(ancId) {
     var anc = document.getElementById(ancId);
     anc.innerHTML = "";
     anc.setAttribute("class", "");
}

function recommendThis(id)
{
    var spanId = 'R' + id;
    var ancId = 'T' + id;
    var anc = document.getElementById(ancId);
    var span = document.getElementById(spanId);
    var anc_before = anc.innerHTML;
    anc.innerHTML = "<font color='red'>- (sending) -</font>";    
    var count = invokeService(spanId);
    if (count > 0) {
        anc.innerHTML = "<b>Recommended!</b>";
        span.innerHTML = "{0} {1}".format(count, ((count > 1) ? "Recommendations" : "Recommendation"));
	span.innerHTML = "<a href='readmsg.aspx?msgid=" + id + "&showwhorecd=1'>" + "{0} {1}".format(count, ((count > 1) ? "Recommendations" : "Recommendation") + "</a>");
        anc.removeAttribute("href");
        setTimeout("rec_remove('" + ancId + "');", 1000);
    }
    else {
        anc.innerHTML = anc_before;
    }

}
 
function invokeService(id)
{ 
    if (window.XMLHttpRequest) { //IE7+, Firefox, Chrome, Opera, Safari      
      xmlhttp=new XMLHttpRequest();
    }
    else{ // IE6, IE5
      xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    
    //var url = "Services.ashx?id={0}".format(id);    
    var url = "RecPost.ashx?id={0}".format(id);    
    xmlhttp.open("GET", url, false);
    xmlhttp.send();
    return (xmlhttp.responseText);     
}

function breakout_of_frame()
 {
   // see http://www.thesitewizard.com/archive/framebreak.shtml
   // for an explanation of this script and how to use it on your
   // own website
   if (top.location != location) {
     top.location.href = document.location.href ;
   }
 }

function pinsearchmenu()
{
    document.getElementById('p7').style.cssText='left:auto; right:0; opacity:1; ';
    document.getElementById('p12').style.cssText='left:auto; right:100%; opacity:1; ';  
    document.getElementById('unpinsearch').style.visibility='visible';
}

function unpinsearchmenu()
{
    document.getElementById('p7').style.cssText='left:-9999px; right:auto; opacity:0;';
    document.getElementById('p12').style.cssText='left:-9999px; right:auto; opacity:0;'  
    document.getElementById('unpinsearch').style.visibility='hidden';
}

function resetsearchmenu()
{
    document.getElementById('p7').style.left='';
    document.getElementById('p7').style.right='';
    document.getElementById('p7').style.opacity='';
    document.getElementById('p12').style.left='';
    document.getElementById('p12').style.right='';
    document.getElementById('p12').style.opacity='';
    document.getElementById('unpinsearch').style.visibility='hidden';
}

function clickLog(str)
/* http://stackoverflow.com/questions/9384073/javascript-click-tracker-ahref-links */
/* <a href=" { url } / file .swf " onClick="clickLog(tshis.href)">Click Me</a>  */
{
if (str=="")
  {
  document.getElementById("txtHint").innerHTML="";
  return;
  }
if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
    document.getElementById("txtHint").innerHTML=xmlhttp.responseText;
    }
  }
xmlhttp.open("GET","click-log.php?url="+str,true);
xmlhttp.send();
}

function searchpinfocus()
{
    pinsearchmenu();
    document.getElementById("searchsubjects").focus();	
}

function createCookie(name,value,days) {
	if (days) {
	    var date = new Date();
	    date.setTime(date.getTime()+(days*24*60*60*1000));
	    var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
	    var c = ca[i];
	    while (c.charAt(0)==' ') c = c.substring(1,c.length);
	    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) { createCookie(name,"",-1); }

function AudioToggle() {
    if (readCookie("AudioOn") != 0) {
        createCookie('AudioOn', '0', 365);  // 1 = 1 day = 24 hours persistence
        $("#audioctrl").attr("src", OUB + "images/audiooff.png");
	} else {
        eraseCookie('AudioOn');
        $("#audioctrl").attr("src", OUB + "images/audioon.png");
	}
}