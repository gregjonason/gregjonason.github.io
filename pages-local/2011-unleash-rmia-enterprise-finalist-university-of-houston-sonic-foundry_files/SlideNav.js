if(!Mediasite)var Mediasite={};Mediasite.Player||(Mediasite.Player={}),Mediasite.Player.SlideNav=function(n,t){function setLogicalScrollPosition(n){i.setLogicalScrollPosition(n),updateSlides()}function updateScrollPosition(){var u=0,n,i,t,e;r!=null&&r.length>0&&(n=getCurrentSlideIndex(),u=n,n<0?u=0:n<r.length-1&&(i=r[n].getFirstSlide().Time,t=n+1<r.length?r[n+1].getFirstSlide().Time:o,t-i>0&&(e=h*o,u+=(e-i)/(t-i)))),f.stop(),setLogicalScrollPosition(u)}function getCurrentSlideIndex(){var u,t,n,i;if(!r||r.length<1)return-1;for(u=h*o+tt,t=r.length,n=0;n<t;n++)if(i=r[n].getFirstSlide(),i.Time>u)return n-1;return t-1}function updateSlides(){var t=u.width()||u.parent().width(),n;t<=0||u.height()<=0||(i.setElementWidth(t),n=i.calculate(),removeInactiveElements(n),addActiveElements(n),updateThumbStates(),f.css(getThumbContainerScrollCssMap(n.getScrollOffset())),firePositionChanged(n))}function firePositionChanged(n){var t={getSlides:getBoundingSlideIndexes.bind(this,n)};u.trigger($.Event("scroll",t))}function getBoundingSlideIndexes(n){var i={},r=getVisibleThumbElements(n),t;return r.length&&(t=r.map(function(n,t){return Mediasite.Player.SlideThumb.instanceFor(t)}),t.sort(function(n,t){return n.getSlideIndex()-t.getSlideIndex()}),i.first=t[0].getSlideIndex(),i.last=t[t.length-1].getSlideIndex()),i}function getThumbContainerScrollCssMap(n){var i,t,r;if(areTransformsAvailable()){for(i={},t=0;t<ot.length;t++)r=ot[t],i[r+"transform-origin"]="top left",i[r+"transform"]="translate3d("+n+"px, 0, 0)";return i}return{left:n}}function areTransformsAvailable(){return Mediasite.Player.Support.csstransforms3d}function updateThumbStates(){for(var l=getCurrentSlideIndex(),v=i.getThumbWidth()+i.getHorizontalMargin(),a=i.getLogicalScrollPosition(),c=getLivingThumbElements(),n,f,o,e,s,t=0,h=c.length;t<h;t++)n=Mediasite.Player.SlideThumb.instanceFor(c[t]),f=n.getLogicalIndex(),n.setHasSelection(l==f),o=r[f],e=Mediasite.Player.SlideThumb.StackVisibility,o.getIsExpanded()?n.setStackState(e.Expanded):o.getIsExpandable()?n.setStackState(e.Visible):n.setStackState(e.Hidden),s=(f-a)*v,n.setPerspectiveFactor(s/(u.width()/2))}function removeInactiveElements(n){getLivingThumbElements().each(function(){var i=$(this),t=Mediasite.Player.SlideThumb.instanceFor(i).getLogicalIndex();(t<n.getMinIndex()||t>n.getMaxIndex())&&releaseThumbInstance(i)})}function getLivingThumbElements(){return $(".alive",f)}function getVisibleThumbElements(n){var t=0-n.getScrollOffset(),r=i.getElementWidth()+t,e=i.getThumbWidth()+i.getHorizontalMargin(),f=getLivingThumbElements();return f.filter(function(i){var s=this,i=Mediasite.Player.SlideThumb.instanceFor(s).getLogicalIndex(),u=n.getThumbLeft(i),f=u+e;return ft?t<f&&u<r:t<=u&&f<=r})}function releaseThumbInstance(n){n=n,logic=Mediasite.Player.SlideThumb.instanceFor(n),logic.resetStates(),logic.setSource(undefined),logic.setCaption(undefined),logic.setLogicalIndex(-1),logic.setSlideIndex(-1),n.removeClass("alive").addClass("dead")}function addActiveElements(n){var s=1e9,o=s,h=-s,c=getLivingThumbElements(),u,a,l,t,e,i,f;for(c.size()>0&&(u=[],c.each(function(){u.push(Mediasite.Player.SlideThumb.instanceFor(this))}),u.sort(function(n,t){return n.getLogicalIndex()-t.getLogicalIndex()}),o=u[0].getLogicalIndex(),h=u[u.length-1].getLogicalIndex()),a=1.5,l=null,t=n.getMinIndex();t<=n.getMaxIndex();t++)e=r[t].getFirstSlide(),t>=o&&t<=h?i=u[t-o]:(i=createSlideThumb(),i.setLogicalIndex(t),i.getElement().css("left",n.getThumbLeft(t))),i.setSlideIndex(e.Number),i.setToolTip(e.Text),i.setCaption(e.Caption),f=getImageUrl(e.Number),f&&f.resolve||(f=$.Deferred().resolve(f)),f.done(function(n,t){n.getSource()!=t&&n.setSource(t)}.bind(this,i))}function getImageUrl(n){return wt(n,getImageWidth(),getImageHeight())}function getImageWidth(){return Math.round(nt*lt)}function getImageHeight(){return getThumbHeight()}function getThumbWidth(){return Math.floor(i.getThumbWidth())}function getThumbHeight(){return Math.floor(nt)}function createSlideThumb(){var n=resurrectSlideThumb();return n||(n=new Mediasite.Player.SlideThumb(getThumbWidth(),getThumbHeight()),n.getElement().bind({"thumb-mousedown.slideNav":thumb_mousedown,"thumb-mouseup.slideNav":thumb_mouseup,"thumb-begindrag.slideNav":thumb_begindrag,"thumb-drag.slideNav":thumb_drag,"thumb-enddrag.slideNav":thumb_enddrag,"thumb-click.slideNav":thumb_click,"thumb-stackexpand":thumb_stackexpand,"thumb-stackcollapse":thumb_stackcollapse,mouseenter:thumb_mouseenter,mouseleave:thumb_mouseleave}),n.getElement().addClass("alive").appendTo(f)),n}function resurrectSlideThumb(){var t=jQuery(".dead",f),n;return t.size()>0?(n=t.first().removeClass("dead").addClass("alive"),Mediasite.Player.SlideThumb.instanceFor(n)):null}function isPositionUpdateEnabled(){return!e&&+new Date>s.getTime()}function expandCollapseSlide(n,t){try{r[n].setIsExpanded(t)}catch(i){}}function thumb_mousedown(){var i,t;f.stop(),g=!1,s!=l&&(i=s.getTime()-p,+new Date<i&&(g=!0)),t=Mediasite.Player.SlideThumb.instanceFor($(this)),c=t}function thumb_mouseup(){var t=Mediasite.Player.SlideThumb.instanceFor($(this));t&&c&&c.getLogicalIndex()!=t.getLogicalIndex()&&c.forceReleaseMouse(),c=t}function thumb_begindrag(){it=i.getLogicalScrollPosition(),e=!0,v=0,a=l}function thumb_drag(n,t){var h=t.delta/(i.getThumbWidth()+i.getHorizontalMargin()),e=new Date,u,s,f,o;a==l?(b=t.delta,a=e):(u=(e.getTime()-a.getTime())/1e3,u>.001&&(s=t.delta-b,f=Math.min(u*10,1),v=v*(1-f)+s/u*f,b=t.delta,a=e)),o=Math.max(Math.min(it-h,r.length),0),setLogicalScrollPosition(o)}function thumb_enddrag(){var c=i.getLogicalScrollPosition(),t=-v/(i.getThumbWidth()+i.getHorizontalMargin());t=Math.min(Math.max(t,-et),et);var h=new Mediasite.Player.InertialInterpolator(c,0,r.length,t,yt),u=h.getCalculatedDuration()*1e3,o=1e3;f.css({"fake-css-style":0}),f.animate({"fake-css-style":o},{duration:u,easing:"linear",step:function(n){var i=n/o,t=h.interpolate(i);setLogicalScrollPosition(t)}}),e=!1,s=new Date(+new Date+u+p)}function thumb_click(){if(!g){var w=$(this),b=Mediasite.Player.SlideThumb.instanceFor(w),t=b.getLogicalIndex();if(!(t<0)&&!(t>=r.length)){var y=1e3,v=i.getLogicalScrollPosition(),k=t-v;if(f.css({"fake-css-rule":0}),f.animate({"fake-css-rule":y},{duration:.5*1e3,easing:"swing",step:function(n){var i=n/y,t=v+k*i;setLogicalScrollPosition(t)}}),at)s=new Date(+new Date+p);else{e=!0;var u=r[t].getFirstSlide().Time,c=o,a=c>0?Math.min(Math.max((u+tt)/c,0),1):0;h=a,onSeek(u,a,u),e=!1,s=l}}}}function thumb_stackexpand(n,t){expandCollapseSlide(t.logicalIndex,!0)}function thumb_stackcollapse(n,t){expandCollapseSlide(t.logicalIndex,!1)}function thumb_mouseenter(n){d.registerMouseEnter(Mediasite.Player.SlideThumb.instanceFor($(n.currentTarget))),isPositionUpdateEnabled()||(e=!0)}function thumb_mouseleave(){isPositionUpdateEnabled()||(e=!1,s=new Date(+new Date+st))}function previewEngine_beginPreview(n,t){var u,o,i,f;if(t&&t.thumb){if(u=t.thumb.getLogicalIndex(),u>=r.length||u<0){onPreviewSlideChanged(null);return}(o=r[u],o)&&(i=$(t.thumb.getElement()),f=i.offset(),ut=new Mediasite.Geometry.Rect(f.left,f.top,i.width(),i.height()),k=o.getFirstSlide(),onBeginPreview(),e=!0)}}function previewEngine_endPreview(){k=null,onEndPreview()}function onBeginPreview(){u.trigger("beginPreview")}function onEndPreview(){u.trigger("endPreview")}function onSeek(n,t,i){u.trigger("seek",{position:n,normalizedPosition:t,slideNumber:i})}var u=$(n),r=[],kt=[],o=0,h=0,bt=[],lt=4/3,vt=16/9,nt=u.height(),rt=Math.floor(nt*vt),ct=.17,ht=Math.round(rt*ct),it=0,e=!1,v=0,l=new Date(0,0,1),a=l,b=0,yt=9,et=16,s=l,p=3.5*1e3,st=3.5*1e3,g=!1,at=!1,tt=.0005,wt=t,ot=["-webkit-","-moz-","-o-","-ms-"],pt=Mediasite.BrowserDetect.IOS(),d=new Mediasite.Player.SlidePreviewEngine(u),y=!Mediasite.Player.Support.touch,k=null,ut=new Mediasite.Geometry.Rect(0,0,0,0),i,f,w,ft,c;d.setIsEnabled(y),u.bind({"previewEngine-beginPreview":previewEngine_beginPreview,"previewEngine-endPreview":previewEngine_endPreview}),i=new Mediasite.Player.SlideNavLayoutCalculator,i.setHorizontalMargin(ht),i.setLogicalScrollPosition(0),i.setThumbWidth(rt),i.setSlideCount(0),f=$("<div />").css({width:"10px",height:"100%",position:"absolute",top:"0px"}),u.append(f),updateSlides(),$(window).resize(function(){updateSlides()}),pt?u.addClass("ios"):u.addClass("not-ios"),w=$.browser,w.msie&&u.addClass("ie"+w.majorVersion),this.getElement=function(){return u},this.getSlides=function(){return r},this.setSlides=function(n){r=n,i.setSlideCount(r.length),updateSlides()},this.getLogicalScrollPosition=function(){return i.getLogicalScrollPosition()},this.getDuration=function(){return o},this.setDuration=function(n){h=h*o/n||0,o=n},this.getNormalizedPosition=function(){return h},this.setNormalizedPosition=function(n){h=n,isPositionUpdateEnabled()?updateScrollPosition():updateSlides()},this.setUpdateDisableDelays=function(n,t){typeof n!="undefined"&&(p=n),typeof t!="undefined"&&(st=t)},this.getIsSlidePreviewEnabled=function(){return y},this.setIsSlidePreviewEnabled=function(n){y=n&&!_isTouchDevice,d.setIsEnabled(y)},this.getPreviewSlide=function(){return k},this.getPreviewThumbArea=function(){return ut},this.getSlideThumbElement=function(n){var u,t=$.map(getLivingThumbElements(),function(n){return Mediasite.Player.SlideThumb.instanceFor(n)}),i,f,r;if(t.sort(function(n,t){return n.getSlideIndex()-t.getSlideIndex()}),t.length&&t[0].getSlideIndex()<=n)for(i=0,f=t.length;i<f;i++)if(r=t[i],r.getSlideIndex()==n){u=r.getElement();break}else if(r.getSlideIndex()>n){u=t[i-1].getElement();break}return u},ft=!1,c=null},Mediasite.Player.InertialInterpolator=function(n,t,i,r,u){var f=r,h=t,s=i,c=n,e=f>0?-u:u,a=(0-f*f)/(2*e),l=Math.max(Math.min(n+a,s),h),o=0-f/e;this.getCalculatedDuration=function(){return o},this.getCalculatedTarget=function(){return l},this.interpolate=function(n){var r=n*o,t=f+e*r,i=(t*t-f*f)/(2*e);return Math.max(Math.min(c+i,s),h)}},Mediasite.Player.SlideNavLayoutCalculator=function(){var i=600,u=0,n=95,t=10,r=0;this.getElementWidth=function(){return i},this.setElementWidth=function(n){i=n},this.getSlideCount=function(){return u},this.setSlideCount=function(n){u=n},this.getThumbWidth=function(){return n},this.setThumbWidth=function(t){n=t},this.getHorizontalMargin=function(){return t},this.setHorizontalMargin=function(n){t=n},this.getLogicalScrollPosition=function(){return r},this.setLogicalScrollPosition=function(n){r=n},this.calculate=function(){var f;if(i<=0)return new Mediasite.Player.SlideNavLayout(0,0,0,0);f=Math.ceil(i/(n+t)),f=f+2-f%2;var e=Math.floor(r),o=e+1-f/2,c=Math.max(o-Math.ceil(f*(1/3)),0),l=Math.min(o+Math.ceil(f*(5/3))-1,u-1),s=r-e,a=Math.max(0,e-1),h=(i-n)/2-e*(n+t)-(n+t)*s;return new Mediasite.Player.SlideNavLayout(c,l,h,n+t)}},Mediasite.Player.SlideNavLayout=function(n,t,i,r){this.getMinIndex=function(){return n},this.getMaxIndex=function(){return t},this.getScrollOffset=function(){return i},this.getThumbLeft=function(n){return n*r}},Mediasite.Player.SlideThumb=function(n,t){function imgbox_mouseup(n){handleMouseUp(n.pageX,u.MouseOver)}function imgbox_mousedown(n){f=r.MouseDown,handleMouseDown(n),captureMouse(),updateMouseVisualState(u.Pressed)}function imgbox_mouseenter(){updateMouseVisualState(u.MouseOver)}function imgbox_mouseleave(){updateMouseVisualState(u.Normal)}function document_mouseup(n){handleMouseUp(n.pageX,u.Normal)}function document_mousemove(n){element_mousemove(n)}function element_mousemove(n){if(f===r.InDrag)OnThumbDrag(n.pageX-s.x);else if(f===r.MouseDown||f===r.MouseDownOnStack){var i=n.pageX-s.x,t=n.pageY-s.y;(Math.abs(i)>rt||Math.abs(t)>rt)&&(f=r.InDrag,OnThumbBeginDrag())}}function stack_mouseup(n){handleMouseUp(n.pageX,u.MouseOverStack)}function stack_mousedown(n){canDragStack()&&(f=r.MouseDownOnStack,handleMouseDown(n),captureMouse(),updateMouseVisualState(u.StackPressed))}function stack_mouseenter(){updateMouseVisualState(u.MouseOverStack)}function stack_mouseleave(){updateMouseVisualState(u.Normal)}function handleMouseUp(n,t){if(i.trigger("thumb-mouseup"),releaseMouseCapture(),f!==r.Inactive){if(f===r.MouseDown&&OnThumbClick(),f===r.MouseDownOnStack&&(e===Mediasite.Player.SlideThumb.StackVisibility.Visible?OnStackExpand():e===Mediasite.Player.SlideThumb.StackVisibility.Expanded&&OnStackCollapse()),f===r.InDrag){var u=n-s.x;OnThumbDrag(u),OnThumbEndDrag(),f=r.Inactive}f=r.Inactive,updateMouseVisualState(t)}}function handleMouseDown(n){s.x=n.pageX,s.y=n.pageY,OnThumbMouseDown()}function canDragStack(){var n=Mediasite.Player.SlideThumb.StackVisibility;return e===n.Visible||e===n.Expanded}function setStackTooltip(n){var i=Mediasite.Player.SlideThumb.StackVisibility,t="";n===i.Visible?t=Mediasite.Player.Localization.SlideNav.ExpandStack:n===i.Expanded&&(t=Mediasite.Player.Localization.SlideNav.CollapseStack),a.attr("title",t)}function updateStackPerspective(){var t,i,n;if(et){if(t=e===Mediasite.Player.SlideThumb.StackVisibility.Visible||e===Mediasite.Player.SlideThumb.StackVisibility.Expanded,i=o.length>0,i&&!t){destroyStackFrames();return}for(!i&&t&&makeStackFrames(),n=0;n<o.length;n++)o[n].css("margin-left",(n+1)*-p*12+"%")}}function makeStackFrames(){o=[],o.push(makeStackFrame(1)),o.push(makeStackFrame(2)),o.push(makeStackFrame(3))}function destroyStackFrames(){o=[],a.empty()}function makeStackFrame(n){return $('<div class="player-slide-stack-frame" ></div>').addClass("stack-frame-"+n).appendTo(a)}function toSelectionClass(n){return"selection-"+n.name}function toStackClass(n){return"stackState-"+n}function toMouseClass(n){return"mouse-"+n}function getAllVisualStateCssClassNames(){var n=Mediasite.Player.SlideThumb.StackVisibility;return[toMouseClass(u.Normal),toMouseClass(u.MouseOver),toMouseClass(u.MouseOverStack),toMouseClass(u.Pressed),toMouseClass(u.StackPressed),toStackClass(n.Hidden),toStackClass(n.Visible),toStackClass(n.Expanded),toSelectionClass(c.Unselected),toSelectionClass(c.Selected)].join(" ")}function updateMouseVisualState(n){k!=n&&(k=n,updateVisualState())}function updateSelectionVisualState(n){b!=n&&(b=n,updateVisualState())}function updateStackVisualState(n){e!=n&&(e=n,updateVisualState())}function updateVisualState(){var n=[toMouseClass(k),toStackClass(e),toSelectionClass(b)];i.removeClass(getAllVisualStateCssClassNames()),i.addClass(n.join(" "))}function captureMouse(){$(document).bind({"mousemove.slideThumbCapture":document_mousemove,"mouseup.slideThumbCapture":document_mouseup})}function releaseMouseCapture(){$(document).unbind(".slideThumbCapture")}function OnThumbMouseDown(){i.trigger("thumb-mousedown")}function OnThumbBeginDrag(){i.trigger("thumb-begindrag")}function OnThumbDrag(n){i.trigger("thumb-drag",{delta:n})}function OnThumbEndDrag(){i.trigger("thumb-enddrag")}function OnThumbClick(){i.trigger("thumb-click")}function OnStackExpand(){i.trigger("thumb-stackexpand",{logicalIndex:y})}function OnStackCollapse(){i.trigger("thumb-stackcollapse",{logicalIndex:y})}var r={Inactive:"Inactive",MouseDown:"MouseDown",MouseDownOnStack:"MouseDownOnStack",InDrag:"InDrag"},u={Normal:"Normal",MouseOver:"MouseOver",Pressed:"Pressed",MouseOverStack:"MouseOverStack",StackPressed:"StackPressed"},c={Unselected:{name:"Unselected",scale:1,frameOpacity:.5},Selected:{name:"Selected",scale:1.1,frameOpacity:1}},i,w,l,v,tt,a,o=[],d=n,it=t,y=-1,nt=-1,ut=!1,s={x:0,y:0},rt=3,f=r.Inactive,k=u.Normal,b=c.Unselected,ht=1,st=d/it,ot=4/3,g=100*ot/st,e=Mediasite.Player.SlideThumb.StackVisibility.Hidden,p=0,ct=Mediasite.BrowserDetect.IOS(),ft=Mediasite.Player.Support.touch,et=!ft&&Mediasite.Player.Support.csstransforms3d,h;i=$('<div class="player-slide-thumb" ></div>').width(d).height(it).css({position:"absolute","fake-css-rule":"0px"}),i.data(Mediasite.Player.SlideThumb.instanceDataKey,this),w=$('<div class="player-slide-thumb-inner"></div>').appendTo(i),a=$('<div class="player-slide-thumb-stack"></div>').appendTo(w),makeStackFrames(),l=$('<div class="player-slide-thumb-img-box" ></div>').appendTo(w),v=$("<img />").css({position:"absolute","z-index":"1",width:g+"%",height:"100%",left:(100-g)/2+"%","fake-css-rule":"0px","-moz-user-focus":"ignore","-moz-user-select":"none","-khtml-user-focus":"ignore","-khtml-user-select":"none"}).bind("dragstart",function(n){n.preventDefault()}),l.append(v),tt=$('<div class="player-slide-thumb-img-frame" ></div>').css({width:"100%",height:"100%"}),tt.appendTo(l),i.bind({mousemove:element_mousemove}),l.bind({mouseup:imgbox_mouseup,mousedown:imgbox_mousedown,mouseenter:imgbox_mouseenter,mouseleave:imgbox_mouseleave}),a.bind({mouseup:stack_mouseup,mousedown:stack_mousedown,mouseenter:stack_mouseenter,mouseleave:stack_mouseleave}),updateVisualState(0),this.getElement=function(){return i},this.getLogicalIndex=function(){return y},this.setLogicalIndex=function(n){y=n},this.getSlideIndex=function(){return nt},this.setSlideIndex=function(n){nt=n},this.getToolTip=function(){return i.attr("title")},this.setToolTip=function(n){i.attr("title",n)},this.getLeft=function(){return i.css("left")},this.setLeft=function(n){i.css("left",n)},this.getSource=function(){return v.attr("src")},this.setSource=function(n){n||(n="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"),v.attr("src",n)},this.getCaption=function(){return h&&h.text()},this.setCaption=function(n){n&&!h&&(h=$('<div class="player-slide-thumb-caption"></div>').appendTo(i)),h&&h.html(n)},this.getHasSelection=function(){return ut},this.setHasSelection=function(n){ut=n,updateSelectionVisualState(n?c.Selected:c.Unselected)},this.getStackState=function(){return e},this.setStackState=function(n){updateStackVisualState(n),updateStackPerspective(),setStackTooltip(e)},this.getPerspectiveFactor=function(){return p},this.setPerspectiveFactor=function(n){p=n,updateStackPerspective()},this.resetStates=function(){},this.forceReleaseMouse=function(){releaseMouseCapture(),f===r.InDrag&&OnThumbEndDrag(),f=r.Inactive,updateVisualState(0)}},Mediasite.Player.SlideThumb.GetNextZIndex=function(){var n=(Mediasite.Player.SlideThumb.LastZIndex||0)+1;return Mediasite.Player.SlideThumb.LastZIndex=n,1},Mediasite.Player.SlideThumb.instanceDataKey="slideThumb",Mediasite.Player.SlideThumb.instanceFor=function(n){return $(n).data(Mediasite.Player.SlideThumb.instanceDataKey)},Mediasite.Player.SlideThumb.StackVisibility={Hidden:"Hidden",Visible:"Visible",Expanded:"Expanded"},Mediasite.Player.SlidePreviewControl=function(n,t){function init(){y=$("<div />").addClass("background-mask").appendTo(u),i=$("<div />").addClass("preview-area").appendTo(u),c=$("<img />").appendTo(i),$("<div />").addClass("contentFramer").appendTo(i),o=$("<div />").addClass("text-overlay").appendTo(i),a=$("<h1 />").appendTo(o),f=$("<p />").appendTo(o)}function updateSlidePreview(){var n,t;if(!r){hideSlidePreview();return}showSlidePreview(),n=v.GetCacheFriendlySlideUrl(r.Number,i.height(),e),n&&n.resolve||(n=$.Deferred().resolve(n)),n.done(function(n){c.attr("src",n)}),a.text(r.Text),r.Description?(f.html(r.Description.replace(/\n/g,"<br />")),f.show()):f.hide(),t=i.offset(),s=new Mediasite.Geometry.Rect(t.left,t.top,i.width(),i.height()),l=n,raiseEvent("slidePreviewInitiated")}function showSlidePreview(){u.fadeIn(250,"linear")}function hideSlidePreview(){u.fadeOut(250,"linear")}function raiseEvent(n){u.trigger(n)}function FakeUrlProvider(){this.GetCacheFriendlySlideUrl=function(){return""}}var u=$(n),v=t||new FakeUrlProvider,y,i,o,c,a,f,r=null,l="",s=new Mediasite.Geometry.Rect(0,0,0,0),h=!0,e=4/3;this.getElement=function(){return u},this.setSlideUrlProvider=function(n){v=n},this.getPreviewSlide=function(){return r},this.setPreviewSlide=function(n){n!==r&&(r=n,updateSlidePreview())},this.getPreviewSrc=function(){return l},this.getPreviewArea=function(){return s},this.getIsSlidePreviewEnabled=function(){return h},this.setIsSlidePreviewEnabled=function(n){h=n},this.getSlideAspect=function(){return e},this.setSlideAspect=function(n){e=n},init()},Mediasite.Player.SlidePreviewSubject=function(n,t,i,r){function init(){f.bind("mousemove",container_mousemove),u.getElement().bind({mouseenter:thumb_mouseenter,mouseleave:thumb_mouseleave})}function lingerTimer_tick(){u&&u.getElement().trigger("mouseLinger")}function mouseLeaveTimer_tick(){u&&u.getElement().trigger("delayedMouseLeave")}function container_mousemove(){stopLingerTimer(),startLingerTimer()}function thumb_mouseenter(){u&&(stopMouseLeaveTimer(),startLingerTimer())}function thumb_mouseleave(){stopLingerTimer(),startMouseLeaveTimer()}function startLingerTimer(){e=window.setTimeout(lingerTimer_tick,h)}function stopLingerTimer(){window.clearTimeout(e)}function startMouseLeaveTimer(){o=window.setTimeout(mouseLeaveTimer_tick,s)}function stopMouseLeaveTimer(){window.clearTimeout(o)}var u=n,f=$(t),h=i,s=r,e,o;this.getThumb=function(){return u},this.reportMouseEnter=function(){startLingerTimer()},this.die=function(){f.unbind("mousemove",container_mousemove),u.getElement().unbind("mouseenter",thumb_mouseenter),u.getElement().unbind("mouseleave",thumb_mouseleave),stopLingerTimer(),stopMouseLeaveTimer(),f=null,u=null},init()},Mediasite.Player.SlidePreviewEngine=function(n){function subject_mouseLinger(){i&&f&&t&&(r=!0,f=!1,onBeginPreview(t.getThumb()))}function subject_delayedMouseLeave(){t&&(t.die(),t=null),exitPreviewMode()}function exitPreviewMode(){r&&(e=+new Date,r=!1,onEndPreview())}function allowQuickPreview(){var n=e+s;return r||n>+new Date}function getLingerDuration(){return allowQuickPreview()?o:h}function onBeginPreview(n){u.trigger("previewEngine-beginPreview",{thumb:n})}function onEndPreview(){u.trigger("previewEngine-endPreview")}var h=1.5*1e3,o=.3*1e3,s=3.5*1e3,c=.5*1e3,u=$(n),i=!0,r=!1,f=!1,e=0,t;this.getIsEnabled=function(){return i},this.setIsEnabled=function(n){n!==i&&(i=n,i&&t!=null?t.reportMouseEnter():i||exitPreviewMode())},this.registerMouseEnter=function(n){t&&(t.die(),t=null),f=!0,t=new Mediasite.Player.SlidePreviewSubject(n,u,getLingerDuration(),c),t.getThumb().getElement().bind({mouseLinger:subject_mouseLinger,delayedMouseLeave:subject_delayedMouseLeave}),t.reportMouseEnter()}},Mediasite.Player.SlidePreviewAnimation=function(n){function opacityAnimationComplete(){t.css({display:"none",opacity:0})}var u=$(n),t,i,r;t=$("<div />").addClass("slidePreviewAnimation").css({position:"absolute",top:0,left:0,display:"none","z-index":9999}).appendTo(u),i=$("<div />").css({position:"absolute",outline:"2px solid white",overflow:"hidden",background:"black"}).appendTo(t),r=$("<img />").css({display:"block",height:"100%"}).appendTo(i),this.animate=function(n,u,f){n&&n.resolve||(n=$.Deferred().resolve(n)),n.done(function(n){r.attr("src",n)}),t.css({display:"block",opacity:1}),i.css({width:u.width()+"px",height:u.height()+"px",left:u.left()+"px",top:u.top()+"px"}),i.animate({width:f.width()+"px",height:f.height()+"px",left:f.left()+"px",top:f.top()+"px"},400,"linear"),t.animate({opacity:0},290,"linear",opacityAnimationComplete)}},Mediasite.Player.SlideItem=function(n,t){function onExpandItem(){u&&u(e)}function onCollapseItem(){f&&f(e)}var e=this,s=n,o=t,r=1,i=1,u,f;this.getFirstSlide=function(){return s[o]},this.getIndex=function(){return o},this.getCount=function(){return i},this.setCount=function(n){i=n},this.getRange=function(){return r},this.setRange=function(n){r=n},this.getIsExpandable=function(){return r>1&&i>1},this.getIsCollapsible=function(){return r>1&&i==1},this.getIsExpanded=function(){return this.getIsCollapsible()},this.setIsExpanded=function(n){n&&this.getIsExpandable()?onExpandItem():this.getIsCollapsible()&&onCollapseItem()},this.setExpandItemDelegate=function(n){u=n},this.setCollapseItemDelegate=function(n){f=n}},Mediasite.Player.SlidePartitions=function(n,t,i){function init(){o=t||Mediasite.Player.SlidePartitions.MaxItemsPerPage,_stackingParams=i||Mediasite.Player.SlidePartitions.DefaultStackingParams,updateSlides(n),updateCurrentPage(0)}function updateSlides(n){u=n,updateStackedSlides(),updateCurrentPage(f)}function updateStackedSlides(){var t,h,s,c,i,o,e,f;if(u&&typeof u.length=="number"&&u.length>0)if(_stackingParams&&u.length>_stackingParams.minimumToTrigger)for(t=r[r.length-1],t||(t=new Mediasite.Player.SlideItem(u,0),r.push(t)),e=t.getIndex(),h=t.getFirstSlide().Time,i=e+1;i<u.length;i++)s=u[i].Time,c=i+1===u.length?Infinity:u[i+1].Time,s-h>_stackingParams.threshold||c-s>_stackingParams.threshold||t.getRange()>=_stackingParams.maxItems?(t=new Mediasite.Player.SlideItem(u,i),r.push(t)):(t.getIsExpandable()||(t.setExpandItemDelegate(expandItem),t.setCollapseItemDelegate(collapseItem)),t.setRange(t.getRange()+1),t.setCount(t.getCount()+1)),h=u[i].Time;else for(o=r[r.length-1],e=o?o.getIndex()+1:0,f=e;f<u.length;f++)r.push(new Mediasite.Player.SlideItem(u,f))}function onCurrentPageChanged(){e.trigger("currentpagechanged")}function expandItem(n){var e,t,i;if(n.getIsExpandable()){for(e=jQuery.inArray(n,r),t=1;t<n.getCount();t++)i=new Mediasite.Player.SlideItem(u,n.getIndex()+t),r.splice(e+t,0,i);n.setCount(1),updateCurrentPage(f)}}function collapseItem(n){if(n.getIsExpanded){for(var i=jQuery.inArray(n,r),t=i+n.getRange()-1;t>i;t--)r.splice(t,1);n.setCount(n.getRange()),updateCurrentPage(f)}}function updateCurrentPage(n){var e=Math.min(o,r.length);s=Math.ceil(r.length/o),f=Math.min(n,s-1);for(var u=e*f,c=Math.min(u+e,r.length),i=[],t=u;t<c;t++)i.push(r[t]);h=i,onCurrentPageChanged()}var u=[],r=[],h=[],o=1e9,f=0,s=1,e=$("<div></div>");this.updateSlides=function(n){updateSlides(n)},this.getPageIndex=function(){return f},this.setPageIndex=function(n){if(n<0||n>=s)throw"setPageIndex was passed an out of range value: "+n;updateCurrentPage(n)},this.getItemsPerPage=function(){return o},this.setItemsPerPage=function(n){o=n,updateCurrentPage(f)},this.getPageCount=function(){return s},this.getCurrentPageItems=function(){return h},this.bind=function(){e.bind.apply(e,arguments)},this.unbind=function(){e.unbind.apply(e,arguments)},init()},Mediasite.Player.SlidePartitions.MaxItemsPerPage=Math.pow(2,32)-1,Mediasite.Player.SlidePartitions.DefaultStackingParams={threshold:2e3,minimumToTrigger:25,maxItems:10},Mediasite.DocumentMouseCapture=function(){this.captureMouse=function(){},this.releaseMouse=function(){}},Mediasite.IMouseCapturer=function(){this.onMouseMove=function(){},this.onMouseDown=function(){},this.onMouseUp=function(){}}