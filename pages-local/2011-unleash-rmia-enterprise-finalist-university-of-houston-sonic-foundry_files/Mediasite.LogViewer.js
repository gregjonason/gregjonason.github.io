Mediasite||(Mediasite={}),Mediasite.namespace("LogViewer"),function(n,t){function createViewer(){var w,c,it,et,d,ut,rt,b,ft,k,tt,i,n;r.container=t("<div></div>").appendTo("body").attr("id",u),r.toggleButton=t('<a href="javascript:void(0)" data-toggle-text="show log">hide log</a>').attr("id",u+"_"+l).appendTo("body"),r.toggleButton.click(function(){var t=r.toggleButton.text();r.toggleButton.text(r.toggleButton.data("toggle-text")),r.toggleButton.data("toggle-text",t),r.container.toggle()}),r.closeButton=t('<a href="javascript:void(0)">X</a>').attr("id",u+"_"+h).appendTo(r.container),r.closeButton.click(function(){f.Destroy()}),r.tools=t("<div></div>").attr("id",u+"_"+o).appendTo(r.container),r.filterTools=t("<fieldset></fieldset>").appendTo(r.tools),t("<legend></legend>").appendTo(r.filterTools).text("Filtering"),r.selectFilterLevel=t("<select></select>").appendTo(r.filterTools),t("<option></option>").appendTo(r.selectFilterLevel).val("").text("Minimum log level"),w=s.LogLevel.Names;for(c in w)it=w[c],et=t("<option></option>").appendTo(r.selectFilterLevel).text(it).val(c),c==v&&et.attr("selected",!0);r.selectFilterLevel.change(function(){v=r.selectFilterLevel.val(),f.Update()}),r.selectFilterLog=t("<select></select>").appendTo(r.filterTools),t("<option></option>").appendTo(r.selectFilterLog).val("").text("All logs"),d=s.LogNames();for(ut in d)rt=d[ut],addFilterableLog(rt);r.selectFilterLog.change(function(){p=r.selectFilterLog.val(),f.Update()}),r.positionTools=t("<fieldset></fieldset>").appendTo(r.tools),t("<legend></legend>").appendTo(r.positionTools).text("Position"),r.positionVertical=t("<select></select>").appendTo(r.positionTools).attr("id",u+"_"+nt).change(function(){updatePosition(r.positionVertical.val(),null)}),t("<option></option>").appendTo(r.positionVertical).val("Top").text("Vertical");for(b in y)ft=t("<option></option>").appendTo(r.positionVertical).text(y[b]),y[b]==e.vertical&&ft.attr("selected",!0);r.positionHorizontal=t("<select></select>").appendTo(r.positionTools).attr("id",u+"_"+g).change(function(){updatePosition(null,r.positionHorizontal.val())}),t("<option></option>").appendTo(r.positionHorizontal).val("Right").text("Horizontal");for(k in a)tt=t("<option></option>").appendTo(r.positionHorizontal).text(a[k]),a[k]==e.horizontal&&tt.attr("selected",!0);r.logContainer=t("<table><thead></thead><tbody></tbody></table>").appendTo(r.container),r.header=t("<tr></tr>").appendTo("thead",r.logContainer),t("<th></th>").text("Message").attr("id",u+"_MessageItem").appendTo(r.header),t("<th></th>").text("Info").attr("id",u+"_InfoItem").appendTo(r.header),r.log=t("tbody",r.logContainer),i="12px",n={},n["#"+u+"_"+l]={position:"absolute","z-index":999999,top:"2em",right:"4em",border:".1em white solid","-moz-border-radius":".5em","border-radius":".5em",background:"black",padding:".5em","font-weight":"bold","font-size":i,color:"white","text-decoration":"none"},n["#"+u+"_"+l+"."+u+"_TopRight"]={top:"2em",right:"4em",bottom:"auto",left:"auto"},n["#"+u+"_"+l+"."+u+"_BottomRight"]={top:"auto",right:"4em",bottom:"2em",left:"auto"},n["#"+u+"_"+l+"."+u+"_BottomLeft"]={top:"auto",right:"auto",bottom:"2em",left:"4em"},n["#"+u+"_"+l+"."+u+"_TopLeft"]={top:"2em",right:"auto",bottom:"auto",left:"4em"},n["#"+u+"_"+h]={position:"absolute","z-index":999999,top:".2em",right:".2em",border:".1em white solid","-moz-border-radius":".5em","border-radius":".5em",background:"black",padding:".5em","font-weight":"bold","font-size":i,color:"white","text-decoration":"none"},n["#"+u+"."+u+"_TopRight #"+u+"_"+h]={top:".2em",right:".2em",bottom:"auto",left:"auto"},n["#"+u+"."+u+"_BottomRight #"+u+"_"+h]={top:"auto",right:".2em",bottom:".2em",left:"auto"},n["#"+u+"."+u+"_BottomLeft  #"+u+"_"+h]={top:"auto",right:"auto",bottom:".2em",left:".2em"},n["#"+u+"."+u+"_TopLeft #"+u+"_"+h]={top:".2em",right:"auto",bottom:"auto",left:".2em"},n["#"+u]={display:"none",position:"absolute",top:"1em",right:"1em","z-index":999998,"font-size":i,"box-sizing":"border-box",width:"50%",height:"50%",border:".2em gray solid","-moz-border-radius":".5em","border-radius":".5em",padding:"1em",overflow:"auto",background:"black; background: rgba(0, 0, 0, .6)",color:"rgb(255,255,255)"},n["#"+u+"."+u+"_TopRight"]={top:"1em",right:"1em",bottom:"auto",left:"auto"},n["#"+u+"."+u+"_BottomRight"]={top:"auto",right:"1em",bottom:"1em",left:"auto"},n["#"+u+"."+u+"_BottomLeft"]={top:"auto",right:"auto",bottom:"1em",left:"1em"},n["#"+u+"."+u+"_TopLeft"]={top:"1em",right:"auto",bottom:"auto",left:"1em"},n["#"+u+" table"]={clear:"both","table-layout":"fixed"},n["#"+u+" table th"]={"border-bottom":"1px gray solid",padding:".2em .5em","text-align":"left","font-weight":"bold"},n["#"+u+" table th#"+u+"_MessageItem"]={width:"65%"},n["#"+u+" table th#"+u+"_InfoItem"]={width:"30%"},n["#"+u+" table td"]={"border-top":"1px gray solid",padding:".2em .5em","text-align":"left","font-weight":"normal"},n["#"+u+" table tbody tr:first-child td"]={"border-top":"none"},n["#"+u+" #"+u+"_"+o]={padding:"1em 1em 2em"},n["#"+u+"."+u+"_BottomLeft #"+u+"_"+o]={"padding-left":"2em"},n["#"+u+"."+u+"_BottomRight #"+u+"_"+o]={"padding-left":"2em"},n["#"+u+" div#"+u+"_"+o+" fieldset"]={float:"left",width:"30%"},n["#"+u+" div#"+u+"_"+o+" legend"]={display:"block","text-align":"center","font-size":"1.2em","font-weight":"bold",padding:"0 0 0.5em 0"},n["#"+u+" div#"+u+"_"+o+" button"]={display:"block","margin-bottom":"1em","box-sizing":"border-box",width:"90%",border:"1px white solid","-moz-border-radius":".5em","border-radius":".5em",background:"black",padding:".5em",color:"white"},n["#"+u+" div#"+u+"_"+o+" select"]={display:"block",width:"90%"},createStylesheet(n)}function createStylesheet(n){var f,i,r,e,u;if(document.createStyleSheet){f=document.createStyleSheet();for(r in n)u=getStylesheetProperties(n,r),f.addRule(r,u)}else{i=[];for(r in n)e=[],u=getStylesheetProperties(n,r),i.push(r),i.push("{"),i.push(u),i.push("}");i=i.join("\n"),t('<style type="text/css"></style>').text(i).appendTo("html > head")}}function getStylesheetProperties(n,t){var f=n[t],i=[],r,u;for(r in f)u=f[r],i.push(r),i.push(":"),i.push(u),i.push(";");return i=i.join("")}function attachToLogging(){s.AddOutput(handleLogItem)}function detachFromLogging(){s.RemoveOutput(handleLogItem)}function updateLog(){var n,t,i;r.log.empty(),n=s.Tail(0,v,p);for(t in n)n.hasOwnProperty(t)&&(i=n[t],handleLogItem(i))}function addFilterableLog(n){(c=c||{},c[n])||(r.logName=t("<option></option>").appendTo(r.selectFilterLog).text(n).val(n),c[n]=!0)}function handleLogItem(n){if((addFilterableLog(n.LogName),!v||!(n.LogLevel<v))&&(!p||n.LogName==p)){r.logRow=t("<tr></tr>").appendTo(r.log);var u=prepareMessage(n.Message),i=[n.FormattedTimestamp,s.LogLevel.GetDisplayName(n.LogLevel),n.LogName].join(", ");t("<td></td>").html(u).appendTo(r.logRow),t("<td></td>").text(i).appendTo(r.logRow)}}function prepareMessage(n){return n=n.replace(k,"<br>"),n=n.replace(d,"&nbsp;")}function updatePosition(n,t){var u,i;(t||n)&&(u=getPositionClass(),r.container.removeClass(u),r.toggleButton.removeClass(u),e.vertical=n||e.vertical||y.top,e.horizontal=t||e.horizontal||a.right,i=getPositionClass(),r.container.addClass(i),r.toggleButton.addClass(i))}function getPositionClass(){return[u,"_",e.vertical,e.horizontal].join("")}var f=n.Mediasite.LogViewer,u="MediasiteLogViewer",w=u,s=Mediasite.Logging,b=!1,c,k,d;f.Load=function(){return r.container instanceof t&&r.container.length||(createViewer(),attachToLogging()),r.toggleButton.add(r.container).fadeIn(),f.Update(),b=!0,Mediasite.Player.Support.localstorage&&localStorage.setItem(w,+new Date),!0},f.Update=function(){updateLog()},f.Destroy=function(){detachFromLogging(),c=null,r.toggleButton.add(r.container).fadeOut(250,function(){for(var n in r)r[n]&&(r[n].remove(),r[n]=null)}),b=!1,Mediasite.Player.Support.localstorage&&localStorage.removeItem(w)},f.Loaded=function(){return b};var r={toggleButton:null,container:null,closeButton:null,logContainer:null,log:null,tools:null,selectFilterLog:null},l="Toggle",o="Tools",h="Close",v=s.LogLevel.MinLevel,p="",g="PositionHorizontal",nt="PositionVertical",y={top:"Top",bottom:"Bottom"},a={left:"Left",right:"Right"},e={horizontal:a.right,vertical:y.top};c={},k=/\n/g,d=/\s{2}/g,t(function(){if(Mediasite.Player.Support.localstorage){var n=localStorage.getItem(w);if(!n)return;n=new Date(parseInt(n)),n>new Date-18e5&&setTimeout(f.Load,2e3)}})}(this,jQuery)