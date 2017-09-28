sap.ui.require([
	"sap/ui/demo/bulletinboard/controller/Worklist.controller",
	"sap/ui/core/mvc/View",
	"test/unit/helper/Mockdata",
	"sap/ui/base/Event",
	"sap/m/ListBase"
], function(WorklistController, View, Mockdata, Event, ListBase) {
	"use strict";
	QUnit.module("WorkList", {
		// before: function() {

		// },
		beforeEach: function() {
			/* 1. New oController Object for testing */
			this.oController = new WorklistController();

			/* 2. Stub getView() for returning mock View object */
			var oView = Mockdata.getViewObject();
			sinon.stub(this.oController, "getView").returns(oView);

			/* 3. Stub getI18nModel() */
			var oI18nModel = Mockdata.getI18nModel();
			sinon.stub(this.oController, "getResourceBundle").returns(oI18nModel.getResourceBundle());

		},
		afterEach: function() {
			this.oController.destroy();
		},
		after: function() {
			sinon.stub.restore();
		}
	});

	function workListTitleTestCase(iLength) {
		/* 1. Create oEvent */
		var oListBase = new ListBase();
		var oEvent = new Event("updateFinished", oListBase, {
			total: iLength
		});

		/* 2. Call method under testing with oEvent */
		this.oController.onUpdateFinished(oEvent);

		/* 3. Return value in model*/
		var sWorkListTitle = this.oController.getModel("worklistView").getProperty("/worklistTableTitle");

		return sWorkListTitle;
	}
	
	QUnit.test("Title should be 'Posts (15)' after finishing update when worklist contains 15 items", function(assert) {
		var sActual = workListTitleTestCase.call(this, 15);
		var sExpect = "Posts (15)";
		assert.strictEqual(sActual, sExpect, "Post (15) displayed as list title");
	});

	QUnit.test("Title should be 'Posts' after finishing update when worklist contains 0 items", function(assert) {
		var sActual = workListTitleTestCase.call(this, 0);
		var sExpect = "Posts";
		assert.strictEqual(sActual, sExpect, "Post (15) displayed as list title");
	});

});