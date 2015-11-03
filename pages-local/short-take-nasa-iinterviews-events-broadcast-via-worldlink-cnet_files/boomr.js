(function(){
    if(window.BOOMR && window.BOOMR.version){return;}

    var dom,doc,where,iframe = document.createElement('iframe');

    iframe.src = "javascript:false";
    iframe.title = ""; iframe.role="presentation";
    (iframe.frameElement || iframe).style.cssText = "width:0;height:0;border:0;display:none;";

    where = document.getElementsByTagName('script')[0];
    where.parentNode.insertBefore(iframe, where);

    try {
        doc = iframe.contentWindow.document;
    } catch(e) {
        dom = document.domain;
        iframe.src="javascript:var d=document.open();d.domain='"+dom+"';void(0);";
        doc = iframe.contentWindow.document;
    }

    doc.open()._l = function() {
        var js = this.createElement("script");
        if(dom) this.domain = dom;
        js.id = "boomr-if-as";
        js.src = '//c.go-mpulse.net/boomerang/' + '38QDY-8CT77-8XNH2-VJQTD-EK4YX';
        BOOMR_lstart=new Date().getTime();
        this.body.appendChild(js);
    };

    doc.write('<body onload="document._l();">');
    doc.close();
})();

/*! mpulse v0.0.2 */

