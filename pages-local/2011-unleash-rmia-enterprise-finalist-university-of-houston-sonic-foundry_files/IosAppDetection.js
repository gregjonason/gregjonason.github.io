(function(){"use strict";var n=function(n){function isAppCandidate(){var e=getCookie(s),o,h,u,i,t,r;if(e)if(o=(new Date).valueOf(),h=parseInt(e),o>h)f(s,"",undefined),n.AppCookieOverrideName&&f(n.AppCookieOverrideName,"",undefined);else if(n.AppCookieOverrideName){if(u=getCookie(n.AppCookieOverrideName),u)return!1}else return!1;return i=!1,t=navigator.userAgent,t!=null&&(r=!(t.toLowerCase().indexOf("windows phone")>-1)&&!(t.toLowerCase().indexOf("windows")>-1)&&(t.indexOf("iPhone")>-1||t.indexOf("iPod")>-1)&&t.indexOf("Safari")>-1,i=r&&n.AppEnabled),i}function buildDetectionPrompt(){var s,h,f,o;e=$("body"),u=$('<div class="IosAppDetection-Overlay"><div class="IosAppDetection-PromptContainer"></div></div>'),r=u.find(".IosAppDetection-PromptContainer"),u.prependTo(e),t=$('<div class="IosAppDetection-GetAppInfo"><p>'+n.InstallTheIosAppText+'</p><p><button class="IosAppDetection-GetAppInfoLink">'+n.GetTheAppButtonText+"</button></p></div>"),i=$('<div id="IosAppDetection-PlayPresentation"><p>'+n.InstallTheIosAppText+'</p><p><button class="IosAppDetection-PlayPresentationLink">'+n.PlayInAppButtonText+"</button></p></div>"),s=t.find("button"),h=i.find("button"),t.appendTo(r),i.appendTo(r),f=$('<div id="IosAppDetection-ContinueInBrowser"><p></p><p><button class="IosAppDetection-ContinueInBrowserLink">'+n.ContinueInSafariButtonText+"</button></p></div>"),o=f.find("button"),f.appendTo(r);o.on("click",closePrompt);s.on("click",getAppClicked);h.on("click",tryAppLaunch);e.css({height:u.height()+"px",overflow:"hidden"})}function closePrompt(){$(c).trigger("IosAppMessageClosed");var i=(new Date).valueOf()+36e5;f(s,i,undefined),n.AppCookieOverrideName&&f(n.AppCookieOverrideName,i,undefined),r.empty(),r.remove(),u.remove(),e.css({height:"",overflow:""})}function tryAppLaunch(){h=new Date,window.location=n.AppContentUrl,window.setTimeout(function(){var n=new Date;n.valueOf()<h.valueOf()+2*o?showGetAppButton():showPlayInAppButton()},o)}function getAppClicked(){i.show(),t.hide(),window.location=n.AppStoreUrl}function showPlayInAppButton(){t.hide(),i.show()}function showGetAppButton(){i.hide(),t.show()}function getCookie(n){var t,i;return document.cookie.length>0&&(t=document.cookie.indexOf(n+"="),t!=-1)?(t=t+n.length+1,i=document.cookie.indexOf(";",t),i==-1&&(i=document.cookie.length),unescape(document.cookie.substring(t,i))):""}var u,r,e,t,i,s="MediasiteAppDismissed",c=this,l,o,h,f;this.Run=function(){isAppCandidate()?buildDetectionPrompt():$(this).trigger("NotIosAppCandidate")},o=1500,f=function(n,t,i){var u,r;i?(r=new Date,r.setTime(r.getTime()+i*864e5),u="; expires="+r.toGMTString()):u="",document.cookie=n+"="+t+u+"; path=/"}};window.IosAppDetection=n})()