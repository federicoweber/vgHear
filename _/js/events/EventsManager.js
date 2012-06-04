/*---------------------------------------------------------------- 
	Thanks @Mike Nichols;
	Custom Backbone Event Aggregator /
	Global Events Manager;
	___  _    __   _    
	|_ \ || \ | |  || \ 
	| __]||_|\| |__||_|\
	|___/|___/|___/|___/

	Zulfeekar Cheriyampurath °2012;

----------------------------------------------------------------*/
define([
	'Underscore'
	,'Backbone'
], function(_, Backbone){

	var backbonePrototypes, extensions, self, local, isEligibleForDispatcher; // moved in here to avoid polluting globals
	
	var VGEvent = function() {
	backbonePrototypes = [
		Backbone.Collection.prototype, 
		Backbone.Model.prototype, 
		Backbone.View.prototype,
		Backbone.Router.prototype
	];
	extensions = {
		dispatcher : _.extend({}, Backbone.Events,{cid : 'dispatcher'}),
		wrappedEvents : function(localEvents) {
			local = localEvents || _.extend({},Backbone.Events);
			isEligibleForDispatcher = function (source) {
			  return !((source instanceof Backbone.Model) && (source.collection instanceof Backbone.Collection));
			}
			return {            
				dispatcher : VGEvent.dispatcher,            
				trigger : function() {
					if (this._callbacks) {
						local.trigger.apply(this, arguments);
					}
					if (isEligibleForDispatcher(this)) {
					  VGEvent.dispatcher.trigger.apply(VGEvent.dispatcher, arguments);
					}                
					return this;            
				}
			};
		},
		extendBackbone : function () {
		  self = this;
		  if (self.isExtended) {
			  return;
		  }
		  _.each(backbonePrototypes, function (proto) {
			  _.extend(proto,  self.wrappedEvents());
		  });
		},
		callIfFunction:function(args){

			if((typeof args[args.length -1]) === "function" ){
				args[args.length -1]();
			}
		}
	 };
	 return extensions;
}();

	VGEvent.VGEVENT_GLOBALS = {	// add all the vars in here
		AppIsBusy : 'ApplicationIsBusy'
	,	AppIsNotBusy : "ApplicationIsNotBusy"
	,	FImageLoaded : "FlippedImageLoaded"
	,	OwnerDataResponse : "OwnerDataResponse"
	,	AddFriendDataResponse : "AddFriendDataResponse"
	,	UserConnectedToFB : "UserConnectedToFB"
	,	isBusy : function(msg){
						VGEvent.dispatcher.trigger(VGEvent.VGEVENT_GLOBALS.AppIsBusy,{ message : (msg) ? msg : 'App is busy' }); 
						// run the next callback
						VGEvent.callIfFunction(arguments);
					}
	,	isNotBusy : function(msg){
						VGEvent.dispatcher.trigger(VGEvent.VGEVENT_GLOBALS.AppIsNotBusy,{ message : (msg) ? msg : 'App is not busy' });
						// run the next callback
						VGEvent.callIfFunction(arguments);
					}
	,	flippedImageLoaded : function(msg){
						VGEvent.dispatcher.trigger(VGEvent.VGEVENT_GLOBALS.FImageLoaded,{ message : (msg) ? msg : 'flipped image Loaded' });
						// run the next callback
						VGEvent.callIfFunction(arguments);
					}
	,	ownerDataResponse : function(msg){
						VGEvent.dispatcher.trigger(VGEvent.VGEVENT_GLOBALS.OwnerDataResponse,{ message : (msg) ? msg : 'owner Data Response' });
						// run the next callback
						VGEvent.callIfFunction(arguments);
					}
	,	addFriendDataResponse : function(msg){
						VGEvent.dispatcher.trigger(VGEvent.VGEVENT_GLOBALS.AddFriendDataResponse,{ message : (msg) ? msg : 'add friend Data Response' });
						// run the next callback
						VGEvent.callIfFunction(arguments);
					}
	,	userConnectedToFB : function(msg){
						VGEvent.dispatcher.trigger(VGEvent.VGEVENT_GLOBALS.UserConnectedToFB,{ message : (msg) ? msg : 'user connected to FB Response' });
						// run the next callback
						VGEvent.callIfFunction(arguments);
					}
	};
	VGEvent.extendBackbone();

	return VGEvent;
});	 