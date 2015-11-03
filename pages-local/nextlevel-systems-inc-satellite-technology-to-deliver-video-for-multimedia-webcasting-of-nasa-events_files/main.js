// ---------------------------------------------------- //
//  Variables                                           //
// ---------------------------------------------------- //

var windowWidth = viewport().width;
// home page slider
var $carouselName = $("#main-carousel .element");
var elem = document.createElement('div');
var masonryContainer = document.querySelector('#img-grid');
var button = document.querySelector('#load-more-kc');
var imageHeight, wrapperHeight, overlap, container = $('.crop');
var imageHeight, wrapperHeight, overlap, $cropContainer = $('.crop');
var $sitePreviewToggle = $('#site-preview-toggle');
var $frameContainer = $('#site-preview-wrapper');
var sitePreviewIframe;
var $newTemplateCarousel = $('.inline-carousel .carousel-container');
var $newTemplateCarouselNav = $('.inline-carousel .carousel-nav-container');
var $carouselImgWidth = $('#testimgwidth').width();
var $carouselImg  = $('.carousel-item img');
var $infoOverlay = $('figure .image.infographic a');
var $infoOverlayDiv = $('<div/>', {
  class: 'info-overlay hidden-xs'
});

// ---------------------------------------------------- //
//  Functions                                           //
// ---------------------------------------------------- //

function addInfoOverlay() {
  $infoOverlay.prepend($infoOverlayDiv);
}

if (windowWidth >= 768) {
  function centerImage() {
    $cropContainer.each(function() {
      imageHeight = $('img.gallery-thumb', this).height();
      wrapperHeight = $(this).height();
      overlap = (wrapperHeight - imageHeight) / 2;
      $('img.gallery-thumb', this).css('margin-top', overlap);
    });
  }
}


function viewport() {
    var e = window,
        a = 'inner';
    if (!('innerWidth' in window)) {
        a = 'client';
        e = document.documentElement || document.body;
    }
    return {
        width: e[a + 'Width'],
        height: e[a + 'Height']
    };
}

// add more content for masonry example
function getItemElement() {
    elem.className = 'tile ';
    elem.innerHTML = '<img class="img-thumbnail img-responsive" src="http://prnux.4v2-a419-2g56-b41v.net:8080/dev/prn/prnj/assets/img/content/photo1.png"><h3><a href="release-detail.php">Lorem ipsum dolor sit amet </a></h3><h4><span class="date">Posted on 5.13.2013</span></h4>';
    return elem;
}

function masonrySetup() {
    var msnry;
    // layout Masonry again after all images have loaded
    imagesLoaded(masonryContainer, function() {
        msnry = new Masonry(masonryContainer, {
                gutter: 20,
                columnWidth: '.grid-sizer',
                itemSelector: '.tile'
            });
    });
};

// homepage slider
function responsiveCarousel() {
    if (windowWidth > 767) {
        $carouselName.unwrap();
        for (var k = 0; k < $carouselName.length; k += 3) {
            $carouselName.slice(k, k + 3).wrapAll("<div class='item'>");
        }
        $("#main-carousel .item:first-child").addClass("active");
    } else if (windowWidth <= 767) {
        $carouselName.unwrap();
        $carouselName.each(function() {
            $(this).wrap("<div class='item'>");
        });

        $("#main-carousel .item:first-child").addClass("active");
    }
}


// ---------------------------------------------------- //
//  Resize Function                                     //
// ---------------------------------------------------- //
function resize() {

    windowWidth = viewport().width;
    $carouselName = $("#main-carousel .element");
    if (windowWidth > 767) {
        $carouselName.unwrap();
        for (var k = 0; k < $carouselName.length; k += 3) {
            $carouselName.slice(k, k + 3).wrapAll("<div class='item'>");
        }
        $("#main-carousel .item:first-child").addClass("active");
    } else if (windowWidth <= 767) {
        $carouselName.unwrap();
        $carouselName.each(function() {
            $(this).wrap("<div class='item'>");
        });
        $("#main-carousel .item:first-child").addClass("active");
    }
}

// ---------------------------------------------------- //
//  Init Function                                       //
// ---------------------------------------------------- //


function int() {

  // ------------------------------- //
  //  Initialize bootstrap js here:  //
  // ------------------------------- //

  // new template carousel - slick


$newTemplateCarousel.slick({
  speed: 300,
  infinite: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  asNavFor: '.carousel-nav-container'
});
$newTemplateCarouselNav.slick({
  speed: 300,
  infinite: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  focusOnSelect: true,
  centerMode: true,
  variableWidth: true,
  arrows: false,
  asNavFor: '.carousel-container'
});

addInfoOverlay();

  // checks image proportion
  $('.superhero-infographic img').load(function() {
    var $this = $(this);
    if ($this.height() > $this.width()) {
      $this.addClass('vert-infographic');
    }
  });

  // centers images inside div
  $(window).on('load resize', centerImage);


  if (windowWidth >= 768) {
    $(document).delegate('*[data-toggle="lightbox"]', 'click', function(event) {
      event.preventDefault();
      $(this).ekkoLightbox();
    });
  }
  else {
    $(document).delegate('*[data-type="image"]', 'click', function(event) {
      event.preventDefault();
    });
  }

  $('.datepicker').datepicker();
  $("[data-toggle='tooltip']").tooltip();
  $('.accordion-head a').on('click', function(e) {
    if ($(this).parents('.panel').children('.panel-collapse').hasClass('in')) {
      e.stopPropagation();
      e.preventDefault();
    }
  });

    responsiveCarousel();

    masonrySetup();

 $('#addKeyword').on('focusout', function() {
    var txt = this.value.replace(/[^a-zA-Z0-9&\-]/g, ''); // allowed characters
    if (txt) {
      $('#appendedKeyword').append('<li class="no-bottom-margin"><a class="icon-remove-sign"></a> ' + txt.toLowerCase() + '</li>');
    }
    this.value = "";
  }).on('keyup', function(e) {
    // if: comma,enter (delimit more keyCodes with | pipe)
    if (/(188|32)/.test(e.which)) {
      $(this).focusout();
    }

  });

  $('#appendedKeyword').on('click', '.icon-remove-sign', function() {
    console.log('test');
    if (confirm("Do you want to remove this keyword?")) {
      $(this).parent().remove();
    }
  });

  $(function() {
    $('.checkall').on('click', function() {
      $(this).closest('fieldset').find(':checkbox').prop('checked', this.checked);
    });
  });

  $sitePreviewToggle
  .on({
    click: function(event) {
      if (sitePreviewIframe) {
        sitePreviewIframe.appendTo($frameContainer);
        sitePreviewIframe = null;
      } else {
        sitePreviewIframe = $('#site-preview-iframe').detach();
      }

      event.preventDefault();
    }
  });

  $sitePreviewToggle
  .on({
    click: function(event) {
      var $this = $(this);
      var originalText = $this.data('text-original');
      var swapText = $this.data('text-swap');

      if ($this.text() === originalText) {
        $this.text(swapText);
      } else {
        $this.text(originalText);
      }

      event.preventDefault();
    }
  });

}


// ---------------------------------------------------- //
//  DO NOT TOUCH ANYTHING BELOW THIS                    //
// ---------------------------------------------------- //

$(window).resize(function() {
    setTimeout(function() {

        resize();

    }, 200);
});

docReady(function() {
    int();
});












