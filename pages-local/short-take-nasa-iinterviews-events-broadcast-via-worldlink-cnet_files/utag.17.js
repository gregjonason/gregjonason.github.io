//tealium universal tag - utag.17 ut4.0.201509172051, Copyright 2015 Tealium.com Inc. All Rights Reserved.
if(typeof utag.ut=="undefined"){utag.ut={};}
utag.ut.libloader2=function(o,a,b,c,l){a=document;b=a.createElement('script');b.language='javascript';b.type='text/javascript';b.src=o.src;if(o.id){b.id=o.id};if(typeof o.cb=='function'){b.hFlag=0;b.onreadystatechange=function(){if((this.readyState=='complete'||this.readyState=='loaded')&&!b.hFlag){b.hFlag=1;o.cb()}};b.onload=function(){if(!b.hFlag){b.hFlag=1;o.cb()}}}
l=o.loc||'head';c=a.getElementsByTagName(l)[0];if(c){if(l=='script'){c.parentNode.insertBefore(b,c);}else{c.appendChild(b)}
utag.DB("Attach to "+l+": "+o.src)}}
try{(function(id,loader,u){u=utag.o[loader].sender[id]={};u.ev={'view':1};u.data={};u.data.ef_userid="4083";u.data.ef_event_type="pageview";u.data.ef_segment="";u.data.ef_search_segment="";u.data.ef_pixel_host="pixel.everesttech.net",u.data.ef_fb_is_app=0;u.data.ef_allow_3rd_party_pixels=1;u.data.ev_={};u.base_url="//www.everestjs.net/static/st.js";u.base_url_trans="//www.everestjs.net/static/st.v2.js";u.map={};u.extend=[];u.send=function(a,b){if(u.ev[a]||typeof u.ev.all!="undefined"){var c,d,e,f;c=[];for(d in utag.loader.GV(u.map)){if(typeof b[d]!="undefined"&&b[d]!=""){e=u.map[d].split(",");for(f=0;f<e.length;f++){if(e[f].indexOf("ev_")==0){u.data.ev_[e[f]]=b[d];}else{u.data[e[f]]=b[d];}}}}
u.amo_callback=function(){window.ef_event_type=u.data.ef_event_type;window.ef_userid=u.data.ef_userid;window.ef_segment=u.data.ef_segment;window.ef_search_segment=u.data.ef_search_segment;window.ef_pixel_host=u.data.ef_pixel_host;window.ef_fb_is_app=u.data.ef_fb_is_app;window.ef_allow_3rd_party_pixels=u.data.ef_allow_3rd_party_pixels;for(d in u.data.ev_){c.push(d+"="+u.data.ev_[d]);}
if(u.data.ef_event_type=="pageview"){window.ef_pageview_properties=((u.data.ef_pageview_properties)?u.data.ef_pageview_properties+"&":"")+c.join("&");}else if(u.data.ef_event_type=="transaction"){u.data.ev_.ev_transid=u.data.ev_.ev_transid||b._corder||"";c.push("ev_transid="+u.data.ev_.ev_transid);window.ef_transaction_properties=((u.data.ef_transaction_properties)?u.data.ef_transaction_properties+"&":"")+c.join("&");}else{window.ef_impression_properties=((u.data.ef_impression_properties)?u.data.ef_impression_properties+"&":"")+c.join("&");}
effp();}
if(u.data.ef_event_type=="transaction"){u.base_url=u.base_url_trans;}
utag.ut.libloader2({src:u.base_url,cb:u.amo_callback});}}
utag.o[loader].loader.LOAD(id);})('17','cbsi.cnetglobalsite');}catch(e){}
