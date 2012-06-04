/*----------------------------------------------------------------------------------------- 

  This framework is based on the article http://backbonetutorials.com/organizing-backbone-using-modules/?a

  Setup all the dependencies here 

  !Cause handlebars does not officially support AMD we are loading it outside!

-----------------------------------------------------------------------------------------*/


require.config({
  paths: {
    //libraries aliases
    jQuery: '_/js/libs/jquery/jqueryModule'
    , Easing: '_/js/libs/jquery/jqueryEasingModule'
    , Underscore: '_/js/libs/underscore/underscoreModule'
    , Backbone: '_/js/libs/backbone/backboneModule'
    //require js plugin aliases
    , order: '_/js/libs/requirejs-plugins/order'
    , text: '_/js/libs/requirejs-plugins/text'

  }
  , baseUrl: ''

});

require([
  'app/js/app'
  // Some plugins have to be loaded in order due to there non AMD compliance
  , 'order!_/js/libs/json2/json2'
  , 'order!_/js/libs/jquery/jquery-1.7.1.min'
  , 'order!_/js/libs/jquery/jquery.easing.1.3'
  , 'order!_/js/libs/underscore/underscore'
  , 'order!_/js/libs/backbone/backbone'

], function(App){
  App.init();
});