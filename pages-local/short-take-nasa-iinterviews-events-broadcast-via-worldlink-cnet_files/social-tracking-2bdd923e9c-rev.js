define(["jquery","version!fly/managers/debug","managers/tealium","version!fly/components/base"],function(e,i,t){i=i.init("socialTracking"),e.widget("cnet.socialTracking",e.fly.base,{options:{socialSite:"notSet"},_create:function(){this._setup(),this._setupTracking()},_setupDwTag:function(t){i.log("Finding dwTag");for(var n="",a=e(t.target).closest("[section],[id]"),o=0;3>o;o++)a.attr("section")?n=a.attr("section")+"|"+n:a.attr("id")&&(n=a.attr("id")+"|"+n),a=a.parent().closest("[section],[id]");return n=n.slice(0,n.length-1),window.dwTag=n,i.log("Found dwTag"),n},_setupTracking:function(){i.log("Setting up social tracking");var n=this.options,a=this;e(this.$element).on("click",function(e){i.log("Social Element Clicked, Tracking Now");var o=n.socialSite,s={facebook:1,googlePlus:3,linkedin:4,pinterest:5,reddit:6,stumbleupon:7,twitter:8,email:10,delicious:12,tumblr:14},c=a._setupDwTag(e);t.trackSocial({socialService:o,event:"share",levtEventType:"share",eventt:"socialsite",socialId:s[o],wd:"sharelink",_dwLinkTag:c,sharebarSection:window.dwTag}),i.log("Social Element Tracked"),window.dwTag=null})}})});