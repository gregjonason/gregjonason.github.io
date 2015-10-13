var MENUSPEED = 200;
var TABLETMENUSPEED = 400;
var MENUCLOSED = true;
var BUTTON_ID = "#mobile-menu-btn";
var NAV_CONTAINER = "#mobile-nav";
var PARENT_LIST = ".menu";
var CHILD_MENU = ".sub-menu";
var MAIN_NAV = ".right-top";
var DISTANCE = 256;
var MOBILE = false;
jQuery(document).ready(function($) {
    // TABLET MENU
    
    //apply FontAwesome icon to tablet menu to show child relationship
    $(NAV_CONTAINER+' ul'+PARENT_LIST+' > li > a').each(function( index ){
        if($(this).parent().hasClass('menu-item-has-children')){
            $(this).append('<i class="fa fa-angle-down"></i>');
        }else{
            //Uncomment if you want right arrows on non parent menu items
           //$(this).append('<i class="fa fa-angle-right"></i>');
        }
    });
    
    //MOBILE SPECIFIC FIXES
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        // binding to touchstart gives much faster response times on mobile devices
        var bind = 'touchstart';
        var subbind = 'tap'; //Requires Jquery Mobile
        MOBILE = true;
    }else{
        var bind = 'click';
        var subbind = 'click';
        MOBILE = false;
    }

    //Close Menu on Swipe
    $(NAV_CONTAINER).on("swipeleft",function(e){
        closeTabletMenu();
    });

    
    
    //OPEN MENU ON BUTTON PRESS
    $(BUTTON_ID).on(bind, function(e){
        e.preventDefault();
        openTabletMenu(e);
    });
    
    $(NAV_CONTAINER+" "+PARENT_LIST+" > li > a").on(subbind,function(e){
        if(! $(this).next().is('ul')){
            //if there is no submenu act like a normal link
            return;
        }
        e.preventDefault();
        subMenuToggle($(this),e);
    });
    
    //close the menu if it is open and the user clicks / touches ANYWHERE but the tablet menu  
    $(document).on(bind, function(e){
        closeOnTouch(e);
    });
    
    //When the screen resizes, if the width changed, make sure the menu is closed
    var width = $(window).width();
    $( window ).resize(function() {
        if($(this).width() != width){
            width = $(window).width();
            closeTabletMenuOnResize();
        }
    });
    
});

//Close any opened sub menus
function slideMenusUp(keeper){
    if(!keeper){ keeper = ''; }
    var parent = jQuery(NAV_CONTAINER+" "+PARENT_LIST+" > li > a");
    parent.each(function(){
        if(jQuery(this).next().is('ul') && jQuery(this)[0] != keeper[0]){
            jQuery(this).next().slideUp(TABLETMENUSPEED, function(){
                jQuery(this).prev().find('i').remove();
                jQuery(this).prev().append('<i class="fa fa-angle-down"></i>');
            });
        }
    });
    
}

//Prevent following link and open submenu
//Follows link on second click if is parent
function subMenuToggle(parent, event){
    if(parent.next().is( ":hidden" )){
        parent.next().slideDown(TABLETMENUSPEED, function(){
            jQuery(this).prev().find('i').remove();
            jQuery(this).prev().append('<i class="fa fa-angle-up"></i>');
        });
    }else{
        if(parent.parent().hasClass('disabled')){
            parent.next().slideUp(TABLETMENUSPEED, function(){
                jQuery(this).prev().find('i').remove();
                jQuery(this).prev().append('<i class="fa fa-angle-down"></i>');
            });
        }else{
            window.location=parent.attr('href');
        }
    }
    slideMenusUp(parent);
}
 
function closeOnTouch(e){
    if(! MENUCLOSED){
        var container = jQuery(NAV_CONTAINER);
        if (!container.is(e.target) // if the target of the click isn't the container...
            && container.has(e.target).length === 0
            && (jQuery(MAIN_NAV).css("display") == "none" || jQuery(MAIN_NAV).css("visibility") == "hidden")
            && jQuery(e.target).parent().attr("id") != getIdentifier(BUTTON_ID) //IS THIS NEEDED
            && jQuery(e.target).attr("id") != "logo" )
        {
           closeTabletMenu();
        }
    }
}
 
function closeTabletMenu(){
    if(! MENUCLOSED){
        jQuery(NAV_CONTAINER).css('left','-'+DISTANCE+'px');
        jQuery('body').css('left', 0);
        slideMenusUp();
        
        /*jQuery('body, '+NAV_CONTAINER).animate({
            left: "-=256",
        }, { duration: TABLETMENUSPEED, queue: false }, function() {});*/
        MENUCLOSED = !MENUCLOSED;
    }
}
 
//for various reasons it makes sense to close the tablet menu when the screen is resized. Prevents LOTS OF ISSUES.
function closeTabletMenuOnResize(){
    if(! MENUCLOSED){
        jQuery(NAV_CONTAINER).css('left', "-256px");
        jQuery('body').css('left', "0px");
        slideMenusUp();
        MENUCLOSED = !MENUCLOSED;
    }
}
 
 
function openTabletMenu(e){
    e.preventDefault();
    if(MENUCLOSED){
        jQuery(NAV_CONTAINER).css('left', 0);
        jQuery('body').css('left', DISTANCE+'px');
        
        /*jQuery('body, '+NAV_CONTAINER).animate({
            left: "+=256",
        }, { duration: TABLETMENUSPEED, queue: false }, function() {});*/
 
    }else{
        jQuery(NAV_CONTAINER).css('left','-'+DISTANCE+'px');
        jQuery('body').css('left', 0);
        slideMenusUp();
       /* jQuery('body, '+NAV_CONTAINER).animate({ left: "-=256" }, { duration: TABLETMENUSPEED, queue: false }, function() {});*/
    } 
    MENUCLOSED = !MENUCLOSED;
}

function isMobile(){
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        return true;
    }else{
        return false;
    }    
}
 
function getIdentifier(s){
    if(s.indexOf("#") > -1){
       s = s.split('#')[1];
    }else if(s.indexOf(".") > -1){
       s = s.split('.')[1]
    }
    return s;
}

String.prototype.contains = function(test) {
    return this.indexOf(test) == -1 ? false : true;
};