sap.ui.require([
		'sap/ui/test/Opa5',
		'sap/ui/test/matchers/AggregationLengthEquals',
		'sap/ui/test/matchers/PropertyStrictEquals',
		'sap/ui/demo/bulletinboard/test/integration/pages/Common'
	],
	function(Opa5,
		AggregationLengthEquals,
		PropertyStrictEquals,
		Common) {
		"use strict";

		var sViewName = "Worklist";

		Opa5.createPageObjects({
			onTheWorklistPage: {
				baseClass: Common,
				actions: {
					iPressOnTheItemWithTheID: function(sId) {
						/* matchers: new BindingPath() */
					}
				},
				assertions: {
					iShouldSeeTheTable: function() {}
				}
			}
		});

	});