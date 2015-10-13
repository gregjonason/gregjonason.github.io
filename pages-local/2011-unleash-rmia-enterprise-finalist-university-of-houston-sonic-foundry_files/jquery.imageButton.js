if(!Mediasite)var Mediasite={};Mediasite.ImageButton=function(n,t){function init(){r=u.stateCalculator,c=u.strategy,h=u.normalPosition,s=u.normalImage,b=u.normalTitle,y=u.checkedPosition,a=u.checkedImage,w=u.checkedTitle,v=u.spriteOffset,l=u.isCheckButton,o=u.isChecked,p=i.getCursor(),i.bind({"mouseenter.imageButton":f.MouseEnter,"mouseleave.imageButton":f.MouseLeave,"mousedown.imageButton":f.MouseDown,"mouseup.imageButton":f.MouseUp,"touchstart.imageButton":f.TouchStart,"touchend.imageButton":f.TouchEnd,"touchcancel.imageButton":f.TouchCancel,"click.imageButton":f.Click}),r.setIsDisabled(i.getIsDisabled()),updateState()}function updateState(){var n=r.calculate(),o=useCheckedCss()?y:h,l=useCheckedCss()?a:s,p=c.calculateBackgroundPosition(n,o,v),e=c.calculateBackgroundImage(n,l),t=n==Mediasite.ImageButton.ButtonState.Disabled,f=t?"default":"pointer",u=useCheckedCss()?w:b;i.setIsDisabled(t),i.setCursor(f),i.setTitle(u),i.setBackground(p,e)}function useCheckedCss(){return l&&o}function onCheckChanged(n){i.trigger("checkchanged",{isChecked:n})}var f=this,i=Mediasite.ImageButton.AdaptButtonElement(n),u=$.extend({stateCalculator:new Mediasite.ImageButton.ButtonStateCalculator,strategy:new Mediasite.ImageButton.SpriteStrategy,normalPosition:i.getBackgroundPosition(),normalImage:i.getBackgroundImage(),normalTitle:i.getTitle(),checkedPosition:i.getBackgroundPosition(),checkedImage:i.getBackgroundImage(),checkedTitle:i.getTitle(),spriteOffset:i.getSize().width,isCheckButton:!1,isChecked:!1},t),k=i.getBackgroundImage(),r,c,e,l,o,h,s,b,y,a,w,v,p;this.getIsCheckButton=function(){return l},this.setIsCheckButton=function(n){l=n},this.getIsChecked=function(){return o},this.setIsChecked=function(n){n!==o&&(o=n,updateState(),onCheckChanged(o))},this.getIsDisabled=function(){return r.getIsDisabled()},this.getNormalPosition=function(){return h},this.setNormalPosition=function(n){h=n},this.getNormalImage=function(){return s},this.setNormalImage=function(n){s=n},this.getCheckedPosition=function(){return y},this.setCheckedPosition=function(n){y=n},this.getCheckedImage=function(){return a},this.setCheckedImage=function(n){a=n},this.getSpriteOffset=function(){return v},this.setSpriteOffset=function(n){v=n},this.getStateCalculator=function(){return r},this.setStateCalculator=function(n){r=n},this.getStrategy=function(){return c},this.setStrategy=function(n){c=n},this.destroy=function(){i.revert(),i.unbind(".imageButton"),i.setBackground(h,s),i.setCursor(p),delete i},this.MouseEnter=function(){e||(r.setIsHovered(!0),updateState())},this.MouseLeave=function(){e||(r.setIsPressed(!1),r.setIsHovered(!1),updateState())},this.MouseDown=function(){e||(r.setIsPressed(!0),updateState())},this.MouseUp=function(){if(e){e=!1;return}r.setIsPressed(!1),updateState()},this.TouchStart=function(){e=!0,r.setIsPressed(!0),updateState()},this.TouchEnd=function(){r.setIsPressed(!1),updateState()},this.TouchCancel=function(){f.TouchEnd()},this.Disable=function(){r.setIsDisabled(!0),updateState()},this.Enable=function(){r.setIsDisabled(!1),updateState()},this.Click=function(){l&&!r.getIsDisabled()&&(f.setIsChecked(f.getIsChecked()^!0),updateState())},init()},Mediasite.ImageButton.AdaptButtonElement=function(n){if(n.getBackgroundPosition)return n;var t=n.tagName||n.get(0).tagName;return t=="DIV"||t=="SPAN"?new Mediasite.ImageButton.FancyButtonAdapter(n):new Mediasite.ImageButton.BasicButtonAdapter(n)},Mediasite.ImageButton.BasicButtonAdapter=function(n){this._element=$(n)},Mediasite.ImageButton.BasicButtonAdapter.prototype={revert:function(){},bind:function(n){this._element.bind(n)},unbind:function(n){this._element.unbind(n)},trigger:function(){this._element.trigger.apply(this._element,arguments)},getBackgroundPosition:function(){return this._getElementBackgroundPosition(this._element)},getBackgroundImage:function(){return this._getElementBackgroundImage(this._element)},setBackground:function(n,t){this._element.css("backgroundPosition",n),this._element.css("backgroundImage",t)},getSize:function(){return{width:this._element.width(),height:this._element.height()}},getIsDisabled:function(){return this._element.prop("disabled")||!1},setIsDisabled:function(n){this._element.prop("disabled",n)},getCursor:function(){return this._element.css("cursor")||""},setCursor:function(n){this._element.css("cursor",n)},getTitle:function(){return this._element.attr("title")},setTitle:function(n){this._element.attr("title",n)},_element:null,_getElementBackgroundPosition:function(n){var t=n.css("backgroundPosition");return t||(t=new Mediasite.Css.BackgroundPosition(Mediasite.Css.Length.parse(n.css("background-position-x")),Mediasite.Css.Length.parse(n.css("background-position-y"))).toString()),t},_getElementBackgroundImage:function(n){return n.css("backgroundImage")||""}},Mediasite.ImageButton.FancyButtonAdapter=function(){Mediasite.ImageButton.BasicButtonAdapter.apply(this,arguments),this._divs=[this._makeImageDiv(1,1),this._makeImageDiv(2,0)],this._initialPosition=Mediasite.ImageButton.BasicButtonAdapter.prototype.getBackgroundPosition.call(this),this._initialImage=Mediasite.ImageButton.BasicButtonAdapter.prototype.getBackgroundImage.call(this),this._currentDivIndex=0,this._setBackgroundCss(this._getCurrentDiv(),this._initialPosition,this._initialImage),this._changeOpacity(this._getCurrentDiv(),"1.0","0ms"),this._changeOpacity(this._getOtherDiv(),"0.0","0ms"),this._element.css("background","transparent")},Mediasite.ImageButton.FancyButtonAdapter.prototype=$.extend({},new Mediasite.ImageButton.BasicButtonAdapter,{revert:function(){Mediasite.ImageButton.BasicButtonAdapter.prototype.setBackground.call(this,this._initialPosition,this._initialImage),this._divs[0].remove(),this._divs[1].remove()},getBackgroundPosition:function(){return this._getElementBackgroundPosition(this._getCurrentDiv())},getBackgroundImage:function(){return this._getElementBackgroundImage(this._getCurrentDiv())},setBackground:function(n,t){this._currentDivIndex^=1,this._setBackgroundCss(this._getCurrentDiv(),n,t),this._changeOpacity(this._getCurrentDiv(),"1.0",this._transitionDuration),this._changeOpacity(this._getOtherDiv(),"0.0",this._transitionDuration)},_divs:null,_currentDivIndex:0,_transitionDuration:150,_initialPosition:null,_initialImage:null,_setBackgroundCss:function(n,t,i){n.css({backgroundPosition:t,backgroundImage:i})},_changeOpacity:function(n,t,i){var r=["-moz-","-ms-","-o-","-webkit-",""],u=$.extend(this._expandCssPropertyWithPrefixes("transition-property","opacity",r),this._expandCssPropertyWithPrefixes("transition-duration",i+"ms",r),this._expandCssPropertyWithPrefixes("transition-timing-function","linear",r));u.opacity=t,n.css(u)},_expandCssPropertyWithPrefixes:function(n,t,i){for(var u={},r=0;r<i.length;r++)u[i[r]+n]=t;return u},_getCurrentDiv:function(){return this._divs[this._currentDivIndex]},_getOtherDiv:function(){return this._divs[this._currentDivIndex^1]},_makeImageDiv:function(n,t){return $("<div></div>").css({width:"100%",height:"100%",position:"absolute",top:0,left:0,"z-index":n,opacity:t}).appendTo(this._element)}}),Mediasite.ImageButton.SpriteStrategy=function(){this.calculateBackgroundPosition=function(n,t,i){var r,e,f,u;return Mediasite.ImageButton.ButtonState.isDefined(n)?(r=Mediasite.Css.BackgroundPosition.parse(t),e=r.getLeft().getUnit()=="px"||r.getLeft().getQuantity()==0,!e)?t:(f=r.getLeft().getQuantity()-i*n,u=new Mediasite.Css.BackgroundPosition(new Mediasite.Css.Length(f,"px"),r.getTop()),u.toString()):t},this.calculateBackgroundImage=function(n,t){return t}},Mediasite.ImageButton.MultiFileStrategy=function(){function makeUrl(n,i){var r,f,u;return typeof n!="string"?n:(r=n.match(t),r==null||r.length!=3)?n:(f=r[1],u=r[2],f+"."+i+u)}var n={},t;n[Mediasite.ImageButton.ButtonState.Hovered]="hovered",n[Mediasite.ImageButton.ButtonState.Pressed]="pressed",n[Mediasite.ImageButton.ButtonState.Disabled]="disabled",this.calculateBackgroundPosition=function(n,t){return t},this.calculateBackgroundImage=function(t,i){return n[t]?makeUrl(i,n[t]):i},t=/(^\s*url\(['"]?.+)(\.\w+(?:[\?#].*)?['"]?\)\s*$)/i},Mediasite.ImageButton.ButtonStateCalculator=function(){var i=!1,t=!1,n=!1;this.getIsHovered=function(){return i},this.setIsHovered=function(n){i=n},this.getIsPressed=function(){return t},this.setIsPressed=function(n){t=n},this.getIsDisabled=function(){return n},this.setIsDisabled=function(t){n=t},this.calculate=function(){return n?Mediasite.ImageButton.ButtonState.Disabled:t?Mediasite.ImageButton.ButtonState.Pressed:i?Mediasite.ImageButton.ButtonState.Hovered:Mediasite.ImageButton.ButtonState.Normal}},Mediasite.ImageButton.ButtonState={Normal:0,Hovered:1,Pressed:2,Disabled:3,isDefined:function(n){return typeof n=="number"&&n>=this.Normal&&n<=this.Disabled}},function(){function selectStrategy(n){return t[n.toLowerCase()]}function destroyButton(n){var t=n.data("imageButton");t&&(t.destroy(),n.removeData("imageButton"),delete t)}function performActionOnImageButtons(n,t){return n.each(function(){var i=$(this),n=i.data("imageButton");n&&t(i,n)})}var n={init:function(n){var t=$.extend({mode:"sprite"},n);return t.strategy=selectStrategy(t.mode),t.mode=undefined,this.each(function(){var n=$(this),i;destroyButton(n),i=new Mediasite.ImageButton(n,t),n.data("imageButton",i)})},destroy:function(){return this.each(function(){var n=$(this);destroyButton(n)})},disable:function(){performActionOnImageButtons(this,function(n,t){t.Disable()})},enable:function(){performActionOnImageButtons(this,function(n,t){t.Enable()})},getIsDisabled:function(){var t=this.first(),n=t.data("imageButton");if(n)return n.getIsDisabled()},getIsChecked:function(){var t=this.first(),n=t.data("imageButton");if(n)return n.getIsChecked()},setIsChecked:function(n){return performActionOnImageButtons(this,function(t,i){i.setIsChecked(n)})}},t={sprite:new Mediasite.ImageButton.SpriteStrategy,multifile:new Mediasite.ImageButton.MultiFileStrategy};$.fn.imageButton=function(t){if(n[t])return n[t].apply(this,Array.prototype.slice.call(arguments,1));if(typeof t!="object"&&t)$.error("Method "+t+" does not exist on jQuery.imageButton");else return n.init.apply(this,arguments)}}()