/*----------------------------------------------------------------------------------------- 

		**** transitionManager.js ****

		This module is used to manage the transtion beetween internal page.

		The callbackfunction is used to fire the proper page function after transition
		if it's not provided it will fire render()

		It is possible to pass an options obj to the callback

		The animator is setted by default to operate on the #main.
		To overrider this behavior use the setAnimator.

		It will dispatch an event once all th transiitons are done

		by: Federico Weber | federicoweber@gmail.com | 2012


-----------------------------------------------------------------------------------------*/
define([
		'jQuery'
	,	'Underscore'
	,	'Backbone'
	,	'../../models/managers/transitionManagerModel'
	,	'../../pageAnimators/basicOpacity'
	
], function($, _, Backbone,model, basicAnimator){

	var transitionManager = Backbone.View.extend({
		 el: "#container"
		, tagName: "div"
	
		, events: {
		
		}
	
		, initialize: function(){
			this.model = model;
			this.setAnimator(basicAnimator);
		}

		// set the target 
		, setAnimator: function(animator, target, duration){
			this.model.set({"animator" : animator.newAnimator(target ? target: "#main", duration ? duration : 700 )});
		}

		, getAnimator: function(){
			return this.model.get("animator");
		}

		// this function is used to add a new page to the model
		, addPage: function(page){
			if(!this.hasPage(page)){
				this.model.get("pages").push(page);
			}
		}
		
		// this page is used to add a page and transition to it if the page is alreaddy added it just go
		, addPageAndGo: function(page, options, next){
			this.addPage(page);
			this.goToPage(page, options, next);	//pass all the arguments to the goToPage function	
		}
		
		// this is used to directly go to the page
		, goToPage: function(page, options, next){
			if(this.hasPage(page)){
				var that = this
				, callback = "render"
				, animator = this.model.get("animator")
				;
				
				// check the given callback
				if(options && options.callback){
					callback = options.callback;
				}
				
				var transitionIn = function(){
					var that = this;
					//	callback before transition in
					this.model.set({"currentPage": _.indexOf(this.model.get("pages"),page)});
					page[callback](options);

					// transition in and kill animator
					animator.on("transitionInDone", function(){
						this.kill();

						// trigger an vent at the end o the transitions
						that.trigger("transitionsDone");
						next();
					});
					animator.transitionIn(options);
					
				};
			
				// transitionOut
				animator.on("transitionOutDone", transitionIn, this);
				animator.transitionOut(options);
			}
		}

		// This is used to check if the page exist it return a boolean
		, hasPage: function(page){
			return _.indexOf(this.model.get("pages"),page) === -1 ? false : true;
		}

		// This function is used to get the current page view
		, currentPage: function(){
			return this.model.get("pages")[this.model.get("currentPage")];
		}

		// This is used to remove a page
		, removePage: function(page){
			if(this.hasPage(page)){
				var index = _.indexOf(this.model.get("pages"),page);
				this.model.get("pages").splice(index,1);
			}			
		}

	});

	return new transitionManager;
});