sap.ui.require([
	"sap/ui/demo/bulletinboard/controller/Worklist.controller",
	"test/unit/helper/Mockdata",
	"sap/ui/base/Event"
], function(WorklistController, Mockdata, Event) {
	"use strict";
	QUnit.module("WorkList", {
		beforeEach: function() {
			/* 1. New oController Object for testing */
			this.oController = new WorklistController();

			/* 2. Stub getModel() for returning mock model object */
			var oModel = Mockdata.getModelObject("worklistView");
			sinon.stub(this.oController, "getModel").returns(oModel);

			/* 3. Stub getI18nModel() */
			var oI18nModel = Mockdata.getI18nModel();
			sinon.stub(this.oController, "getResourceBundle").returns(oI18nModel.getResourceBundle());

		},
		afterEach: function() {
			this.oController.destroy();
		}
	});

	function workListTitleTestCase(iLength) {
		/* 1. Create oEvent */
		var oEvent = new Event("updateFinished", this.stub, {
			total: iLength
		});

		/* 2. Call method under testing with oEvent */
		this.oController.onUpdateFinished(oEvent);

		/* 3. Return value in model*/
		var sWorkListTitle = this.oController.getModel("worklistView").getProperty("/worklistTableTitle");

		return sWorkListTitle;
	}

	QUnit.test("Should title display 'Posts (15)' after finishing update When worklist contains 15 items", function(assert) {
		var sActual = workListTitleTestCase.call(this, 15);
		var sExpect = "Posts (15)";
		assert.strictEqual(sActual, sExpect, "Post (15) displayed as list title");
	});

	QUnit.test("Should title display 'Posts' after finishing update When worklist contains 0 items", function(assert) {
		var sActual = workListTitleTestCase.call(this, 0);
		var sExpect = "Posts";
		assert.strictEqual(sActual, sExpect, "Posts displayed as list title");
	});

});