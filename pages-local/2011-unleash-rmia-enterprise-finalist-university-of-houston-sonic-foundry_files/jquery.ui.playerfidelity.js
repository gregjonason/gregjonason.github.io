(function(n){n.widget("ui.playerfidelity",{options:{minBarHeight:4,maxBars:6,ids:{}},_setOption:function(n,t){this.options[n]=t,this._super("_setOption",n,t)},_create:function(){var t=this,n=this.options;this.element.addClass("ui-playerfidelity")},_formatBitRate:function(n){var i=1e3,r=i*1e3,t;return n>=r?(t=Math.floor(n/r),Mediasite.Player.Localization.MediaPlayer.BitrateMbpsFormat.replaceholders(t)):(t=n/i,t=Math.floor(t*1e3)/1e3,Mediasite.Player.Localization.MediaPlayer.BitrateKbpsFormat.replaceholders(t))},update:function(n){var r=this,t,i;this.element&&this.element.length&&(t=this._enforceBarCountBounds(n.tracks.length),i=this._enforceBarCountBounds(n.currentTrackIndex+1),this._updateChart(t,i),this._updateTooltip(n.currentTrack.bitrate))},_enforceBarCountBounds:function(n){return Math.max(0,Math.min(n,this.options.maxBars))},_updateTooltip:function(n){var t=this._getToolTip(n);this.element.attr("title",t)},_getToolTip:function(n){return Mediasite.Player.Localization.MediaPlayer.MediaFidelityToolTipFormat.replaceholders(this._formatBitRate(n))},_updateChart:function(t,i){var y=this,u,r,s,c,e,f;if(this.element.empty(),!(t<1)){var h=t<3?3:2,l=this._calculatePadding(t,h),o=this._calculateBarHeights(t,this.options.minBarHeight),v=this.element.height(),a=i-1;for(u=0;u<o.length;u++)r=n("<div></div>"),r.addClass("ui-playerfidelity-bar"),r.css("height",o[u]+"px"),s=v-Math.ceil(o[u]),r.css("margin-top",s+"px"),r.css("width",h+"px"),u>0&&r.css("margin-left",l+"px"),u<=a&&r.addClass("ui-playerfidelity-bar-highlighted"),r.appendTo(this.element);c=this.element.width(),e=0,this.element.children().each(function(t,i){e+=n(i).outerWidth(!0)}),f=Math.floor((c-e)/2),f=Math.max(0,f),this.element.children(":first-child").css("margin-left",f+"px")}},_calculateBarHeights:function(n,t){var r=[],e=this.element.height(),i,u;for(n>0&&r.push(t),i=1;i<n;i++){var f=r[i-1],s=this._calculateStep(f,n-r.length,e),o=f+s;r.push(o)}for(i=n-2;i>=0;i--)u=Math.ceil(r[i+1]/2),r[i]=r[i]<u?u:r[i];return r},_calculatePadding:function(n,t){for(var i=2;i>0&&!this._barsWillFit(n,t,i);)i--;return!this._barsWillFit(n,t,i),i},_calculateStep:function(n,t,i){var u=i-n,r=u/t;return r=Math.floor(r)},_barsWillFit:function(n,t,i){return n*(t+i)-i<=this.element.width()},destroy:function(){this.element.removeClass("ui-playerfidelity")}})})(jQuery)