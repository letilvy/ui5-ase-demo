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
					},
					iPressExplorerButton: function() {
						return this.waitFor({
							controlType: "sap.m.Button",
							matchers: new PropertyStrictEquals({
								name: "icon",
								value: "sap-icon://explorer"
							}),
							actions: new Press(),
							errorMessage: "The filter button was not found and could not be pressed"
						});
					},
					iPressTheButtonInDialogWithText: function(sText) {
						return this.waitFor({
							searchOpenDialogs: true,
							controlType: "sap.m.Button",
							matchers: new PropertyStrictEquals({
								name: "text",
								value: sText
							}),
							success: function(aButtons) {
								return aButtons.filter(function() {
									return true;
								});
							},
							actions: new Press(),
							errorMessage: "Did not find the Yes button"
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
					},
					theDialogShouldDisplayWithTitle: function(sTitle) {
						return this.waitFor({
							controlType: "sap.m.Dialog",
							matchers: function(oDialog) {
								// return oDialog[0].getProperty("title") === sTitle;
								return oDialog.getTitle() === sTitle;
							},
							success: function() {
								// we set the view busy, so we need to query the parent of the app
								Opa5.assert.ok(true, "The dialog is open");
							},
							errorMessage: "Did not find the dialog control"
						});
					},
					theMessageToastShouldDisplayWithText: function(sText) {
						return this.waitFor({
							viewName: sViewName,  
							matchers: function() {
								return sap.ui.test.Opa5.getJQuery()(".sapMMessageToast").text() === sText; 
							},
							success: function() {
								Opa5.assert.ok(true, "Find a Toast with text" + sText);
							},
							errorMessage: "No Toast message detected!"
						});
					}
				}
			}
		});

	});