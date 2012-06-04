({
    appDir: "",
    baseUrl: '../',
    dir: "../app-build/",
    modules: [
        {
            name: "_/js/main"
        }
    ],
     paths: {
	    //libraries aliases
	    jQuery: '_/js/libs/jquery/jqueryModule'
	    , Underscore: '_/js/libs/underscore/underscoreModule'
        , Backbone: '_/js/libs/backbone/backboneModule'
        // , MediaElement: '_/js/libs/mediaelement/mediaModule'
        , order: '_/js/libs/requirejs-plugins/order'
    	, text: '_/js/libs/requirejs-plugins/text'
	}
})