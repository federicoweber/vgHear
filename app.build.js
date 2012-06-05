({
    appDir: "",
    baseUrl: '../',
    dir: "../app-build/",
    modules: [
        {
            name: "vgHear/js/main"
        }
    ],
     paths: {
	    //libraries aliases
	    jQuery: 'vgHear/js/libs/jquery/jqueryModule'
	    , Underscore: 'vgHear/js/libs/underscore/underscoreModule'
        , Backbone: 'vgHear/js/libs/backbone/backboneModule'
        // , MediaElement: 'vgHear/js/libs/mediaelement/mediaModule'
        , order: 'vgHear/js/libs/requirejs-plugins/order'
    	, text: 'vgHear/js/libs/requirejs-plugins/text'
	}
})