/*----------------------------------------------------------------------------------------- 

		transitionManageModel.js 
		by: Federico Weber | federicoweber@gmail.com

		
-----------------------------------------------------------------------------------------*/

define([
		'jQuery'
	,	'Underscore'
	,	'Backbone'
], function($, _, Backbone){

	var	transitionManageModel = Backbone.Model.extend({
		initialize: function(){
			
		}
		, defaults:{
				'test': 'test'
			,	'pages': []
			,	'currentPage': -1
		}

	});

	return new transitionManageModel;
});
	