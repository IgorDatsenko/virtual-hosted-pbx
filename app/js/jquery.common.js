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
      };

  // initialization of jquery placeholder
  if (navbarOpener.length) {
    navbarOpener.on('click', function () {
      var windowScrollTop = win.scrollTop();

      if (body.hasClass(classNames.navbarClass)) {
        // resetting properties of body element
        body.removeClass(classNames.navbarClass );
        // body.css({'margin-top': ''});
        // win.scrollTop(parseInt(body.data('scrollTop'), 10));
      } else {
        // setting fixed position to body element
        body.addClass(classNames.navbarClass);
        // body.data('scrollTop', windowScrollTop).css({marginTop: -windowScrollTop});
      }
    });
  }

  wrapper.on('click', function (event) {
    var eventTarget = $(event.target);

    if (!eventTarget.closest(navbar).length && body.hasClass(classNames.navbarClass)) {
      // resetting properties of body element
      body.removeClass(classNames.navbarClass);
      // body.css({'margin-top': ''});
      // win.scrollTop(parseInt(body.data('scrollTop'), 10));
    }
  });

}(jQuery, window, window.document));
