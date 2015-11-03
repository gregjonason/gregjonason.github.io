function OnNewsreleaseLoad(){
    var imgs = document.getElementsByTagName('IMG');
    var imgHeight = 0;
    var imgWidth = 0;
    var divs = document.getElementsByTagName('DIV');
	var carimages = $('img.logo').length;
	 // Commented below for loop as we are not using 'dvPrettyImage' div  (prettyphoto)
	/*   for (var i = 0; i < imgs.length; i++) {
        var imgItem = imgs[i];
        if (imgItem.getAttribute('rel') == "newsImage") {
			
			//Condition to scale the images and center align
			var imageIndex = imgItem.id.substring(imgItem.id.indexOf("_")-(-1));
			var imgDiv = document.getElementById("dvPrettyImage_"+imageIndex);
			//Center aligning image to container
			if(imgDiv.className == "highlightedLogo" && imgDiv.id== "dvPrettyImage_1" && carimages == 1)
			{
			var imgMaxWidth = 400;
	        var imgMaxHeight = 250;		
			}
			else
			{
			var imgMaxWidth = 175;
	        var imgMaxHeight = 175;	
			}
			if(imgItem.height > imgMaxHeight)
				imgItem.height = imgMaxHeight;
			if(imgItem.width > imgMaxWidth)
				imgItem.width = imgMaxWidth;
			if(imgDiv.className == "highlightedLogo" && imgDiv.id== "dvPrettyImage_1" && carimages == 1)
			{
			var leftMargin = (400 - imgItem.width)/2;	
			var botMargin = (250 - imgItem.height)/2;
			}
			else
			{
			var leftMargin = (176 - imgItem.width)/2;
			var botMargin = (175 - imgItem.height)/2;
			}
			imgDiv.style.marginLeft = leftMargin + "px";
			imgDiv.style.marginBottom = botMargin + "px";
			
			if(document.getElementById("imgVideo_"+imageIndex) != null)
			{
				var playIcon = document.getElementById("imgVideo_"+imageIndex);document.getElementById("imgVideo_"+imageIndex);
				playIconLeftMargin = (imgItem.width-52)/2;//52 is play icon width, 2 is image border
				playIconBottomMargin = (imgItem.height-52)/2;//52 is play icon height, 2 is image border
				playIcon.style.marginLeft = playIconLeftMargin+"px";
				playIcon.style.marginBottom = playIconBottomMargin+"px";
			}
			
			else
			{
			 if (imgItem.height > imgHeight) 
                imgHeight = imgItem.height;
			}
           imgWidth += imgItem.width + 20;
        }
        
    } */
    
    for (var i = 0; i < divs.length; i++) {
        if (divs[i].getAttribute('rel') != null && divs[i].getAttribute('rel') == "newsImageSlider") {
           
        }
        else 
            if (divs[i].getAttribute('rel') != null && divs[i].getAttribute('rel') == "newsImageDiv") {
               if (imgWidth > 600){
                	divs[i].style.width = 685 + 'px';}
               else{
               		divs[i].style.width = parseInt(imgWidth) + 'px';}
               		
				if(document.getElementById("dvFlexViewall") != null)
				document.getElementById("dvFlexViewall").style.width = parseInt(imgWidth) + 'px';
            }
            else 
                if (divs[i].getAttribute('rel') != null && divs[i].getAttribute('rel').indexOf("newsImage") > -1) {
                   
                }
			else if(location.search.toLowerCase().indexOf('ispopup') == -1 && divs[i].className == "divOverflow" && divs[i].offsetWidth < divs[i].scrollWidth)
               {
                    document.getElementById("dvWideRelease").style.display = "inline";
                    divs[i].innerHTML = "<div style='padding-bottom: 10px;'><button class='btn btn-default hidden-xs hidden-sm hidden-tablet' onclick='javascript:OpenRelPopup();return false;' alt='Click to view news release full screen' title='Click to view news release full screen'><i class='icon-fullscreen'></i> Release contains wide tables. <br/>View fullscreen.</button></div>"+divs[i].innerHTML;
               }
        
    }
 
	//Headline space formatting
		var headlineImg = document.getElementById("imgHeadline");
		if(headlineImg != null)
		{
			if(headlineImg.width > 144)
			{
				headlineImg.width = 144;
			}
				
			var dvHeadlineObj = document.getElementById("dvHeadline");
			var dvHeadObj = document.getElementById("dvHead");
			var dvHeadlineImgObj = document.getElementById("dvHeadlineImg");
			var h1HeadlineObj = document.getElementById("h1Headline");
			var imgHeight = dvHeadlineImgObj.offsetHeight;
			var dvHeadlineHeight = dvHeadlineObj.offsetHeight;
			if(imgHeight > dvHeadlineHeight)
			{
				var diff = imgHeight - dvHeadlineHeight;
				dvHeadlineObj.style.marginTop = diff+"px";
				dvHeadObj.style.height = h1HeadlineObj.offsetHeight+"px";
			}
		}
		$("table").wrap("<div class='table-responsive'></div>");
}

