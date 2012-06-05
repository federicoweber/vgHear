/******************************************************************************************

			basicOpacity.js | 2012

			Agency: vanGoGh
			Agency URL: http://vangogh-creative.it
			Author: Federico Weber
			Author URL: http://federicoweber.com


			<------------------------------------------------------------->
			
									!!!NOTES!!!

			This animator will take care of transition the given target.
			it extends backboneEvent to fire the following events: 
				. "transitionInDone"
				. "transitionOutDone"
			
			methods:
				. animator(@target, @duration) is used to create a new animator
				. animate() 
				. kill() remove all the event listeners

			arguments: 
				. @target: String, to get the DOM element
				. @duration: Number, durata in millisecondi

			<------------------------------------------------------------->

******************************************************************************************/

define([
		'jQuery'
	,	'Underscore'
	,	'Backbone'
], function($, _, Backbone){

	// This is the animator fu
	var basicOpacity =  function(target, duration){
		_.extend(this, Backbone.Events);
		var that = this;


		this.transitionIn = function(options){
			$(target).animate({"opacity": 1}, duration, function(){
				that.trigger("transitionInDone");
			});	
		};

		this.transitionOut = function(options){
			$(target).animate({"opacity": 0}, duration, function(){
				that.trigger("transitionOutDone");
			});
		};

		this.kill = function(){
			this.off();
		};
			
	};

	return {

		newAnimator: function(target, duration){
			var newAnimator = new basicOpacity(target, duration);		
			return newAnimator;
		}
	}
});
	