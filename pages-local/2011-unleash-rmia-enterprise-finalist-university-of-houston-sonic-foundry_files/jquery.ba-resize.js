/*!
* jQuery throttle / debounce - v1.1 - 3/7/2010
* http://benalman.com/projects/jquery-throttle-debounce-plugin/
* 
* Copyright (c) 2010 "Cowboy" Ben Alman
* Dual licensed under the MIT and GPL licenses.
* http://benalman.com/about/license/
*/
(function(n,t){"$:nomunge";var i=n.jQuery||n.Cowboy||(n.Cowboy={}),r;i.throttle=r=function(n,r,u,f){function wrapper(){function exec(){o=+new Date,u.apply(h,s)}function clear(){e=t}var h=this,i=+new Date-o,s=arguments;f&&!e&&exec(),e&&clearTimeout(e),f===t&&i>n?exec():r!==!0&&(e=setTimeout(f?clear:exec,f===t?n-i:n))}var e,o=0;return typeof r!="boolean"&&(f=u,u=r,r=t),i.guid&&(wrapper.guid=u.guid=u.guid||i.guid++),wrapper},i.debounce=function(n,i,u){return u===t?r(n,i,!1):r(n,u,i!==!1)}})(this);
/*!
* Add a jQuery().resize() handler with a throttling wrapper.
*
* WARNING: This kills jQuery().unbind('resize', handler).
*/
(function(n,t){function addEventHandler(t,i,u){n.isFunction(t)&&(i=t,t=null);var f={callback:i,eventData:t,target:u};return r.push(f),r.length}function callEventHandlers(n){var i,f,u;if(Mediasite.Logging.LogEvent(n),n.target===t||n.target===t.document)for(i=0,f=r.length;i<f;i++)u=r[i],n.data=u.eventData,u.callback.apply(this,arguments)}var u=100;/iphone|ipod|ipad/i.exec(navigator.userAgent)&&/OS 4_/.exec(navigator.userAgent)&&(u=300);var r=[],e=n.throttle(u,callEventHandlers),f=n.fn.resize;n.fn.resize=function(i,r){var u=addEventHandler(i,r,this);return u==1&&f.call(n(t),e),this}})(jQuery,this)