!function(a){"use strict";function b(b,c){j||("object"==typeof XDomainRequest?(r=!0,j=function(){return new XDomainRequest}):"function"==typeof XMLHttpRequest||"object"==typeof XMLHttpRequest?j=function(){return new XMLHttpRequest}:"function"==typeof require?j=function(){var a=require("xmlhttprequest").XMLHttpRequest;return new a}:a&&"undefined"!=typeof a.ActiveXObject&&(j=function(){return new a.ActiveXObject("Microsoft.XMLHTTP")}));var d=j();"function"==typeof c&&(r?d.onload=function(){c(d.responseText)}:d.onreadystatechange=function(){4===d.readyState&&c(d.responseText)}),d.open("GET",b,!0),d.send()}function c(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(a){var b=16*Math.random()|0,c="x"===a?b:3&b|8;return c.toString(16)})}function d(d,e){function f(b){return-1!==b.indexOf("http://")||-1!==b.indexOf("https://")?b:(Q?b="https:"+b:"undefined"==typeof a?-1===b.indexOf("http:")&&(b="http:"+b):"undefined"!=typeof a&&"file:"===a.location.protocol&&-1===b.indexOf("http:")&&(b="http:"+b),b)}function g(){var a=P;return a+=-1!==a.indexOf("?")?"&":"?",a+="key="+O,a+="&acao=",f(a)}function h(){var a=R.beacon_url;return a+=-1!==a.indexOf("?")?"&":"?",a+="acao=1",f(a)}function i(a){try{var b=JSON.parse(a);for(var c in b)b.hasOwnProperty(c)&&(R[c]=b[c])}catch(d){return void(T=!1)}if($||I(R.session_id),_={},ba={},Z={},R.PageParams){var e=R.PageParams.customMetrics,f=R.PageParams.customTimers,g=R.PageParams.customDimensions;if(e)for(q=0;q<e.length;q++){var h=e[q];_[h.name]=h.label}if(f)for(q=0;q<f.length;q++){var i=f[q];ba[i.name]=i.label}if(g)for(q=0;q<g.length;q++){var m=g[q];Z[m.name]=m.label}}T=!0,S=!0,setTimeout(j,l),k(r)}function j(){if(""!==P){var a=g();S&&(a+="&r="),b(a,i)}}function n(){var a={};for(var b in Y)Y.hasOwnProperty(b)&&(a[b]=Y[b]);return a}function o(a,b,c){U.push({type:a,name:b,value:c,group:W,ab:X,dimensions:n()})}function r(a){if(0!==U.length){if(!T)return void((!V||a)&&(V=!0,setTimeout(function(){r(!0)},m)));var b=U.shift(),c=b.type,d=b.name,e=b.value,f={};"boolean"!=typeof b.group&&(f["h.pg"]=b.group),"boolean"!=typeof b.ab&&(f["h.ab"]=b.ab);for(var g in b.dimensions)b.dimensions.hasOwnProperty(g)&&"undefined"!=typeof Z[g]&&(f[Z[g]]=b.dimensions[g]);"metric"===c?"undefined"!=typeof _[d]&&(f[_[d]]=e,t(f)):"timer"===c&&"undefined"!=typeof ba[d]&&(f.t_other=ba[d]+"|"+e,t(f)),k(r)}}function t(a){a.d=R.site_domain,a["h.key"]=R["h.key"],a["h.d"]=R["h.d"],a["h.cr"]=R["h.cr"],a["h.t"]=R["h.t"],a["http.initiator"]="api",$!==!1&&(a["rt.si"]=$,a["rt.ss"]=da,a["rt.sl"]=ea),a.api=1,a.v=1,a.u="http://"+R.site_domain,a.t_done=0,N("before_beacon",a);var c=[];for(var d in a)a.hasOwnProperty(d)&&c.push(encodeURIComponent(d)+"="+(void 0===a[d]||null===a[d]?"":encodeURIComponent(a[d])));var e=h(),f=e+(e.indexOf("?")>-1?"&":"?")+c.join("&");N("beacon",a),b(f)}function u(a){return"string"!=typeof a?-1:(ca++,aa[ca]={time:s(),name:a},ca)}function v(a){if("number"!=typeof a||0>a)return-1;var b=aa[a],c=0;return b?(c=Math.round(s()-b.time),w(b.name,c),delete aa[a],c):-1}function w(a,b){return"string"!=typeof a?-1:"number"!=typeof b||0>b?-1:(b=Math.round(b),o("timer",a,b),k(r),b)}function x(a,b){"string"==typeof a&&("undefined"==typeof b||"number"==typeof b)&&("undefined"==typeof b&&(b=1),o("metric",a,b),k(r))}function y(a){"string"==typeof a&&(W=a)}function z(){return W}function A(){W=!1}function B(a){return"string"!=typeof a?!1:/^[a-zA-Z0-9_ -]{1,25}$/.test(a)===!1?!1:(X=a,!0)}function C(){return X}function D(){X=!1}function E(a,b){return"undefined"!=typeof a?"undefined"==typeof b?void F(a):void(Y[a]=b):void 0}function F(a){"undefined"!=typeof a&&"undefined"!=typeof Y[a]&&delete Y[a]}function G(a){("string"==typeof a||"number"==typeof a)&&("number"==typeof a&&(a=""+a),$=a)}function H(){return $}function I(a){return G(a||c()),K(0),H()}function J(){ea++}function K(a){"number"!=typeof a||0>a||(ea=a)}function L(){return ea}function M(a,b){fa.hasOwnProperty(a)&&"function"==typeof b&&fa[a].push(b)}function N(a,b){for(var c=0;c<fa[a].length;c++)fa[a][c](b)}e=e||{};var O=d,P="//c.go-mpulse.net/api/config.json",Q=!1,R={},S=!1,T=!1,U=[],V=!1,W=!1,X=!1,Y={},Z={},$=!1,_={},aa={},ba={},ca=-1,da=s(),ea=0,fa={};for(q=0;q<p.length;q++)fa[p[q]]=[];"undefined"!=typeof e.configUrl&&(P=e.configUrl),e.forceSSL&&(Q=!0),j();var ga={startTimer:u,stopTimer:v,sendTimer:w,sendMetric:x,setPageGroup:y,getPageGroup:z,resetPageGroup:A,setABTest:B,getABTest:C,resetABTest:D,setDimension:E,resetDimension:F,setSessionID:G,getSessionID:H,startSession:I,incrementSessionLength:J,setSessionLength:K,getSessionLength:L,subscribe:M,parseConfig:i};return ga}function e(){return w.mPulse=x,v}function f(a,b){if(b=b||{},"undefined"!=typeof b.name&&"undefined"!=typeof z[b.name])return z[b.name];var c=d(a,b);if(y===!1){y=c;for(var e=0;e<o.length;e++){var f=o[e];v[f]=y[f]}}return"undefined"!=typeof b.name&&(z[b.name]=c),c}function g(a){return z[a]}function h(){}function i(a){"undefined"!=typeof z[a]&&delete z[a]}var j,k,l=3e5,m=5e3,n="0.0.1",o=["startTimer","stopTimer","sendTimer","sendMetric","setPageGroup","getPageGroup","resetPageGroup","setABTest","getABTest","resetABTest","setDimension","resetDimension","setSessionID","getSessionID","startSession","incrementSessionLength","setSessionLength","getSessionLength","subscribe"],p=["before_beacon","beacon"],q=0,r=!1,s=!1,t=+new Date;if(k="undefined"!=typeof process&&"function"==typeof process.nextTick?process.nextTick.bind(process):"undefined"!=typeof a?a.setImmediate?a.setImmediate.bind(a):a.msSetImmediate?a.msSetImmediate.bind(a):a.webkitSetImmediate?a.webkitSetImmediate.bind(a):a.mozSetImmediate?a.mozSetImmediate.bind(a):function(a){setTimeout(a,10)}:function(a){setTimeout(a,10)},"undefined"!=typeof a)if("undefined"!=typeof a.performance&&"function"==typeof a.performance.now)s=a.performance.now.bind(a.performance);else if("undefined"!=typeof a.performance){var u=["webkitNow","msNow","mozNow"];for(q=0;q<u.length;q++)if("function"==typeof a.performance[u[q]]){s=a.performance[u[q]];break}}s||("undefined"!=typeof a&&a.performance&&a.performance.timing&&a.performance.timing.navigationStart&&(t=a.performance.timing.navigationStart),s="undefined"!=typeof Date&&Date.now?function(){return Date.now()-t}:function(){return+new Date-t});var v,w,x,y=!1,z={};for("undefined"!=typeof a&&(w=a,x=w.mPulse),v={version:n,noConflict:e,init:f,getApp:g,stop:i},q=0;q<o.length;q++)v[o[q]]=h;"function"==typeof define&&define.amd?define([],function(){return v}):"undefined"!=typeof module&&module.exports?module.exports=v:"undefined"!=typeof w&&(w.mPulse=v)}("undefined"!=typeof window?window:void 0);

