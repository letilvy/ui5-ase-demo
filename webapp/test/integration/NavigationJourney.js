sap.ui.require([
	"sap/ui/test/opaQunit",
	"sap/ui/demo/bulletinboard/localService/mockserver"
], function(opaTest, mockserver){

	"use strict";

	mockserver.init();

	opaTest("Should navigate to post page, when user click one item in the worklist", function(Given, When, Then){
		//Arrangement
		Given.iStartMyUIComponent({
			componentConfig: {
				name: "sap.ui.demo.bulletinboard"
			}
		});

		//Action
		When.onTheWorklistPage.iPressOnTheItemWithID("PostID_10");

		//Assertion
		Then.onThePostPage.iShouldSeePageHeaderIs("Bike Rack");
	});

});