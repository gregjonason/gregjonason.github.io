/*! LAB.js (LABjs :: Loading And Blocking JavaScript)
    v2.0.3 (c) Kyle Simpson
    MIT License
*/
(function(n){function is_func(n){return Object.prototype.toString.call(n)=="[object Function]"}function is_array(n){return Object.prototype.toString.call(n)=="[object Array]"}function canonical_uri(n,t){var i=/^\w+\:\/\//;return/^\/\/\/?/.test(n)?n=location.protocol+n:i.test(n)||n.charAt(0)=="/"||(n=(t||"")+n),i.test(n)?n:(n.charAt(0)=="/"?c:p)+n}function merge_objs(n,t){for(var i in n)n.hasOwnProperty(i)&&(t[i]=n[i]);return t}function check_chain_group_scripts_ready(n){for(var i=!1,t=0;t<n.scripts.length;t++)n.scripts[t].ready&&n.scripts[t].exec_trigger&&(i=!0,n.scripts[t].exec_trigger(),n.scripts[t].exec_trigger=null);return i}function create_script_load_listener(n,t,i,r){n.onload=n.onreadystatechange=function(){n.readyState&&n.readyState!="complete"&&n.readyState!="loaded"||t[i]||(n.onload=n.onreadystatechange=null,r())}}function script_executed(n){n.ready=n.finished=!0;for(var t=0;t<n.finished_listeners.length;t++)n.finished_listeners[t]();n.ready_listeners=[],n.finished_listeners=[]}function request_script(n,u,e,h,l){setTimeout(function(){var a,y=u.real_src,p;if("item"in t){if(!t[0]){setTimeout(arguments.callee,25);return}t=t[0]}if(a=document.createElement("script"),u.type&&(a.type=u.type),u.charset&&(a.charset=u.charset),l)if(f){
/*!START_DEBUG*/
n[i]&&r("start script preload: "+y);
/*!END_DEBUG*/
e.elem=a,s?(a.preload=!0,a.onpreload=h):a.onreadystatechange=function(){a.readyState=="loaded"&&h()},a.src=y}else if(l&&y.indexOf(c)==0&&n[v]){p=new XMLHttpRequest;
/*!START_DEBUG*/
n[i]&&r("start script preload (xhr): "+y);
/*!END_DEBUG*/
p.onreadystatechange=function(){p.readyState==4&&(p.onreadystatechange=function(){},e.text=p.responseText+"\n//@ sourceURL="+y,h())},p.open("GET",y),p.send()}else{
/*!START_DEBUG*/
n[i]&&r("start script preload (cache): "+y);
/*!END_DEBUG*/
a.type="text/cache-script",create_script_load_listener(a,e,"ready",function(){t.removeChild(a),h()}),a.src=y,t.insertBefore(a,t.firstChild)}else if(o){
/*!START_DEBUG*/
n[i]&&r("start script load (ordered async): "+y);
/*!END_DEBUG*/
a.async=!1,create_script_load_listener(a,e,"finished",h),a.src=y,t.insertBefore(a,t.firstChild)}else{
/*!START_DEBUG*/
n[i]&&r("start script load: "+y);
/*!END_DEBUG*/
create_script_load_listener(a,e,"finished",h),a.src=y,t.insertBefore(a,t.firstChild)}},0)}function create_sandbox(){function execute_preloaded_script(n,i,r){function preload_execute_finished(){u!=null&&(u=null,script_executed(r))}var u;c[i.src].finished||(n[e]||(c[i.src].finished=!0),u=r.elem||document.createElement("script"),i.type&&(u.type=i.type),i.charset&&(u.charset=i.charset),create_script_load_listener(u,r,"finished",preload_execute_finished),r.elem?r.elem=null:r.text?(u.onload=u.onreadystatechange=null,u.text=r.text):u.src=i.real_src,t.insertBefore(u,t.firstChild),r.text&&preload_execute_finished())}function do_script(n,t,i,r){var u,f,s=function(){t.ready_cb(t,function(){execute_preloaded_script(n,t,u)})},o=function(){t.finished_cb(t,i)};t.src=canonical_uri(t.src,n[y]),t.real_src=t.src+(n[l]?(/\?.*$/.test(t.src)?"&_":"?_")+~~(Math.random()*1e9)+"=":""),c[t.src]||(c[t.src]={items:[],finished:!1}),f=c[t.src].items,n[e]||f.length==0?(u=f[f.length]={ready:!1,finished:!1,ready_listeners:[s],finished_listeners:[o]},request_script(n,t,u,r?function(){u.ready=!0;for(var n=0;n<u.ready_listeners.length;n++)u.ready_listeners[n]();u.ready_listeners=[]}:function(){script_executed(u)},r)):(u=f[0],u.finished?o():u.finished_listeners.push(o))}function create_chain(){function chain_script_ready(n,t){
/*!START_DEBUG*/
e[i]&&r("script preload finished: "+n.real_src);
/*!END_DEBUG*/
n.ready=!0,n.exec_trigger=t,advance_exec_cursor()}function chain_script_executed(n,t){
/*!START_DEBUG*/
e[i]&&r("script execution finished: "+n.real_src);
/*!END_DEBUG*/
n.ready=n.finished=!0,n.exec_trigger=null;for(var u=0;u<t.scripts.length;u++)if(!t.scripts[u].finished)return;t.finished=!0,advance_exec_cursor()}function advance_exec_cursor(){while(f<n.length){if(is_func(n[f])){
/*!START_DEBUG*/
e[i]&&r("$LAB.wait() executing: "+n[f]);
/*!END_DEBUG*/
try{n[f++]()}catch(u){e[w](u);
/*!START_DEBUG*/
e[i]&&h("$LAB.wait() error caught: ",u)}continue}else if(!n[f].finished){if(check_chain_group_scripts_ready(n[f]))continue;break}f++}f==n.length&&(s=!1,t=!1)}function init_script_chain_group(){t&&t.scripts||n.push(t={scripts:[],finished:!0})}var o,e=merge_objs(u,{}),n=[],f=0,s=!1,t;return o={script:function(){for(var n=0;n<arguments.length;n++)(function(n,i){var u,r;for(is_array(n)||(i=[n]),r=0;r<i.length;r++)if(init_script_chain_group(),n=i[r],is_func(n)&&(n=n()),n){if(is_array(n)){u=[].slice.call(n),u.unshift(r,1),[].splice.apply(i,u),r--;continue}typeof n=="string"&&(n={src:n}),n=merge_objs(n,{ready:!1,ready_cb:chain_script_ready,finished:!1,finished_cb:chain_script_executed}),t.finished=!1,t.scripts.push(n),do_script(e,n,t,p&&s),s=!0,e[a]&&o.wait()}})(arguments[n],arguments[n]);return o},wait:function(){if(arguments.length>0){for(var i=0;i<arguments.length;i++)n.push(arguments[i]);t=n[n.length-1]}else t=!1;return advance_exec_cursor(),o}},{script:o.script,wait:o.wait,setOptions:function(n){return merge_objs(n,e),o}}}var u={},p=f||b,s=[],c={},o;u[v]=!0,u[a]=!1,u[e]=!1,u[l]=!1;
/*!START_DEBUG*/
u[i]=!1;
/*!END_DEBUG*/
return u[y]="",u[w]=function(){},o={setGlobalDefaults:function(n){return merge_objs(n,u),o},setOptions:function(){return create_chain().setOptions.apply(null,arguments)},script:function(){return create_chain().script.apply(null,arguments)},wait:function(){return create_chain().wait.apply(null,arguments)},queueScript:function(){return s[s.length]={type:"script",args:[].slice.call(arguments)},o},queueWait:function(){return s[s.length]={type:"wait",args:[].slice.call(arguments)},o},runQueue:function(){for(var t=o,i=s.length,r=i,n;--r>=0;)n=s.shift(),t=t[n.type].apply(null,n.args);return t},noConflict:function(){return n.$LAB=k,o},sandbox:function(){return create_sandbox()}}}var k=n.$LAB,v="UseLocalXHR",a="AlwaysPreserveOrder",e="AllowDuplicates",l="CacheBust",i="Debug",y="BasePath",w="ErrorHandler",p=/^[^?#]*\//.exec(location.href)[0],c=/^\w+\:\/\/\/?[^\/]+/.exec(p)[0],t=document.head||document.getElementsByTagName("head"),d=n.opera&&Object.prototype.toString.call(n.opera)=="[object Opera]"||"MozAppearance"in document.documentElement.style,r=function(){},h=r,u=document.createElement("script"),s=typeof u.preload=="boolean",f=s||u.readyState&&u.readyState=="uninitialized",o=!f&&u.async===!0,b=!f&&!o&&!d;
/*!START_DEBUG*/
n.console&&n.console.log&&(n.console.error||(n.console.error=n.console.log),r=function(t){n.console.log(t)},h=function(t,i){n.console.error(t,i)});
/*!END_DEBUG*/
n.$LAB=create_sandbox(),function(n,t,i){document.readyState==null&&document[n]&&(document.readyState="loading",document[n](t,i=function(){document.removeEventListener(t,i,!1),document.readyState="complete"},!1))}("addEventListener","DOMContentLoaded")})(this)