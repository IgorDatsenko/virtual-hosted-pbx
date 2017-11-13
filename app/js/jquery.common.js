;(function ($, window, document, undefined) {
  'use strict';

  var body = $('body'),
      win = $(window),
      htmlBody = $('html, body'),
      wrapper = $('.wrapper'),
      navbarOpener = body.find('[data-navbar-opener]'),
      navbar = body.find('[data-navbar]'),
      classNames = {
        active: 'is-active',
        visibleDropHolder: 'visible-drop-holder',
        navbarClass: 'has-visible-nav',
        mobileNavClass: 'side-nav-opened-section',
        sidebarSubSectionsClass: 'is-visible',
        noScrollClass: 'no-scroll'
      },
      isTouchDevice,
      eventName;

  if (typeof $ === 'function' && typeof window.utilities === 'object') {
    eventName = window.utilities.isTouchDevice ? 'touchstart' : 'click';
    isTouchDevice = window.utilities.isTouchDevice;
  }

  // initialization of jquery placeholder
  if (navbarOpener.length) {
    navbarOpener.on(eventName, function () {
      var windowScrollTop = win.scrollTop();

      if (body.hasClass(classNames.navbarClass)) {
        // resetting properties of body element
        body.removeClass(classNames.navbarClass + ' ' + classNames.noScrollClass);
        body.css({'margin-top': ''});
        win.scrollTop(parseInt(body.data('scrollTop'), 10));
      } else {
        // setting fixed position to body element
        body.addClass(classNames.navbarClass + ' ' + classNames.noScrollClass);
        body.data('scrollTop', windowScrollTop).css({marginTop: -windowScrollTop});
      }
    });
  }

  wrapper.on(eventName, function (event) {
    var eventTarget = $(event.target);

    if (!eventTarget.closest(navbar).length && body.hasClass(classNames.navbarClass)) {
      // resetting properties of body element
      body.removeClass(classNames.navbarClass + ' ' + classNames.noScrollClass);
      body.css({'margin-top': ''});
      win.scrollTop(parseInt(body.data('scrollTop'), 10));
    }
  });

}(jQuery, window, window.document));
