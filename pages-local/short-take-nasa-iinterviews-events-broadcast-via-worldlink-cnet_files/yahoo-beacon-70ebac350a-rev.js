define(["jquery","version!fly/managers/debug","version!fly/components/base"],function(i,e){e=e.init("yahooBeacon"),i.widget("cnet.yahooBeacon",i.fly.base,{options:{yahooId:null,yahooClass:null,videoWaitDelay:300,videoMaxWait:3e4},_create:function(){this.videoMaxWaitTimer=this.options.videoMaxWait,this._super(),this._setupEvents(),this._initializeIfNoVideo()},_setupEvents:function(){var i=this.options;if(this._pageHasVideo()){if(this.videoMaxWaitTimer>0&&("undefined"==typeof $pdk||!$pdk.controller))return e.log("Waiting for PDK to init"),this.videoMaxWaitTimer-=i.videoWaitDelay,void window.setTimeout(function(){this._setupEvents()}.bind(this),i.videoWaitDelay);this._initialize()}},_pageHasVideo:function(){return i(".cnetVideoPlayer").length?!0:!1},_initializeIfNoVideo:function(){this._pageHasVideo()||this._initialize()},_initialize:function(){var i=window.utag_data;"us"==i.siteEdition&&-1!=i.siteHier.join("|").indexOf("mobile")&&("product_main"==i.pageType||"article"==i.pageType||"image_gallery"==i.pageType&&"1"==i.pageNum)?this._load():"us"!=i.siteEdition||-1==i.siteHier.join("|").indexOf("laptops")&&-1==i.siteHier.join("|").indexOf("printers")||"product_main"!=i.pageType||this._load()},_load:function(){var i=this.options.yahooId,t=this.options.yahooClass,o=document.createElement("div");o.className=t,o.setAttribute("style","display:none !important"),require(["yahooAds"],function(){e.log("Loaded yad.js"),window.yad&&(document.body.appendChild(o),window.yad(i,{element:document.querySelector("."+t)}))})}})});