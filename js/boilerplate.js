/*----------------------------------------------------------------------------------------- 

Use this as a refrence for creating new modules

-----------------------------------------------------------------------------------------*/

define([
	// These are path alias that we configured in our bootstrap
	'jQuery'
	,	'Underscore'
	,	'Backbone'
    ,	'MediaElement'
], function($, _, Backbone, media){
	var moduleName = {};    
	// Above we have passed in jQuery, Underscore and Backbone
	// They will not be accesible in the global scope
	
	return new moduleName;
	// What we return here will be used by other modules
});