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

			this.register(/I start my app$/, function () {
				opa5.iStartMyUIComponent({
					componentConfig: {
						name: "sap.ui.demo.bulletinboard"
					}
				});
			});

			this.register(/on the worklist page: I look at the screen$/, function () {
				return this;
			});

			this.register(/on the worklist page: the title should display the total amount of items$/, function () {
				opa5.waitFor({
					id: "tableHeader",
					viewName: "Worklist",
					matchers: function (oPage) {
						var sExpectedText = oPage.getModel("i18n").getResourceBundle().getText("worklistTableTitleCount", [23]);
						return new sap.ui.test.matchers.PropertyStrictEquals({
							name: "text",
							value: sExpectedText
						}).isMatching(oPage);
					},
					success: function () {
						Opa5.assert.ok(true, "The table header shows 23 items");
					},
					errorMessage: "The Table's header does not contains the number of items: 23"
				});
			});
		}
	});

});