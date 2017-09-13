sap.ui.require([
	"sap/ui/test/opaQunit"
], function (opaTest){
	"use strict";

	QUnit.module("Post Create");

	opaTest("Should navigate back to post list page when user click back button on post creation page", function(Given, When, Then){
		// Arrangements
		Given.iStartMyApp({
			delay: 0,
			hash: "PostCreate"
		});

		//Actions
		When.onThePostCreatePage.iPressOnTheBackButton();

		// Assertions
		Then.onTheWorklistPage.iShouldSeeTheTable();
	});
});