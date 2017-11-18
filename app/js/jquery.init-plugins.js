;(function ($, window, document, undefined) {
  'use strict';

  var body = $('body');
  var htmlBody = $('html, body');

  

  // initialization of jquery addClass function
  if (typeof $ === 'function' && typeof window.utilities === 'object' && typeof window.utilities.addClass === 'function') {
    window.utilities.addClass({
      selector: '[data-add-class]',
      parentToAddSelector: '[data-add-class-parent]',
      removeOnOutsideClick: true
    });
  }


  
  

  

}(jQuery, window, window.document));
