/*
	## javascript constructor ##
	depend on jQuery
*/

(function($){

	'use strict';

	var defaults = {
		a: "test-a",
		b: "test-b"
	};

	$.fn.myTest = function(options){
		return this.each(function(){
			var $el = $(this);
			$el.data("test", new myTest($el, options));
		});
	};

	/*
	* @constructor
	*/
	function myTest(){
		this.init.apply(this,arguments);
	}

	myTest.prototype = {

		options: {},

		other: null,

		init: function($el, opts){
			opts = opts || {};
			options = this.options =  $.extend({}, defaults, opts);
			if( $el ){
				// do something ...
				this.bindEvents();
			}
		},

		bindEvents: function(){
			$el.on("click", options.a, $.proxy(this.clickMe, this) );
		},

		clickMe: function(){
			// do something ...
		}

	};


})(jQuery);
