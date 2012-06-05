/*----------------------------------------------------------------------------------------- 

  This framework is based on the article http://backbonetutorials.com/organizing-backbone-using-modules/?a

  Setup all the dependencies here 

  !Cause handlebars does not officially support AMD we are loading it outside!

-----------------------------------------------------------------------------------------*/


require.config({
  paths: {
    //libraries aliases
    jQuery: 'vgHear/js/libs/jquery/jqueryModule'
    , Easing: 'vgHear/js/libs/jquery/jqueryEasingModule'
    , Underscore: 'vgHear/js/libs/underscore/underscoreModule'
    , Backbone: 'vgHear/js/libs/backbone/backboneModule'
    //require js plugin aliases
    , order: 'vgHear/js/libs/requirejs-plugins/order'
    , text: 'vgHear/js/libs/requirejs-plugins/text'

  }
  , baseUrl: ''

});

require([
  'app/js/app'
  // Some plugins have to be loaded in order due to there non AMD compliance
  , 'order!vgHear/js/libs/json2/json2'
  , 'order!vgHear/js/libs/jquery/jquery-1.7.1.min'
  , 'order!vgHear/js/libs/jquery/jquery.easing.1.3'
  , 'order!vgHear/js/libs/underscore/underscore'
  , 'order!vgHear/js/libs/backbone/backbone'

], function(App){
  App.init();
});