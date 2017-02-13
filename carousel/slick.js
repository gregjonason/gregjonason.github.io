$(function () {
    
    var $sliders = $(".your-class");
    var $arrows = $('.arrows');
    
    $(".slick_container").each(function(){
        
        var $this = $(this);
        var slick = $this.find( $sliders ).slick({
            appendArrows: $this.find( $arrows )
        });

    });

});
