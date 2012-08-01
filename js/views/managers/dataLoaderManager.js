/******************************************************************************************

			dataLoaderManager.js | 2012

			Agency: vanGoGh
			Agency URL: http://vangogh-creative.it
			Author: Federico Weber
			Author URL: http://federicoweber.com


			<------------------------------------------------------------->
			
									!!!NOTES!!!

			This is used to load the data from an external source.
			It will add the content to the options

			<------------------------------------------------------------->

******************************************************************************************/

define([
		'jQuery'
	,	'Underscore'
	,	'Backbone'
], function($, _, Backbone){

	var	dataLoaderManager = {};

	dataLoaderManager.loadJson = function(target, options, next){
		jQuery.ajax({
			type: "GET",
			url: options.dataUrl,
			dataType: "json",
			success: function(data){
				options.loadedData = data;
				next();	
			},
			error: function(XMLHttpRequest, textStatus, errorThrown){
				options.loadedData = undefined;
				next();	
			}
		});
	};

	//This is a convenience function to preload images
	dataLoaderManager.preloadAssets = function(target, options, next){;
		if(options.assets){

			var totalNum = options.assets.length
			,	numLoaded = 0
			,	onLoad = function(){
				numLoaded +=1 ;
				if(numLoaded === totalNum){
					next();
				};
			}
			;
			_.each(options.assets,function(url){
				var img = new Image()
				img.onLoad = onLoad();
				img.src = url;
			});
		} else {
			next();
		}
	};

	return dataLoaderManager;
});
	