(function(){
    try {
        window.mPulseApp = mPulse.init("38QDY-8CT77-8XNH2-VJQTD-EK4YX");
    } catch(e) {}
})();

mPulseApp.previousFullyLoadedTimer = null;
mPulseApp.fullyLoadedTimer = setInterval(function() {
    try{
        var myTimer = performance.getEntriesByType('resource')[performance.getEntriesByType('resource').length - 1];
        if(mPulseApp.previousFullyLoadedTimer === myTimer) {
            mPulseApp.setSessionID(BOOMR.session.ID);
            mPulseApp.setPageGroup(CnetPageVars.tracking.data.soastaPageType);
            mPulseApp.setABTest(CnetPageVars.tracking.data.soastaBucket);
            if(myTimer !== undefined) {
                mPulseApp.sendTimer("page_full_load", myTimer.responseEnd);
            }
            clearInterval(mPulseApp.fullyLoadedTimer);
        }
        mPulseApp.previousFullyLoadedTimer = myTimer;
    } catch(e) {
        clearInterval(mPulseApp.fullyLoadedTimer);
    }
}, 4000);

document['addEventListener']?document['addEventListener']('DOMContentLoaded',mPulseApp.fullyLoadedTimer):window.attachEvent('onload',mPulseApp.fullyLoadedTimer);
