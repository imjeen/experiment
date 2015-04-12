/*
* console
*/
var dev;

(function(){

	'use strict';

	var requiredMethods = ['log', 'error', 'time', 'timeEnd', 'profile', 'profileEnd'],
		emptyFunction = function(){},
		methodName,
		key;
	
	/**
	 * Bug IE8
	 * @see PHD-1953
	 */
	if (typeof window.console === 'undefined') {

		window.console = {};
	}

	for (key in requiredMethods) {

		if (requiredMethods.hasOwnProperty(key)) {

			methodName = requiredMethods[key];

			if (typeof window.console[methodName] === 'undefined') {

				// empty callback, fix for ie8;
				window.console[methodName] = emptyFunction;
			}
		}
	}


	dev = {

		showLogs 	: false, // is set to true for dev & devtest environment to log events
		profile  	: false, // switch to true if you want to start profiling

		log : function(message) {

			if (this.showLogs) {

				console.log(message);
			}
		},

		logError : function(message){

			if (this.showLogs) {

				console.error(message);
			}
		},

		startTimer : function(handle){

			if (this.showLogs) {

				console.time(handle);
			}
		},

		stopTimer : function(handle){

			if (this.showLogs) {

				console.timeEnd(handle);
			}
		},

		startProfile : function() {

			if (this.profile && this.showLogs) {

				console.profile('JS init');
			}
		},

		stopProfile : function(){

			if (this.profile && this.showLogs) {

				console.profileEnd('JS init');
			}
		}

	};

})();
