sap.ui.require([
    "sap/ui/test/opaQunit"            
	],
    function(opaTest){
		"use strict";
		
		QUnit.module("Post");
		
		opaTest("Should display the Post page when user click a entry of Worklist", function(Given, When, Then){
			//Arrangements
			Given.iStartMyApp();			
			//Actions
			When.onTheWorklistPage.iPressOnTheItemWithTheID("PostID_15");			
			//Assertions
			Then.onThePostPage.theTitleShouldDisplayTheName("Jeans");
		});
		
		opaTest("Should go back to the Worklist Page", function(Given, When, Then){
			//Actions
			When.onThePostPage.iPressTheBackButton();
			//Assertion
			Then.onTheWorklistPage.iShouldSeeTheTable();
		});
		
		opaTest("Should be on the Post page when browser forwards is pressed", function(Given, When, Then){
			//Actions
			When.onTheBrowser.iPressOnTheForwardButton();
			//Assertions
			Then.onThePostPage.theTitleShouldDisplayTheName("Jeans");
		});
		
		opaTest("Should select the statistics tab", function(Given, When, Then){
			//Actions
			When.onThePostPage.iPressOnTheTabWithTheKey("statistics");
			//Assertions
			Then.onThePostPage.iShouldSeeTheViewCounter().
				and.iTeardownMyAppFrame();
		});
	}
);