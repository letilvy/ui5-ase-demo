/*global QUnit*/
sap.ui.require(["sap/ui/test/opaQunit"],function(opaTest){
	"use strict";
	QUnit.module("Worklist");
	opaTest("Should popup dialog When press explorer button", function(Given, When, Then){
		// Arrangements
		Given.iStartMyApp();
		
		//Actions		
		When.onTheWorklistPage.iPressExplorerButton();
		
		// Assertions		
		Then.onTheWorklistPage.theDialogShouldDisplayWithTitle("Make a choice");
	});    

	opaTest("Should show message toast with text 'SAPUI5' When press 'I love SAPUI5' button", function(Given, When, Then){ 
		
		//Actions		
		When.onTheWorklistPage.iPressTheButtonInDialogWithText("I love SAPUI5 !");
		
		// Assertions		
		Then.onTheWorklistPage.theMessageToastShouldDisplayWithText("SAPUI5");
	}); 

	opaTest("Should show message toast with text 'ABAP' When press 'I love ABAP' button", function(Given, When, Then){ 
		
		//Actions		
		When.onTheWorklistPage.iPressExplorerButton().and.iPressTheButtonInDialogWithText("I love ABAP !");
		
		// Assertions		
		Then.onTheWorklistPage.theMessageToastShouldDisplayWithText("ABAP").and.iTeardownMyAppFrame();
	}); 	
});