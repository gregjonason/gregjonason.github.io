


usi_alert = function(msg) {}


if (location.href.indexOf("/library") != -1 || location.href.indexOf("/read") != -1) {
    var USI_headID = document.getElementsByTagName("head")[0];
    var USI_dynScript = document.createElement("script");
    USI_dynScript.setAttribute('type','text/javascript');
    USI_dynScript.src = 'http'+ (document.location.protocol=='https:'?'s://www':'://www')+ '.upsellit.com/launch.jsp?qs=276249244237272345292310342335307330298345305337308335340326&siteID=8287';
    USI_headID.appendChild(USI_dynScript);
}
