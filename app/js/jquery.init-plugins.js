;(function ($, window, document, undefined) {
  'use strict';

  var body = $('body'),
    htmlBody = $('html, body'),
    scrollToLink = body.find('[data-scroll-to-link]'),
    fancyboxElements = body.find('.fancybox'),
    popuoElements = body.find('.popup'),
    navBar = body.find('[data-smooth-scrolling]'),
    scrollToElements = body.find('[data-scroll-to]');

  // initialization of jquery placeholder
  if (typeof $ === 'function' && typeof $.fn.placeholder === 'function') {
    body.find('input, textarea').placeholder();
  }

  function smoothScrollTo(anchorSelector, diff, callback) {
    var anchor = body.find(anchorSelector);
    if (anchor.length) {
      htmlBody.stop().animate({
          scrollTop: anchor.offset().top - (diff || 0)
      }, 750, function () {
        if (typeof callback === 'function') {
            callback();
        }
      });
      return anchor;
    } else {
      return $();
    }
  }

  if (scrollToLink.length) {
    scrollToLink.on('click', function (e) {
      e.preventDefault();
      var anchor = $(this).attr('href');
      smoothScrollTo(anchor, 150);
    });
  }

  // initialization of jquery addClass function
  if (typeof $ === 'function' && typeof window.utilities === 'object' && typeof window.utilities.addClass === 'function') {
    window.utilities.addClass({
      selector: '[data-add-class]',
      parentToAddSelector: '[data-add-class-parent]',
      removeOnOutsideClick: true
    });
  }

	if (typeof Swiper === 'function' ) {
		var swiper = new Swiper('.news .swiper-container, .videos .swiper-container', {
      slidesPerView: 'auto',
			spaceBetween: 30,
			nextButton: '.btn-swiper-next',
			prevButton: '.btn-swiper-prev',
      centeredSlides: false,
      breakpoints: {
        767: {
          spaceBetween: 15,
          centeredSlides: true
        }
      }
		});

		var swiperAlbums = new Swiper('.albums .swiper-container', {
      slidesPerView: 3,
      spaceBetween: 30,
      nextButton: '.btn-swiper-next',
      prevButton: '.btn-swiper-prev',
      // centeredSlides: true,
      breakpoints: {
        767: {
          slidesPerView: 'auto',
          spaceBetween: 15,
          centeredSlides: true
        }
      }
		});

		var photosSwiper = new Swiper('.photos .swiper-container', {
			// pagination: '.swiper-pagination',
      slidesPerView: 5,
      slidesPerColumn: 3,
      spaceBetween: 0,
			nextButton: '.btn-swiper-next',
			prevButton: '.btn-swiper-prev',
      breakpoints: {
        1024: {
          slidesPerView: 4
        },
        767: {
          slidesPerView: 3

        },
        640: {
          slidesPerView: 2
        }
      }
		});

		var storeSwiper = new Swiper('.store .swiper-container', {
      slidesPerView: 2,
      // slidesPerView: 'auto',
      spaceBetween: 30,
      nextButton: '.btn-swiper-next',
      prevButton: '.btn-swiper-prev',
      breakpoints: {
        1024: {
          // slidesPerView: 2,
          slidesPerView: 'auto',
          spaceBetween: 15
        }
      }
    });
	}

	// init fancybox
  if (typeof $.fancybox === 'function' && fancyboxElements.length) {
    fancyboxElements.fancybox({
      maxWidth	: '100%',
      maxHeight	: '100%',
      fitToView	: false,
      // width		: '80%',
      height		: '80%',
      autoSize	: true,
      closeClick	: false,
      openEffect	: 'none',
      closeEffect	: 'none',
      overlayShow: true,
      overlayColor: '#000',
      overlayOpacity: 1,
      nextEffect: 'none',
      prevEffect: 'none'
    });
     popuoElements.fancybox({
      maxWidth	: 1100,
      maxHeight	: 650,
      fitToView	: false,
      height		: 'auto',
      width		: '80%',
      autoSize	: false,
      closeClick	: false,
      openEffect	: 'none',
      closeEffect	: 'none',
      overlayShow: true,
      overlayColor: '#000',
      overlayOpacity: 1
      // padding: 100
    });
  }

  if (navBar.length) {
    window.utilities.fixNavBar(navBar);
    window.utilities.anchorNavigation();
  }

  if (scrollToElements.length) {
    window.utilities.scrollTo();
  }

}(jQuery, window, window.document));
