/*
 * @category JS
 * @package Social Media ShareBar with Fisheye Effect
 * @copyright 2011, 2012 Dmitry Sheiko (http://dsheiko.com)
 * @license GNU
 */


(function( $ ) {

   var ShareBarConfig = {
       BTN_MIN_SIZE : 16,
       BTN_MEDIUM_SIZE : 20,
       BTN_FULL_SIZE : 26,
       shareWindowOptions : "status=0,toolbar=0, width=500, height=500",
       buttons: {
           email : {
               tooltip : '',
               icon: './sharebar/assets/icons/email.png',
               callback: function(title, link) {
                   window.location.href = 'mailto:?subject=' + title + '&body=Please, follow the link ' + link;
               }
           },
           google : {
               tooltip : '',
               icon: './sharebar/assets/icons/google.png',
               callback: function(title, link) {
                   window.open('https://m.google.com/app/plus/x/?v=compose&content=I like this ' + link , null, ShareBarConfig.shareWindowOptions);
               }
           },
           twitter : {
               tooltip : '',
               icon: './sharebar/assets/icons/twitter.png',
               callback: function(title, link) {
                   window.open("http://twitthat.com/go?url=" + link + "&title=" + title, null, ShareBarConfig.shareWindowOptions);
               }
           },
           facebook : {
               tooltip : '',
               icon: './sharebar/assets/icons/facebook.png',
               callback: function(title, link) {
                   window.open("http://www.facebook.com/sharer.php?u=" + link + "&t=" + title, null, ShareBarConfig.shareWindowOptions);
               }
           },
           linkedin : {
               tooltip : '',
               icon: './sharebar/assets/icons/linkedin.png',
               callback: function(title, link) {
                   window.open("http://www.linkedin.com/shareArticle?mini=true&url=" + link + "&title=" + title, null, ShareBarConfig.shareWindowOptions);
               }
           },
           digg : {
               tooltip : '',
               icon: './sharebar/assets/icons/digg.png',
               callback: function(title, link) {
                   window.open("http://digg.com/submit?phase=2&title=" + title+ "&url=" + link, null, ShareBarConfig.shareWindowOptions);
               }
           }
       }
   }

   Util = {
        ucfirst : function(str) {
            str += '';
            return str.charAt(0).toUpperCase() + (str.substr(1).toLowerCase());
        },
        isPropertySupported: function(prop) {
            var _prop = Util.ucfirst(prop);
            return (('Webkit' + _prop) in document.body.style
                || ('Moz' + _prop) in document.body.style
                || ('O' + _prop) in document.body.style
                || ('Ms' + _prop) in document.body.style
                || prop in document.body.style);
        }
    }

   var ShareBarTemplate = function()
   {
       var BAR_TPL = '<ul class="icons">{buttons}</ul>',
           BTN_TPL = '<li><img tabindex="{index}" data-type="{type}" src="{icon}" '
                + 'title="{tooltip}" width="' + ShareBarConfig.BTN_MIN_SIZE
                + '" height="' + ShareBarConfig.BTN_MIN_SIZE + '" /></li>';

       var _parse = function(text, assigments) {
           $.each(assigments, function(key, val){
                var re = new RegExp("\{" + key + "\}", 'g');
                text = text.replace(re, val);
           });
           return text;
       },
       _parseBtn = function(assigments) {
           var res = BTN_TPL;
           return _parse(res, assigments);
       },
       _parseBar = function(assigments) {
           var res = BAR_TPL;
           return _parse(res, assigments);
       };
       return {
           getBar: function() {
               var i = 1, out = '';
                $.each(ShareBarConfig.buttons, function(key, info){
                    out +=
                        _parseBtn({type: key, index: i++, icon: info.icon, tooltip: info.tooltip});
                });
                return _parseBar({buttons: out});
           }
       }
   }
   var ShareBar = function() {

        var _private = {

            onClick : function() {
                var section = $(this).parents(".shareArticle"),
                    linkInfo = section.find('.shareLink');

                ShareBarConfig.buttons[$(this).find('img').data('type')]
                    .callback(linkInfo.text(), linkInfo.attr('href') || linkInfo.data('href'));
            },
            mouseEnter : function() {
                $(this).find('img').animate({
                    width: '+' + ShareBarConfig.BTN_FULL_SIZE,
                    height: '+' + ShareBarConfig.BTN_FULL_SIZE
                }, 50);
                $(this).find('+ li img').animate({
                    width: '+' + ShareBarConfig.BTN_MEDIUM_SIZE,
                    height: '+' + ShareBarConfig.BTN_MEDIUM_SIZE
                }, 50);
            },
            mouseLeave : function() {
                $(this).find('img').animate({
                    width: '+' + ShareBarConfig.BTN_MIN_SIZE,
                    height: '+' + ShareBarConfig.BTN_MIN_SIZE
                }, 50);
                $(this).find('+ li img').animate({
                    width: '+' + ShareBarConfig.BTN_MIN_SIZE,
                    height: '+' + ShareBarConfig.BTN_MIN_SIZE
                }, 50);
            }
        }
        return {
            init: function() {
                var instance = new ShareBar();
                instance.renderUI();
                instance.syncUI();
            },
            renderUI: function() {
                var html = ShareBarTemplate().getBar();
                $('.shareBar').append(html);
            },
            syncUI: function() {
                var _collection = $('.shareBar li');
                if (!Util.isPropertySupported('transition')) {
                    _collection.unbind('mouseenter').bind('mouseenter', _private.mouseEnter);
                    _collection.unbind('mouseleave').bind('mouseleave', _private.mouseLeave);
                }
                _collection.unbind('click').bind('click', _private.onClick);
            }
        }
    }

// Document is ready
$(document).bind('ready.app', ShareBar().init);

})( jQuery );