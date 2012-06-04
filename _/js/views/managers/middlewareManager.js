/******************************************************************************************

			middlewareManager.js | 2012

			Agency: vanGoGh
			Agency URL: http://vangogh-creative.it
			Author: Federico Weber
			Author URL: http://federicoweber.com


			<------------------------------------------------------------->
			
									!!!NOTES!!!

			This class will take care of managing the given callbacks and
			executing it in the proper order.

			The manager accept the following arguments
			@page: Backbone.View - the page to apply middlewares to 
			@callbacks: Array - an array containing all the callbacks
			@options : {} - an obj containing options used by the middlewwares

			!The callback can be passed both as a function or as an obj like:
			{method: String, target: Object}. The method is a string reppresenting
			the function whyle target is the object that have the given method.

			The nextFunction is always passed as the latest arguments

			The inspiration for this module came from [express.js] middleware

			[express.js]:http://expressjs.com/

			<------------------------------------------------------------->

******************************************************************************************/

define([
		'jQuery'
	,	'Underscore'
	,	'Backbone'
], function($, _, Backbone){

	var callbacksQueue = []
	,	midlewaresTarget
	,	middlewareOptions
	;

	var	run = function(target, callbacks, options){
		midlewaresTarget = target;
		middlewareOptions = options;
		callbacksQueue = _.uniq(callbacks).reverse();
		next();
	};

	var next = function(options){	// @options: {} is used to allow options data modifications from the middlewares
		if(callbacksQueue.length){
			if(options){	
				middlewareOptions = options;
			}
			var thisNext = callbacksQueue[callbacksQueue.length -1];
			callbacksQueue.pop();
			if (typeof thisNext === "function"){	// directly call the callback if it's a function
				thisNext(midlewaresTarget, middlewareOptions, next);
			} else if(typeof thisNext.target[thisNext.method] === "function"){ // apply the callback to the target
				thisNext.target[thisNext.method](midlewaresTarget, middlewareOptions, next);
			} else {
				throw("The given middleware is not a function!");
			}
		}
	};

	return run;
});
	