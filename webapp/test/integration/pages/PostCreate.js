sap.ui.require([
		'sap/ui/test/Opa5',
		'sap/ui/demo/bulletinboard/test/integration/pages/Common',
		'sap/ui/test/actions/Press'
	],
	function(Opa5, Common, Press) {
		"use strict";

		var sViewName = "PostCreate";

		Opa5.createPageObjects({
			onThePostCreatePage: {
				baseClass: Common,
				actions: {
					iPressOnTheBackButton: function(){
						return this.waitFor({
							id: "page",
							viewName: sViewName,
							actions: new Press(),
							errorMessage: "Can not press the back button on post creation page"
						});
					}
				},
				assertions: {}
			}
		});

	});