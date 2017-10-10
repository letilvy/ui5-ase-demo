sap.ui.require([
		'sap/ui/test/Opa5',
		'sap/ui/test/matchers/Properties',
		'sap/ui/demo/bulletinboard/test/integration/pages/Common'
	],
	function(Opa5, Properties, Common) {
		"use strict";

		var sViewName = "Post";

		Opa5.createPageObjects({
			onThePostPage: {
				baseClass: Common,
				actions: {},
				assertions: {}
			}
		});
	});