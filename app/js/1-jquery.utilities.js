(function (jQuery, window, document, undefined) {
  'use strict';

  var utilities,
      html = $('html'),
      body = $('body'),
      win = $(window),
      Document = $(document),
      Window = $(window),
      htmlBody = $('html,body'),
      isTouchDevice = /MSIE 10.*Touch/.test(navigator.userAgent) || ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;

  utilities = (function utils() {

    // Add Class utility function
    function addClass (config) {
      if (config.selector) {
        var collection = $(config.selector),
            eventByDefault = isTouchDevice ? 'touchstart' : 'click',
            eventToBind = config.eventName || eventByDefault,
            classNameToAdd = config.classNameToAdd || 'active';

        collection.on(eventToBind, function (e) {
          if (eventToBind === 'click' || eventToBind === 'touchstart') {
            e.preventDefault();
          }

          if (config.removeOnOutsideClick) {
            e.stopPropagation();
          }
          var currentElement = config.parentToAddSelector ? $(this).closest(config.parentToAddSelector) : $(this);

          if (currentElement.hasClass(classNameToAdd)) {
            currentElement.removeClass(classNameToAdd);
          } else {
            currentElement.addClass(classNameToAdd);
          }
        });

        if (config.removeOnOutsideClick) {
          html.on(eventToBind, function (event) {
            if (collection.closest(config.parentToAddSelector)[0] != event.target && !collection.closest(config.parentToAddSelector).has(event.target).length) {
              collection.closest(config.parentToAddSelector).removeClass(classNameToAdd);
            }
          });
        }
      } else {
        console.log('You need to specify a selector for add class utility method');
      }
    }

    // function fixing navigation on top when page scroll down
    function fixNavBar(navBar) {
      var navBarPosition = navBar.position().top;
      var fixedClass = 'nav-fixed';
      var isFixed = false;

      Window.scroll(function () {
        var scrollTop = html.scrollTop() || body.scrollTop();

        if (scrollTop > navBarPosition && !isFixed) {
          body.addClass(fixedClass);
          isFixed = !isFixed;
        } else if (scrollTop < navBarPosition && isFixed) {
          body.removeClass(fixedClass);
          isFixed = !isFixed;
        }
      });
    }
    
    function anchorNavigation() {

      $.scrollTo = $.fn.scrollTo = function(x, y, options){
        if (!(this instanceof $)) return $.fn.scrollTo.apply($('html, body'), arguments);

        options = $.extend({}, {
          gap: {
            x: 0,
            y: 0
          },
          animation: {
            easing: 'swing',
            duration: 600,
            complete: $.noop,
            step: $.noop
          }
        }, options);

        return this.each(function(){
          var elem = $(this);
          elem.stop().animate({
            scrollLeft: !isNaN(Number(x)) ? x : $(y).offset().left + options.gap.x,
            scrollTop: !isNaN(Number(y)) ? y : $(y).offset().top + options.gap.y
          }, options.animation);
        });
      };

      var aChildren = body.find('.nav-link'); // find the a children of the list items
      var aArray = []; // create the empty aArray
      for (var i=0; i < aChildren.length; i++) {
        var aChild = aChildren[i];
        var ahref = $(aChild).attr('href');
        aArray.push(ahref);
      }

      Window.scroll(function(){
        var windowPos = Window.scrollTop(); // get the offset of the window from the top of page
        var windowHeight = Window.height(); // get the height of the window
        var docHeight = Document.height();

        for (var i=0; i < aArray.length; i++) {
          var theID = aArray[i];
          if (!body.find(theID).length) {
            continue;
          }
          var divPos = body.find(theID).offset().top; // get the offset of the div from the top of page
          var divHeight = body.find(theID).height(); // get the height of the div in question
          if (windowPos >= divPos && windowPos < (divPos + divHeight)) {
            $("a[href='" + theID + "']").addClass("active");
          } else {
            $("a[href='" + theID + "']").removeClass("active");
          }
        }

        if(windowPos + windowHeight == docHeight) {
          if (!$(".nav-list li:last-child a").hasClass("active")) {
            var navActiveCurrent = $(".active").attr("href");
            $("a[href='" + navActiveCurrent + "']").removeClass("active");
            $(".nav-list li:last-child a").addClass("active");
          }
        }
      });



    }

    function scrollTo() {
      $.scrollTo = $.fn.scrollTo = function(x, y, options){
        if (!(this instanceof $)) return $.fn.scrollTo.apply($('html, body'), arguments);

        options = $.extend({}, {
          gap: {
            x: 0,
            y: 0
          },
          animation: {
            easing: 'swing',
            duration: 600,
            complete: $.noop,
            step: $.noop
          }
        }, options);

        return this.each(function(){
          var elem = $(this);
          elem.stop().animate({
            scrollLeft: !isNaN(Number(x)) ? x : $(y).offset().left + options.gap.x,
            scrollTop: !isNaN(Number(y)) ? y : $(y).offset().top + options.gap.y
          }, options.animation);
        });
      };

      body.find('[data-scroll-to]').on('click', function(evn){
        evn.preventDefault();

        if (body.hasClass('has-visible-nav')) {
          body.removeClass('has-visible-nav no-scroll');
          body.css({'margin-top': ''});
          win.scrollTop(parseInt(body.data('scrollTop'), 10));
        }

        var anchor = body.find(this.hash);
        htmlBody.scrollTo(this.hash, this.hash);
      });
    }

    return {
      isTouchDevice: isTouchDevice,
      addClass: addClass,
      fixNavBar: fixNavBar,
      anchorNavigation: anchorNavigation,
      scrollTo: scrollTo
    };
  }());

  window.utilities = utilities;
})(jQuery, window, window.document);