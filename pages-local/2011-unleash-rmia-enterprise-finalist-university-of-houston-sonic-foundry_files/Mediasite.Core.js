if(typeof Mediasite=="undefined"||!Mediasite)var Mediasite={};Mediasite.namespace=function(){for(var u=arguments,i=null,n,t,r=0;r<u.length;r=r+1)for(t=u[r].toString().split("."),i=Mediasite,n=t[0]==="Mediasite"?1:0;n<t.length;n=n+1)i[t[n]]=i[t[n]]||{},i=i[t[n]];return i},Mediasite.Slide=function(n,t,i,r){this.Number=n,this.Time=t,this.Text=i,this.Description=r;var u;this.SetUrlProvider=function(n){u=n},this.GetSlideUrl=function(){if(u)return u.GetSlideUrl(this.Number)}},Mediasite.Slide.getCacheFriendlyImageSize=function(n,t){for(var u=[64,128,256,512,768],r,i=0;i<u.length;i++)if(r=u[i],n<=r)return new Mediasite.Geometry.Size(Math.round(r*t),r);return Mediasite.Geometry.Size.Zero()},Mediasite.Chapter=function(n,t,i){this.Number=n,this.Time=t,this.Text=i},Mediasite.Link=function(n,t){this.Url=n,this.Description=t},Mediasite.Presenter=function(n,t,i,r){this.Name=n,this.ImageUrl=t,this.Email=i,this.BioUrl=r},Mediasite.TimingEventType={Caption:1,SlideText:2},Mediasite.ContentStreamType={Video1:0,Slide:2,Presentation:3,Video2:4,Video3:5},Mediasite.ContentType={None:0,Video:1,Slide:2},Mediasite.Presentation=function(n){var t=this;if(this.PlaybackTicketId=n.PlaybackTicketId,this.PresentationId=n.PresentationId,this.Title=n.Title,this.Description=n.Description,this.Date=n.AirDate,this.Time=n.AirTime,this.Duration=n.Duration,this.UnixTime=n.UnixTime,this.Presenters=n.Presenters,this.Links=n.SupportingLinks,this.Chapters=n.Chapters,this.TimedEvents=n.TimedEvents,this.HasCaptions=n.Transcript&&n.Transcript.length>0,this.DisableCaptionDisplay=n.DisableCaptionDisplay,this.IsStandAlone=n.IsStandAlone,this.HasSearchableText=n.HasSearchableText,this.ServerVersion=n.Version,this.ForumEnabled=n.ForumEnabled,this.SharingEnabled=n.SharingEnabled,this.PollingEnabled=n.PollingEnabled,this.PollingLocation=n.PollingLocation,this.PlayStatus=n.PlayStatus,this.HasSlideContent=n.HasSlideContent,this.Transcript=n.Transcript,this.PreferSmoothStreaming=n.PreferSmoothStreaming,this.ServerClockSkew=n.ServerClockSkew,this.LiveStartUnixTimeInMs=n.LiveStartUnixTimeInMs,this.PlayerExtensions=n.PlayerExtensions,this.MediaState=0,this.GetStream=function(n){var t=undefined;return $.each(this.Streams,function(i,r){return n==r.StreamType?(t=r,!1):!0}),t},this.GetPlayerExtension=function(n){var i=null;return $.each(t.PlayerExtensions,function(t,r){return r.ExtensionType==n?(i=r,!1):!0}),i},this.IsLivePresentation=function(){return t.PlayStatus===Mediasite.Player.PresentationStatus.ScheduledForLive||t.PlayStatus===Mediasite.Player.PresentationStatus.OpenForLive||t.PlayStatus===Mediasite.Player.PresentationStatus.Live||t.PlayStatus===Mediasite.Player.PresentationStatus.LivePaused||t.PlayStatus===Mediasite.Player.PresentationStatus.LiveEnded},this.Streams=[],!n.Streams){t.Streams.length==0&&(t.Streams.push(new Mediasite.Player.Stream({StreamType:Mediasite.ContentStreamType.Video1})),t.Streams.push(new Mediasite.Player.Stream({StreamType:Mediasite.ContentStreamType.Video2})),t.Streams.push(new Mediasite.Player.Stream({StreamType:Mediasite.ContentStreamType.Video3})));return}$.each(n.Streams,function(n,i){var r=$.extend({},new Mediasite.Player.Stream(i));t.Streams.push(r)})},Mediasite.namespace("BrowserDetect"),Mediasite.BrowserDetect.Embedded=function(){return top!==self},Mediasite.BrowserDetect.Local=function(){return!!/file/i.exec(location.protocol)},Mediasite.BrowserDetect.GetBaseUri=function(){var n=window.location.href,t,i;if(n.indexOf("?")!=-1&&(n=n.substr(0,n.indexOf("?"))),n.indexOf("#")!=-1&&(n=n.substr(0,n.indexOf("#"))),n.indexOf(".html")!==-1){for(t=0;;)if(i=n.indexOf("/",t),i!=-1)t=i+1;else break;n=n.substr(0,t)}return n},Mediasite.BrowserDetect.IOS=function(){return!!/iphone|ipod|ipad/i.exec(navigator.userAgent)},Mediasite.BrowserDetect.IOS6=function(){return Mediasite.BrowserDetect.IOS()&&!!/OS 6_/.exec(navigator.userAgent)},Mediasite.BrowserDetect.Android=function(){return!!/android|crmo/i.exec(navigator.userAgent)},Mediasite.BrowserDetect.Firefox=function(){return $.browser.mozilla?$.browser.version:!1},Mediasite.BrowserDetect.InternetExplorer=function(){if($.browser.msie)return $.browser.version;var n=navigator.userAgent.match(/(?:\b(MS)?IE\s+|\bTrident\/7\.0;.*\s+rv:)(\d+)/);return n?n[2]:!1},Mediasite.BrowserDetect.InternetExplorerARM=function(){var n=navigator.userAgent.toLowerCase();return n.indexOf("msie")!=-1&&n.indexOf("arm")!=-1},Mediasite.BrowserDetect.Edge=function(){return/Edge\/\d\d/.exec(navigator.userAgent)?!0:!1},Mediasite.BrowserDetect.Chrome=function(){return Mediasite.BrowserDetect.Edge()?!1:/chrome/i.exec(navigator.userAgent)?$.browser.version:!1},Mediasite.BrowserDetect.ChromeAndroid=function(){return/Android/i.exec(navigator.userAgent)&&/Chrome/i.exec(navigator.userAgent)?!0:!1},Mediasite.BrowserDetect.MacOS10DotWhat=function(){var n=navigator.userAgent.match(/mac os x (\d+)_(\d+)/i);return n&&n.length==3?Number(n[2]):-1},Mediasite.BrowserDetect.MacOSX=function(){return Mediasite.BrowserDetect.MacOS10DotWhat()>-1},Mediasite.BrowserDetect.Safari=function(){return/safari/i.exec(navigator.userAgent)&&!Mediasite.BrowserDetect.Chrome()},Mediasite.BrowserDetect.MacSafari=function(){return Mediasite.BrowserDetect.Safari()&&Mediasite.BrowserDetect.MacOSX()},Mediasite.BrowserDetect.Blackberry=function(){return/blackberry|rim/i.exec(navigator.userAgent)?$.browser.version:!1},Mediasite.BrowserDetect.Mobile=function(){return!!(Mediasite.BrowserDetect.IOS()||Mediasite.BrowserDetect.Android()||Mediasite.BrowserDetect.Blackberry())},Mediasite.BrowserDetect.IEMetro=function(){var t=Mediasite.BrowserDetect.InternetExplorer(),n;if(t>9){n=null;try{n=!!new ActiveXObject("htmlfile")}catch(i){n=!1}return!n}return!1},Mediasite.GetQueryParam=function(n,t){var u="[\\?&]"+n+"=([^&#]*)",f=new RegExp(u,"i"),r=f.exec(window.location.href),i;if(r===null)return"";i=decodeURIComponent(r[1].replace(/\+/g," "));switch(t){case Mediasite.GetQueryParam.AsBool:i=i.toLowerCase(),i=i==="true"?!0:i==="false"?!1:null;break;case Mediasite.GetQueryParam.AsInt:i=parseInt(i,10)}return i},Mediasite.GetQueryParam.AsBool="bool",Mediasite.GetQueryParam.AsInt="int",Mediasite.Cookie=function(n){function readCookieData(){var f,e,i,r,s,o;if(document.cookie&&(i=document.cookie.indexOf(n+"="),i!==-1))for(i+=n.length+1,r=document.cookie.indexOf(";",i),r===-1&&(r=document.cookie.length),s=document.cookie.substring(i,r),o=s.split(u),f=0;f<o.length;f++)e=o[f].split("="),e.length===2&&(t[e[0]]=decodeURIComponent(e[1]))}function writeCookieData(){var e,o,s,f;i||(o=new Date,i=new Date(o.getFullYear()+1,o.getMonth(),o.getDate())),f="";for(e in t)t.hasOwnProperty(e)&&(f+=e+"="+encodeURIComponent(t[e])+u);f=f.substring(0,f.length-1),s=n+"="+f+(r?"; path="+r:"")+(i?"; expires="+i.toGMTString():""),document.cookie=s}var u="&",t={},i=null,r=null;readCookieData(),this.GetAll=function(){return t},this.GetName=function(){return n},this.GetExpires=function(){return i},this.SetExpires=function(n){i=n},this.GetPath=function(){return r},this.SetPath=function(n){r=n},this.SetValue=function(n,i){t[n]=i,writeCookieData()},this.GetValue=function(n,i){return t[n]?t[n]:i},this.GetNumberValue=function(n,i){return t[n]?Number(t[n]):i},this.GetBoolValue=function(n,i){return t[n]?t[n].toLowerCase()==="true"?!0:!1:i}},Mediasite.Urls=function(){var r={};return r.EscapedUnicodeRegex=/\%u([0-9A-F]{4})/g,r.UnicodeHtmlEntityReplacement="&#x$1;",r.EscapeForMailto=function(n){var f=!1,u=Mediasite.BrowserDetect.InternetExplorer(),t,i;return u&&u<=6&&(f=!0),t=escape(n),i=f?t.replace(r.EscapedUnicodeRegex,r.UnicodeHtmlEntityReplacement):t.replace(r.EscapedUnicodeRegex,function(n){return encodeURI(unescape(n))})},r.ContainsUnicode=function(n){var t=escape(decodeURI(n));return r.EscapedUnicodeRegex.test(t)?!0:!1},r}(this,jQuery),Mediasite.Logging=function(n,t){function fetchLogItems(n,t,i,f,e){var o,n,l,s,c;if(n)o=u.hasOwnProperty(n)?u[n]:[];else{o=[];for(n in u)u.hasOwnProperty(n)&&(l=u[n],o=o.concat(l),o.sort(function(n,t){return n.Timestamp-t.Timestamp}))}if(!o)return o;f=f!==!1,t=r.LogLevel.MinLevel<=t&&t<=r.LogLevel.MaxLevel?t:r.LogLevel.MinLevel,e=e?parseInt(e):0,i=typeof i=="number"?i>0?i:o.length:10;var a=f?0:o.length-1,v=f?o.length-1:a,y=f?1:-1,h=[];for(s=a;0<=s&&s<=v&&h.length<i;s+=y)c=o[s],c.LogLevel>=t&&(e?e--:f?h.push(c):h.unshift(c));return h}function getLogger(n){var t;return t=arguments.length>0&&0<n&&n<f.length?f[n]:f[0]}function registerLogger(n,i){n=typeof n=="string"&&n.length>0?n:e;var i=t.extend({},r.Logger.Defaults,i),o={name:n,options:i,output:t.Callbacks("unique")};return f.push(o),f.length-1}function pad(n,t,i,r){for(n=n!==null&&typeof n!="undefined"?n+"":"",t=t||0,i=i!=null&&typeof i!="undefined"?i:" ",r=!!r;n.length<t;)n=r?n+i:i+n;return n}function prepareLogItem(n,i,u,f){var o=t.extend({},r.Logger.Defaults,i,u),h=null,e,s,c;if(o.timestamp&&(o.timestamp instanceof Date||typeof o.timestamp=="string"||typeof o.timestamp=="number"))try{h=new Date(o.date)}catch(l){}for(h==null&&(h=new Date),e=[],e=e.concat(f),s=0;s<e.length;s++)typeof e[s]=="object"&&(e[s]=JSON.stringify(e[s]).replace('","','",\n"'));return e=e.join(o.separator),c=new r.LogItem(e,h,n,o.logLevel,o)}function formatTimestamp(n){return[pad(n.getHours(),2,0),":",pad(n.getMinutes(),2,0),":",pad(n.getSeconds(),2,0),".",pad(n.getMilliseconds(),3,0),].join("")}var r={},e;r.LogLevel={Unknown:0,Debug:1,Info:2,Warning:3,Error:4,Critical:5,MinLevel:1,MaxLevel:5,Names:{1:"Debug",2:"Info",3:"Warning",4:"Error",5:"Critical"},GetDisplayName:function(n){return r.LogLevel.Names[n]||"Unknown"}},e="Default",r.ConsoleOutputEnabled=!1,r.AddOutput=function(n){s.add(n)},r.RemoveOutput=function(n){s.remove(n)},r.LoggerFactory=function(n,t){return new r.Logger(n,t)},r.Logger=function(n,t){this._id=registerLogger(n,t,this)},r.Logger.Defaults={filterLevel:r.LogLevel.MinLevel,console:!0,showLogName:!1,showLogLevel:!1,showDate:!1,separator:" "},r.Logger.prototype={Log:function(t,i){var h=!1,f=getLogger(this._id),c={logLevel:t},o,e;return o=i?i.length&&typeof i!="string"?[].slice.call(i):[].slice.call(arguments,1):["[no message]"],e=prepareLogItem(f.name,f.options,c,o),u[f.name]||(u[f.name]=[]),u[f.name].push(e),f.options.filterLevel<=t&&(r.ConsoleOutputEnabled&&f.options.console&&n.console&&n.console.log&&n.console.log(e.FormattedMessage),f.output.fire(e),s.fire(e),h=!0),h},Debug:function(){this.Log.call(this,r.LogLevel.Debug,arguments)},Info:function(){this.Log.call(this,r.LogLevel.Info,arguments)},Warning:function(){this.Log.call(this,r.LogLevel.Warning,arguments)},Error:function(){this.Log.call(this,r.LogLevel.Error,arguments)},Critical:function(){this.Log.call(this,r.LogLevel.Critical,arguments)},Event:function(n,t,i,u){arguments.length<4&&(u=r.Level.Debug);var o=n.target?n.target.nodeName?n.target.nodeName.toString().toLowerCase()+"#"+n.target.id:n.target.toString():null,e=n.relatedTarget?n.relatedTarget.nodeName?n.relatedTarget.nodeName.toString().toLowerCase()+"#"+n.relatedTarget.id:n.relatedTarget.toString():null,f=t?t.nodeName?t.nodeName.toString().toLowerCase()+"#"+t.id:t.toString():null;this.Log(u,n.type,"(event)",i?i:"",o?"\n   target: "+o:"",e?"\n   related: "+e:"",f?"\n   this:    "+f:"")},Name:function(){var n=getLogger(this._id);return n.name},Option:function(n,t){var i=getLogger(this._id);return i&&(arguments.length===1?t=i.options[n]:r.Logger.Defaults.hasOwnProperty(n)?i.options[n]=t:t=null),t},AddOutput:function(n){var t=getLogger(this._id);t.output.add(n)},RemoveOutput:function(n){var t=getLogger(this._id);t.output.remove(n)},Head:function(n){var t=getLogger(this._id);return r.Head(n,t.options.filterLevel,t.name)},Tail:function(n){var t=getLogger(this._id);return r.Tail(n,t.options.filterLevel,t.name)}},r.LogItem=function(n,t,i,u,f){var e,h,s,o;this.Message=n,this.Timestamp=t,this.LogLevel=u,this.LogName=i,this.FormattedTimestamp=formatTimestamp(t),f&&(e=[],f.showLogName&&(h=["[",i,"]"].join(""),e.push(h)),f.showLogLevel&&(s=["{",r.LogLevels.GetDisplayName(u),"}"].join(""),e.push(s)),f.showDate&&(o=["(",this.FormattedTimestamp,")"].join(""),e.push(o))),e.push(n),e=e.join(f.separator),this.FormattedMessage=e},r.LogItem.prototype={Message:null,FormattedMessage:null,Timestamp:null,FormattedTimestamp:null,LogLevel:null,LogName:null},r.Log=function(){o.Debug.apply(o,Array.prototype.slice.call(arguments,0))},r.LogEvent=function(n,t,i){o.Event(n,t,i,r.LogLevel.Debug)},r.LogNames=function(){var t=[],n;for(n in u)t.push(n);return t},r.DefaultLogName=function(){return e},r.Head=function(n,t,i){return fetchLogItems(i,t,n,!0,0)},r.Tail=function(n,t,i){return fetchLogItems(i,t,n,!1,0)};var f=[],u={},s=t.Callbacks("unique"),o=new r.Logger(e);return r}(window,jQuery),Mediasite.namespace("Debug"),Mediasite.Debug.Repo=function(){var n={},t={};return n.Put=function(n,i){return(typeof n=="number"||typeof n=="string")&&(t[n]=i),i},n.Push=function(t,i){var r=n.Fetch(t);return $.isArray(r)||(r=r!==undefined?[r]:[]),r.push(i),n.Put(t,r)},n.Fetch=function(n){var i;return n!==null&&typeof n!="undefined"&&t.hasOwnProperty(n)&&(i=t[n]),i},n.Keys=function(){var i=[],n;for(n in t)i.push(n);return i},n}(),String.prototype.replaceholders=function(){var t=this+"",n,u,r,i;if(this&&this.length>0)for(n=0,u=arguments.length;n<u;n++)r=new RegExp("%%"+n+"%%","g"),i=arguments[n],t=t.replace(r,i);return t},String.prototype.format=function(){for(var t=this,i,n=0;n<arguments.length;n++)i=new RegExp("\\{"+n+"\\}","gi"),t=t.replace(i,arguments[n]);return t},String.prototype.unescapeJavascriptSerialized=function(){var n=this;return n=n.replace(/\\u([a-f\d]{4})/igm,function(n,t){return String.fromCharCode(parseInt(t,16))}),n=n.replace(/\\'/gm,"'"),n=n.replace(/\\"/gm,'"'),n=n.replace(/\\n/gm,"\n"),n=n.replace(/\\t/gm,"\t"),n=n.replace(/\\\\/gm,"\\")},String.prototype.formatAsHtml=function(){var n=this;return n=n.replace(/</gm,"&lt;"),n=n.replace(/>/gm,"&gt;"),n=n.replace(/[\r\n|\n|\r]/gm,"<br />"),n=n.replace(/\t/gm,"&nbsp;")},"lastIndexOf"in String.prototype||(String.prototype.lastIndexOf=function(n,t){var r=this,i;for(t=t===undefined?r.length-1:Math.max(0,Math.min(r.length-1,t));t>=0;t--)if(i=r.indexOf(n,t),i!==-1)return i;return-1})