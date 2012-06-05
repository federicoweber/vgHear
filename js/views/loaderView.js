/*---------------------------------------------------------------- 
	Loader View 
	___  _    __   _    
	|_ \ || \ | |  || \ 
	| __]||_|\| |__||_|\
	|___/|___/|___/|___/

	Zulfeekar Cheriyampurath °2012;
----------------------------------------------------------------*/
var instance;
define([
	'jQuery'
	,	'Underscore'
	,	'Backbone'
], function($, _, Backbone){

	instance = Backbone.View.extend({
		initialize: function(){
		}
		,el: $('#loader')
		, defaults:{
			'name': 'loader'
			,'id': null
		},
		render:function(){
			
			$(this.el).html('<div id="ourLoader"><img src="app/img/Spinner.gif"></div>');
		},
		destroy:function(){
			
		}
	});
	
	return instance;	
	
});
	