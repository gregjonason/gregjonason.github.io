(function(z){
var UL=function(){return(0,z.Q)('\x3cdiv class\x3d"fyre-editor-container"\x3e\x3cdiv class\x3d"fyre-editor-editable"\x3e\x3cdiv class\x3d"fyre-roundedpanel-content"\x3e\x3c/div\x3e\x3c/div\x3e\x3cspan class\x3d"fyre-editor-spinner"\x3e\x3c/span\x3e\x3cdiv class\x3d"fyre-editor-preview"\x3e\x3c/div\x3e\x3c/div\x3e')};z.GJ=function(a,b){z.jG.call(this,a,b);this.kn=UL};z.EJ=function(a,b){z.GJ.call(this,a,b);this.lj="fyre-liveblog-editor"};
z.FJ=function(a,b){z.GJ.call(this,a,b);this.lj="fyre-livechat-editor";this.WF=!1};z.v(z.GJ,z.jG);z.GJ.prototype.wm=["format","mention","raw","cancel","post"];z.GJ.prototype.xk="format mention media raw follow share post".split(" ");z.GJ.prototype.Xt="format mention media raw share post".split(" ");z.GJ.prototype.l=function(){z.GJ.b.l.call(this);z.kG(this)};z.v(z.EJ,z.GJ);z.EJ.prototype.xk="format mention raw media follow share post".split(" ");z.v(z.FJ,z.GJ);z.FJ.prototype.xk=["format","mention","raw","share","post"];z.FJ.prototype.l=function(){z.FJ.b.l.call(this);this.q().e(this.X,z.TG.HA,this.mR);if(!this.ZF){var a=this.H.j,b=a.TT;z.wg&&(b=a.UT);this.X.rg(this.Nm,b,!0)}};z.FJ.prototype.mR=function(){this.ZF||this.WF||(this.X.rg(this.Nm,null,!0),this.WF=!0)};})(fyre.conv);