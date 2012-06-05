/*---------------------------------------------------------------- 
	Loader Manager; 
	___  _    __   _    
	|_ \ || \ | |  || \ 
	| __]||_|\| |__||_|\
	|___/|___/|___/|___/

	Zulfeekar Cheriyampurath °2012;
----------------------------------------------------------------*/
var instance, view, settings;
define([
	  'jQuery'
	, 'Underscore'
	, 'Backbone'
	, 'vgHear/js/views/loaderView'

], function($, _, Backbone, ldrView){

	instance = function(options) {
		view = new ldrView();
		view.render();
		settings = $.extend({
			'container': $("#main"),
			'transition': "fade",
			'speed': 200
		}, options), transition = {
			
			/* Loader manager*/
		};
	
		this.show = function() {
			if(view) $(view.el).animate({opacity:1});
		};

		this.hide = function() {
			if(view) $(view.el).animate({opacity:0});
		};

		this.remove = function() {
			if(this.view) { this.view.deconstruct(); }
		};
	};

	return instance;
	
});
	