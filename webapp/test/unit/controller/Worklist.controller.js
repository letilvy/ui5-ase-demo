sap.ui.require([
	"sap/ui/demo/bulletinboard/controller/Worklist.controller",
	"sap/ui/model/resource/ResourceModel",
	"sap/ui/base/Event",
	"sap/ui/model/json/JSONModel",
	"sap/ui/thirdparty/sinon",
	"sap/ui/thirdparty/sinon-qunit"
], function (WorklistController, ResourceModel, Event, JSONModel) {
	"use strict";
	QUnit.module("Worklist Controller", {
		before: function () {
						this.oI18n = new ResourceModel({
				bundleName: "sap.ui.demo.bulletinboard.i18n.i18n",
				bundleLocale: "en"
			});
		},
		beforeEach: function () {
			this.oController = new WorklistController();
			sinon.stub(this.oController, "getResourceBundle").returns(this.oI18n.getResourceBundle());

			this.oViewModel = new JSONModel({
				worklistTableTitle: null
			});
			sinon.stub(this.oController, "getViewModel").returns(this.oViewModel);
		},
		afterEach: function () {
			sinon.restore();
			this.oViewModel.destroy();
			this.oController.destroy();
		},
		after: function () {
			this.oI18n.destroy();
		}
	});

	QUnit.test("Should table title display as 'Posts (16)' when the table contains 16 items", function (assert) {
		// Arrangement
		var oEvent = new Event("updateFinished", this.stub, {
			total: 16
		});

		// Action
		this.oController.onUpdateFinished(oEvent);

		// Assertion
		var sAct = this.oViewModel.getProperty("/worklistTableTitle");
		assert.strictEqual(sAct, "Posts (16)", "Table title: Posts (16)");

	});
	QUnit.test("Should table title display as 'Posts' when the table contains no item", function (assert) {
		// Arrangement
		var oEvent = new Event("updateFinished", this.stub, {
			total: 0
		});

		// Action
		this.oController.onUpdateFinished(oEvent);

		// Assertion
		var sAct = this.oViewModel.getProperty("/worklistTableTitle");
		assert.strictEqual(sAct, "Posts", "Table title:Posts");
	});
});