define(["jquery","version!fly/managers/debug","managers/page-vars","managers/device"],function(e,t,n,r){t=t.init("video");var a=!1,o={init:function(){var t,o;r.isMobileUserAgent()?(t="MPEG4",o="HTML5"):r.isIPhone()?(t="M3U",o="HTML5"):r.isIPad()?(t="M3U",o="HTML5"):(t="MPEG4",o="Flash");var d=n.video.tpBaseUrl;"string"==typeof d&&0!==d.indexOf("http")&&(d=document.location.protocol+"//"+document.location.host+d);var m=document.getElementsByTagName("meta"),s={};for(s["tp:baseUrl"]=d,s["tp:initialize"]="false",s["tp:EnableExternalController"]="true",s["tp:preferredFormats"]=t,s["tp:preferredRuntimes"]=o,i=0;i<m.length;i++){var l=m[i].getAttribute("name");"undefined"!=typeof s[l]&&delete s[l]}for(var p in s)if(s.hasOwnProperty(p)){var u=document.createElement("meta");u.name=p,u.content=s[p],document.getElementsByTagName("head")[0].appendChild(u)}require(["mpx"],function(){a=!0,e(window).trigger("mpxLoaded")})},mpxIsLoaded:function(){return a}};return o});