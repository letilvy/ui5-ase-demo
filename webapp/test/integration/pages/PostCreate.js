sap.ui.require([
		'sap/ui/test/Opa5',
		'sap/ui/demo/bulletinboard/test/integration/pages/Common'
	],
	function(Opa5, Common) {
		"use strict";

		Opa5.createPageObjects({
			onThePostCreatePage: {
				baseClass: Common,
				actions: {},
				assertions: {}
			}
		});

	});