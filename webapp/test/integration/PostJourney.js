/*global QUnit*/

sap.ui.require(
	["sap/ui/test/opaQunit"],
	function (opaTest) {
		"use strict";

		QUnit.module("Post");

		opaTest("Should see the post page when a user clicks on an entry of the list", function (Given, When, Then) {
			// Arrangements
			Given.iStartMyApp();

			//Actions
			When.onTheWorklistPage.iPressOnTheItemWithTheID("PostID_15");

			// Assertions
			Then.onThePostPage.theTitleShouldDisplayTheName("Jeans");
		});

		opaTest("Should go back to the TablePage", function (Given, When, Then) {

			// Actions
			When.onThePostPage.iPressTheBackButton();

			// Assertions
			Then.onTheWorklistPage.iShouldSeeTheTable().and.iTeardownMyAppFrame();
		});

		QUnit.module("Post - start from post detail page");

		opaTest("Should see view statistics of 'PostID_15'  when a user start app with given hash", function (Given, When, Then) {
			// Arrangements
			Given.iStartMyApp({
				delay: 0,
				hash: "/Post/PostID_15/infotype?tab=statistics"
			});

			// Assertions
			Then.onThePostPage.theTitleShouldDisplayTheName("Jeans").and.theIconViewInfoIsSelected().and.iTeardownMyAppFrame();

		});

	}
);