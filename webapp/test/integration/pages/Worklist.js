sap.ui.require([
		'sap/ui/test/Opa5',
		'sap/ui/test/matchers/AggregationLengthEquals',
		'sap/ui/test/matchers/PropertyStrictEquals',
		'sap/ui/test/matchers/BindingPath',
		'sap/ui/demo/bulletinboard/test/integration/pages/Common',
		'sap/ui/test/actions/Press'
	],
	function(Opa5,
		AggregationLengthEquals,
		PropertyStrictEquals,
		BindingPath,
		Common,
		Press) {
		"use strict";

		var sViewName = "Worklist",
			sTableId = "table";

		Opa5.createPageObjects({
			onTheWorklistPage: {
				baseClass: Common,
				actions: {
					iPressOnTheItemWithTheID: function(sId) {
						return this.waitFor({
							controlType: "sap.m.ColumnListItem",
							viewName: sViewName,
							matchers: new BindingPath({
								path: "/Posts('" + sId + "')"
							}),
							actions: new Press(),
							errorMessage: "No list item with the ID " + sId + " was found."
						});
					}
				},
				assertions: {
					iShouldSeeTheTable: function() {
						return this.waitFor({
							id: sTableId,
							viewName: sViewName,
							success: function() {
								Opa5.assert.ok(true, "The table is visible");
							},
							errorMessage: "Was not able to see the table."
						});
					}
				}
			}
		});

	});