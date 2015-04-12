/*
* controller
*/

/**
 * DOM-based Routing
 * Based on http://goo.gl/EUTi53 by Paul Irish
 * http://www.paulirish.com/2009/markup-based-unobtrusive-comprehensive-dom-ready-execution/
 */
(function(){

	'use strict';

	var controller = {

		'common': {

			init: function(){
				// dev.log('common start');

				// do something
			},

			finish: function(){
				// dev.log('common end');
			}

		},

		'checkout': {
			init: function(){
				// do something
			}
		},

		'thumbList': {
			init: function(){
				// do something
			}
		}

		// , ...

	};

	var router = {
		fire: function(func, funcname, args) {

			var namespace = controller;

			funcname = (funcname === undefined) ? 'init' : funcname;

			if (func !== '' && namespace[func] && typeof namespace[func][funcname] === 'function') {
				namespace[func][funcname](args);
			}
		},

		loadEvents: function() {

			router.fire('common');

			$.each(document.body.className.replace(/-/g, '_').split(/\s+/),function(i,classnm) {
				router.fire(classnm);
			});

			router.fire('common', 'finish');
		}

	};


	$(document).ready(router.loadEvents);

})();
