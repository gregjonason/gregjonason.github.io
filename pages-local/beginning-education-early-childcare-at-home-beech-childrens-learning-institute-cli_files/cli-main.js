WEBSITE = {};

WEBSITE.Global = {
    $container: null
};

WEBSITE.Init = {
    init: function(){
        $(window).on("throttledresize", function( event ) {
           WEBSITE.Init.initMasonry();
        })
        $('.hidephone').on('click', function(o){
            o.preventDefault();
            var $this = $(this);
            var phoneNumber = $this.attr('data-phone');
            var currentHtml = $this.html();
            if(currentHtml == 'show number'){
                $this.html(phoneNumber);  
            }else{
                $this.html('show number');
            }
        });
        
        $('.aoe-special').click(function(o){
            o.preventDefault();
        });
    },
    
    initMasonry: function() {
         var ww,cw,cw3;
            ww=$(window).width();
            cw=$('#aoes-container').width();
            
            var col = 360;
            var colItem;
            
            col = Math.floor((cw/3));
            $('.aoe-item').each(function(o){
                var $mimg = $(this).find('img.aoe-imag');
                $mimg.css('width', col + 'px'); 
                $(this).css('width', col + 'px');
            });
            
        WEBSITE.Global.$container = $('#aoes-container').isotope({
               itemSelector: '.aoe-item',
               layoutMode: 'packery',
                packery: {
                    columnWidth: col,
                    gutter: 0
                }
            }); 
        
        
    }
    
    
};


