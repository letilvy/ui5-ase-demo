sap.ui.require(
	[
		"sap/ui/demo/bulletinboard/model/utils",
		"sap/m/MessageBox",
		"sap/ui/thirdparty/sinon",
		"sap/ui/thirdparty/sinon-qunit"
	],
	function (utils, MessageBox) {
		"use strict";
		
		/*QUnit.module("Sinon - difference between stub and spy");
		
		QUnit.test("Should show warning message box when error code is even", function(assert){
			this.stub(MessageBox, "show");
			utils.errorHandler(2);
			assert.strictEqual(MessageBox.show.getCall(0).args[1].icon, "WARNING", "Message box type is correct");
		});
		
		QUnit.test("Should show error message box when error code is odd", function(assert){
			var oSpy = this.spy(MessageBox, "show");
			utils.errorHandler(3);
			//assert.strictEqual(MessageBox.show.getCall(0).args[1].icon, "ERROR", "Message box type is correct");
			assert.ok(oSpy.calledWith(sinon.match.string, sinon.match({icon:"ERROR"})), "Message box type is correct");
		});*/
	});