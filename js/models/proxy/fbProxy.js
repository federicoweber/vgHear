/******************************************************************************************

			fbProxy.js | 2012

			Agency: vanGoGh
			Agency URL: http://vangogh-creative.it
			Author: Federico Weber
			Author URL: http://federicoweber.com


			<--------------------------------------------------------------------->
			
									!!!NOTES!!!

			This is is te bridge between facebook graph api and vgHear framework

			To init the proxy an object fbConfig must be pased.
			if status, cookie and xfbml ar not passed the default value is set to true.
			The init function will return a response onbject containing the status and the
			user model if connected.

			fbConfig{
				appId : 'YOUR_APP_ID' // App ID
			,	channelUrl : '//WWW.YOUR_DOMAIN.COM/channel.html' // Channel File
			,	status : true // check login status
			,	cookie : true // enable cookies to allow the server to access the session
			,	xfbml : true  // parse XFBML
			}

			<--------------------------------------------------------------------->

******************************************************************************************/

define([
		'jQuery'
	,	'Underscore'
	,	'Backbone'
], function($, _, Backbone){

	var userDataModel = Backbone.Model.extend({
		defaults: {
				"accessToken": ""
	  		,	"id": ""
	  		,	"name": "" 
	  		,	"first_name": ""
	  		,	"last_name": "" 
	  		,	"link": ""
	  		,	"username": ""
	  		,	"gender": ""
	  		,	"timezone": 0
	  		,	"locale": ""
	  		,	"verified": true
	  		,	"updated_time": ""
	  		,	"type": "user"
		}
	});
	var	fbProxy = 	{

		// This is used to get the logged user data. it will return and chache the user data 
		getUserData: function(callback, options){
			if(!fbProxy.userData){
				FB.api('/me', function(res) {
					if(res.error){
						callback(res.error)
					} else {
						fbProxy.userData = new userDataModel(res);
						fbProxy.userData.set(options.user);
						fbProxy.userData.set({profilePic: 'https://graph.facebook.com/'+res.id+'/picture?type=large'});
						fbProxy.userData.set({profilePicSmall: 'https://graph.facebook.com/'+res.id+'/picture'});

						callback(null, {'status': 'connected', 'user': fbProxy.userData});
					}
				});
			} else {
				callback(null, {'status': 'connected', 'user': fbProxy.userData});
			}
		}

		// this must be called to load the facebook sdk
	,	init: function(callback, options){
			if(options.fbConfig){
				//add the fb-root div
				$('body').prepend('<div id="fb-root"></div>');

				//Async fb SDK init
				window.fbAsyncInit = function() {
					FB.init({
						appId : options.fbConfig.appId
					,	channelUrl : options.fbConfig.channelUrl 
					,	cookie : options.fbConfig.cookie ? options.fbConfig.cookie : true 
					,	xfbml : options.fbConfig.xfbml ? options.fbConfig.xfbml : true  
					,	status : true 
					});

					FB.getLoginStatus(function(res) {
						console.log("get login status")
						if (res.status === 'connected') {

							//cache the user data
							fbProxy.getUserData(callback, {
									"status": "connected"
								,	"user":{
										"accessToken": res.authResponse.accessToken
									,	"expiresIn":  res.authResponse.expiresIn
									,	"signedRequest":  res.authResponse.signedRequest
									,	"id": res.authResponse.userID
								}
							});

						} else if (res.status === 'not_authorized') {
							callback(null, {'status': 'not_authorized'});
						} else {
							callback(null, {'status': 'not_logged'});
						}

					});
				};


				// Load the SDK Asynchronously
				var e = document.createElement('script');
				e.type = 'text/javascript';
				e.src = document.location.protocol +'//connect.facebook.net/en_US/all.js';
				e.async = true;
				$('#fb-root').append(e);

			} else {
				callback("we need the fbConfig");
				throw "we need the fbConfig"
			}


		}

	// this is used to log the user into facebook, a scope can be passed inside options to requesta additional informations
	,	login: function(callback, options){
			var options = options ? options : {}
			FB.login(function(res) {
				if (res.authResponse) {
					console.log('Welcome!  Fetching your information.... ');
					fbProxy.getUserData(callback, {
							"status": "connected"
						,	"user":{
								"accessToken": res.authResponse.accessToken
							,	"expiresIn":  res.authResponse.expiresIn
							,	"signedRequest":  res.authResponse.signedRequest
							,	"id": res.authResponse.userID
						}
					});
				} else {
					callback("user_reject_auth");

				}
			}, options);
		}	

	// this is used to post a message to the user wall
	// for the list of possible data to send see https://developers.facebook.com/docs/reference/dialogs/feed/#graphapicall
	,	directPostToWall: function(callback, options){
			if(options.data){
				FB.api('/me/feed', 'post', options.data, function(response) {
					if (!response || response.error) {
						callback(response.error);
					} else {
						callback(null, options);
					}
				});
			} else {
				callback("missing_data")
			}
		}

	// this is used to post a message to the user wall with prompt
	,	postToWall: function(callback, options){
			if(options.data){
				options.data.method = 'feed';
				FB.ui(options.data, function(response) {
					if (!response || response.error) {
						callback(response.error);
					} else {
						callback(null, options);
					}
				});
			} else {
				callback("missing_data")
			}
		}
	};

	return fbProxy;
});