function GetXmlHttpObject(handler)
{ 
    var objXmlHttp = null;
    if (!window.XMLHttpRequest)
    {
        // Microsoft
        objXmlHttp =new ActiveXObject("Microsoft.XMLHTTP");
        if (objXmlHttp != null && handler != null)
        {
            objXmlHttp.onreadystatechange = handler;
        }
    } 
    else
    {
        // Mozilla | Netscape | Safari
        objXmlHttp = new XMLHttpRequest();
        if (objXmlHttp != null && handler != null)
        {
        objXmlHttp.onreadystatechange = handler;

        }
    } 
    return objXmlHttp; 
} 
//This method sends a Get Request to the specified url.
//xmlHttp is the object of xmlHttp.
//url is the url of the page which should be contacted to retrieve data.
function SendXmlHttpGetRequest(xmlHttp, url) 
{

    xmlHttp.open('GET', url, true); 
    xmlHttp.send(null); 
}

//This method sends a POST Request to the specified url.
//xmlHttp is the object of xmlHttp.
//url is the url of the page which should be contacted to retrieve data.
function SendXmlHttpPostRequest(xmlHttp, url, sData) 
{ 
    xmlHttp.open("Post",url,true);
    xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    xmlHttp.send(sData);
}
var xmlHTTPObj;

function OpenRelPopup()
{
	var url = location.href;
	var query = location.search;
	if(query != "")
	{
		url += "&ispopup=y";
	}
	else
	{
		url += "?ispopup=y";
	}
	window.open(url, "", "");
}


function DisablePage()
{
	var anchorTags = document.getElementsByTagName('A');
	for (var i = 0; i < anchorTags.length; i++)
	{
		if(anchorTags[i].className != "thickbox" && anchorTags[i].className != "share" && anchorTags[i].className != "bug" && anchorTags[i].className != "blogsearch"
		)
		{
			anchorTags[i].href = "javascript:void(0)";
			anchorTags[i].target = "";
			if(anchorTags[i].className != "drop" && anchorTags[i].className.indexOf("flex") == -1)
			anchorTags[i].onclick = "return false;";
		}
	}
}

function ViewAllImages(lightboxObj)
{
	var thisObj = document.getElementById(lightboxObj);
	var t = thisObj.title || thisObj.name || null;
	var a = thisObj.href || thisObj.alt;
	var g = thisObj.rel || false;
	tb_show(t,a,g);
}

function set_alt_attribute(contalt) 
{
      var caption1=$(contalt).attr("alt");
      re1 = /\s+/g;
      caption1 = caption1.replace(re1," ");
      $(contalt).attr("alt",caption1);
      $(contalt).attr("title","");
}

function FetchPrevNextReleases(contentId)
{
if(document.getElementById("divGWO")!=null)
{
	xmlHTTPObj = GetXmlHttpObject(PopulatePrevNextReleases);
	xmlHTTPObj.onreadystatechange = PopulatePrevNextReleases;
	var env ="";
	if(window.location.href.indexOf("dev.") > -1)
	{
		env = "dev.";
	}
	else if (window.location.href.indexOf("stage.") > -1)
	{
		env = "stage.";
	}
	var url = "http://"+env+"www.prnewswire.com/templates/get_asynch_prev_next_release?id="+contentId;
	SendXmlHttpGetRequest(xmlHTTPObj, url); 
}
else
{
document.getElementById("divPrevNextTop").style.display = "none";
document.getElementById("divPrevNextBottom").style.display = "none";
}
}

function PopulatePrevNextReleases()
{
if (xmlHTTPObj.readyState == 4) {
		if (xmlHTTPObj.status == 200) { 
			var response = xmlHTTPObj.responseText; 
			document.getElementById("divPrevNextTop").innerHTML = response;
			document.getElementById("divPrevNextBottom").innerHTML = response;
document.getElementById("divNextRelease").style.display = "none";
		}
	}
}

function CallConversion()
{
  _gaq.push(['gwo._setAccount', 'UA-21992272-25']);
  _gaq.push(['gwo._trackPageview', '/4144594574/goal']);
  return true;
}
