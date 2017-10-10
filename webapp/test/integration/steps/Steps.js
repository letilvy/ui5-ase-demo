sap.ui.define([
	"jquery.sap.global",
	"sap/ui/test/gherkin/StepDefinitions",
	"sap/ui/test/Opa5"
], function($, StepDefinitions, Opa5) {
	"use strict";

	return StepDefinitions.extend("GherkinWithOPA5.Steps", {
		init: function() {
			this.register(
				/^on the worklist page: I press on the item with the name "(.*?)"$/i,
				function(sName, Given, When, Then) {
					When.onTheWorklistPage.iPressOnTheItemWithTheName(sName);
				}
			);

			this.register(
				/^on the post page: the title should display the name "(.*?)"$/i,
				function(sName, Given, When, Then) {
					Then.onThePostPage.theTitleShouldDisplayTheName(sName);
				}
			);

			this.register(
				/^on the post page: I press on the tab "(.*?)"$/i,
				function(sTab, Given, When, Then) {
					When.onThePostPage.iPressOnTheTabWithTheKey(sTab);
				}
			);
		}
	});

});