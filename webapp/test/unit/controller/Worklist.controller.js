sap.ui.require([
	"sap/ui/demo/bulletinboard/controller/Worklist.controller",
	"sap/ui/base/ManagedObject",
	"sap/ui/model/json/JSONModel",
	"sap/ui/thirdparty/sinon",
	"sap/ui/thirdparty/sinon-qunit"
], function(Worklist, ManagedObject, JSONModel){
	"use strict";

	QUnit.module("Worklist Controller", {
		before: function(){
		},

		beforeEach: function(){
			this.oWl = new Worklist();
			this.oComponent = new ManagedObject();
			sinon.stub(this.oWl, "getOwnerComponent").returns(this.oComponent);
		},

		afterEach: function(){
			this.oWl.destroy();
		}
	});

	QUnit.test("Test Worklist controller here", function(assert){
		assert.ok(false);
	});
});