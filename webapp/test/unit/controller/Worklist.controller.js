sap.ui.require([
	"sap/ui/demo/bulletinboard/controller/Worklist.controller" 
], function(WorklistController) {
	"use strict";
	QUnit.module("WorkList", {
		beforeEach: function() {
			this.oController = new WorklistController();
		},
		afterEach: function() {
			this.oController.destroy();
		},
		after: function() {
			this.stub.restore();
		}
	});
	QUnit.test("Test case 1 ", function(assert) { 
		assert.ok(true);
	});
});