$(document).ready(function() {
    WEBSITE.Init.init();
    $('.search-btn').on('click', function(o){
        o.preventDefault();
        if($('body').hasClass('search-open')){
           
            //$('#searchDrawer').addClass('hide');
            $('#searchDrawer').animate({
                height: 0
                }, 500, function() {
                  $('body').removeClass('search-open');   
                  $('#searchSaw').addClass('hide');
                });            
           
        }else{
            $('html,body').scrollTo('#searchDrawer', '#searchDrawer', {gap:{y:-500}});
            $('#searchDrawer').animate({
                height: 300
                }, 500, function() {
                 $('body').addClass('search-open');
                });
           
            
            //$('#searchDrawer').removeClass('hide');
            $('#searchSaw').removeClass('hide');
        }
    });


	/*============================================
	Navigation Functions
	==============================================*/
    var top = 0;
    
    if($('body').hasClass('search-open')) {
        top = 315;
    }
    
    if($('body').hasClass('umbTextPage')){
            top += 127;
    }
    if($('body').width()>800){ 
        if ($(window).scrollTop()<=top){
           $('body').removeClass('body-scrolled');  
            $('#main-nav').removeClass('scrolled');
           $('#main-nav').removeClass('navbar-fixed-top');
           $('.search-btn').removeClass('sm');
        }else{
           $('body').addClass('body-scrolled');  
            $('#main-nav').addClass('scrolled'); 
           $('#main-nav').addClass('navbar-fixed-top');
           $('.search-btn').addClass('sm');     
        }
    }

	$(window).scroll(function(){
        var top = 0;
         if($('body').width()>800){
            if($('body').hasClass('search-open')) {
                top = 315;
            }
            
            if($('body').hasClass('umbTextPage')){
                top += 127;
            }
            
            if ($(window).scrollTop()<=top){
               $('body').removeClass('body-scrolled');    
                $('#main-nav').removeClass('scrolled');
               $('#main-nav').removeClass('navbar-fixed-top'); 
               $('.search-btn').removeClass('sm');
            }
            else{
               $('body').addClass('body-scrolled');  
                $('#main-nav').addClass('scrolled');   
               $('#main-nav').addClass('navbar-fixed-top');
               $('.search-btn').addClass('sm');     
            }
         }
	});
    
   

	/*============================================
	ScrollTo Links
	==============================================*/
	$('a.scrollto').click(function(e){
		$('html,body').scrollTo(this.hash, this.hash, {gap:{y:-80}});
		e.preventDefault();

		if ($('.navbar-collapse').hasClass('in')){
			$('.navbar-collapse').removeClass('in').addClass('collapse');
		}
	});

	/*============================================
	Header Functions
	==============================================*/
	$('.jumbotron').height($(window).height()+50);
	$('.message-box').css({'marginTop':$(window).height()*0.4});

	$('.home-slider').flexslider({
		animation: "slide",
		directionNav: false,
		controlNav: false,
		direction: "vertical",
		slideshowSpeed: 2500,
		animationSpeed: 500,
		smoothHeight: false
	});

	/*============================================
	Skills Functions
	==============================================*/
	var aboutColor = $('#about').css('backgroundColor');

	$('#skills').waypoint(function(){
		$('.chart').each(function(){
		$(this).easyPieChart({
				size:170,
				animate: 2000,
				lineCap:'butt',
				scaleColor: false,
				barColor: aboutColor,
				lineWidth: 10
			});
		});
	},{offset:'80%'});
	
    
    
    
	/*============================================
	Project thumbs - Masonry
	==============================================*/
	$(window).load(function(){

		

        WEBSITE.Init.initMasonry();
       
        $('#aoes-container').css({visibility:'visible'});
		scrollSpyRefresh();
		waypointsRefresh();
	});

	/*============================================
	Filter Projects
	==============================================*/
	$('#filter-works a').click(function(e){
		e.preventDefault();

		$('#filter-works li').removeClass('active');
		$(this).parent('li').addClass('active');

		var category = $(this).attr('data-filter');

		$('.aoe-item').each(function(){
			if($(this).is(category)){
				$(this).removeClass('filtered');
			}
			else{
				$(this).addClass('filtered');
			}

			$('#aoes-container').masonry('reload');
		});

		scrollSpyRefresh();
		waypointsRefresh();
	});

	/*============================================
	Project Preview
	==============================================*/
	$('.aoe-item2').click(function(e){
		e.preventDefault();
       return;
		var elem = $(this),
			title = elem.find('.aoe-title').text(),
			link = elem.attr('href'),
			descr = elem.find('.aoe-description').html(),
			slidesHtml = '<ul class="slides">',

			slides = elem.data('images').split(',');

		for (var i = 0; i < slides.length; ++i) {
			slidesHtml = slidesHtml + '<li><img src='+slides[i]+' alt=""></li>';
		}
		
		slidesHtml = slidesHtml + '</ul>';
		

		/*$('#aoe-modal').on('show.bs.modal', function () {
			$(this).find('h1').text(title);
			$(this).find('.btn').attr('href',link);
			$(this).find('.project-descr').html(descr);
			$(this).find('.image-wrapper').addClass('flexslider').html(slidesHtml);
			
			setTimeout(function(){
				$('.image-wrapper.flexslider').flexslider({
					slideshowSpeed: 3000,
					animation: 'slide',
					controlNav: false,
					start: function(){
						$('#aoe-modal .image-wrapper')
						.addClass('done')
						.prev('.loader').fadeOut();
					}
				});
			},1000);
		}).modal();*/
		
	});

	/*$('#aoe-modal').on('hidden.bs.modal', function () {
		$(this).find('.loader').show();
		$(this).find('.image-wrapper')
			.removeClass('flexslider')
			.removeClass('done')
			.html('')
			.flexslider('destroy');
	});*/
	
	/*============================================
	Twitter Functions
	==============================================*/
	var tweetsLength = $('#twitter-slider').data('tweets-length'),
		widgetID = $('#twitter-slider').data('widget-id');
	
	//twitterFetcher.fetch(widgetID, 'twitter-slider', tweetsLength, true, false, true, '', false, handleTweets);

	function handleTweets(tweets){
	
		var x = tweets.length,
			n = 0,
			tweetsHtml = '<ul class="slides">';
			
		while(n < x) {
			tweetsHtml += '<li>' + tweets[n] + '</li>';
			n++;
		}
		
		tweetsHtml += '</ul>';
		$('#twitter-slider').html(tweetsHtml);
		
		$('.twitter_reply_icon').html("<i class='icon-reply'></i>");
		$('.twitter_retweet_icon').html("<i class='icon-retweet'></i>");
		$('.twitter_fav_icon').html("<i class='icon-star'></i>");

		$('#twitter-slider').flexslider({
			prevText: '<i class="icon-angle-left"></i>',
			nextText: '<i class="icon-angle-right"></i>',
			slideshowSpeed: 5000,
			useCSS: true,
			controlNav: false, 
			pauseOnAction: false, 
			pauseOnHover: true,
			smoothHeight: false
		});
	}
	/*============================================
	Resize Functions
	==============================================*/
	$(window).resize(function(){
		$('.jumbotron').height($(window).height());
		$('.message-box').css({'marginTop':$(window).height()*0.4});
		scrollSpyRefresh();
		waypointsRefresh();
	});
	
	/*============================================
	Backstretch Images
	==============================================*/
	$.backstretch('/images/bg-yellow.jpg');

	$('body').append('<img class="preload-image" alt="CLI Tree Background" src="/images/bg-yellow.jpg" style="display:none;"/>');

	$('#about3').waypoint(function(direction){
	
		if($('.preload-image').length){$('.preload-image').remove();}
		
		$('.backstretch').remove();
	
		if (direction=='down'){
			$.backstretch('/images/bg-yellow.jpg');
		}else{
			$.backstretch('/images/bg-yellow.jpg');
		}
	});
    $.backstretch('/images/bg-yellow.jpg');
	
	/*============================================
	Project Hover mask on IE
	==============================================*/
	$('.no-csstransitions .hover-mask').hover(
		function() {
			$( this ).stop(true,true).animate({opacity: 1});
		}, function() {
			$( this ).stop(true,true).animate({opacity: 0});
		}
	);
	
	/*============================================
	Placeholder Detection
	==============================================*/
	if (!Modernizr.input.placeholder) {
		$('#contact-form').addClass('no-placeholder');
	}

	/*============================================
	Scrolling Animations
	==============================================*/
	$('.scrollimation').waypoint(function(){
		$(this).toggleClass('in');
	},{offset:'90%'});

	/*============================================
	Refresh scrollSpy function
	==============================================*/
	function scrollSpyRefresh(){
		setTimeout(function(){
			$('body').scrollspy('refresh');
		},1000);
	}

	/*============================================
	Refresh waypoints function
	==============================================*/
	function waypointsRefresh(){
		setTimeout(function(){
			$.waypoints('refresh');
		},1000);
	}

});	

