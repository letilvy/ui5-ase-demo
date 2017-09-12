sap.ui.define([
	"jquery.sap.global",
	"sap/ui/test/gherkin/StepDefinitions",
	"sap/ui/test/Opa5",
	"sap/ui/test/actions/EnterText"
], function($, StepDefinitions, Opa5, EnterText) {
	"use strict";

	return StepDefinitions.extend("GherkinWithOPA5.Steps", {
		init: function() {
			var opa5 = new Opa5();

			this.register(/i search for (.*?)$/, function(sTerm) {
				opa5.waitFor({
					id: "searchField",
					viewName: "Worklist",
					actions: new EnterText({
						text: sTerm
					}),
					errorMessage: "SearchField was not found."

				});
			});

			/*this.register(/^I start my app$/i, function() {
				oOpa5.iStartMyAppInAFrame("Website.html");
			});

			this.register(/^I can see the \d dataTableUtils life saving button$/i, function(number) {
				oOpa5.waitFor({
					id: "life-saving-button",
					success: function(oButton) {
						Opa5.assert.strictEqual(oButton.getText(), "Save a Lemming",
							"Verified that we can see the life saving button");
					}
				});
			});*/
		}
	});

});