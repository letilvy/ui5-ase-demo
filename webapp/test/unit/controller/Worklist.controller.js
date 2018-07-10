sap.ui.require([
	"sap/ui/demo/bulletinboard/controller/Worklist.controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/resource/ResourceModel",
	"sap/ui/thirdparty/sinon",
	"sap/ui/thirdparty/sinon-qunit"
], function (WorklistController, JSONModel, ResourceModel) {

	"use strict";

	QUnit.module("Worklist Controller", {
		before: function () {

			this.oI18NModel = new ResourceModel({
				bundleName: "sap.ui.demo.bulletinboard.i18n.i18n",
				bundleLocale: "en"
			});
		},
		beforeEach: function () {
			this.oController = new WorklistController();

			var oViewModel = new JSONModel({
				worklistTableTitle: ""
			});
			sinon.stub(this.oController, "getViewModel").returns(oViewModel);
			sinon.stub(this.oController, "getResourceBundle").returns(this.oI18NModel.getResourceBundle());
		},
		afterEach: function () {
			this.oController.getViewModel.restore();
			this.oController.getResourceBundle.restore();
			this.oController.destroy();
		}
	});

	function _makeupEventTableUpdateFinished(mParameters) {

		var oEvent = {
			getParameter: function (sParameter) {
				switch (sParameter) {
				case "total":
					return mParameters.total;
				default:
					return null;
				}
			}
		};

		return oEvent;

	}

	QUnit.test("Should table title display 'Posts (16)' when table contains 16 items", function (assert) {
		// Arrangement
		var oEvent = _makeupEventTableUpdateFinished.call(this, {
			total: 16
		});

		// Action
		this.oController.onUpdateFinished(oEvent);

		// Assertion
		var sAct = this.oController.getViewModel().getProperty("/worklistTableTitle");
		assert.strictEqual(sAct, "Posts (16)", "Title is correct!");
	});

	QUnit.test("Should table title display 'Posts' when table contains 0  items", function (assert) {
		// Arrangement
		var oEvent = _makeupEventTableUpdateFinished.call(this, {
			total: 0
		});

		// Action
		this.oController.onUpdateFinished(oEvent);

		// Assertion
		var sAct = this.oController.getViewModel().getProperty("/worklistTableTitle");
		assert.strictEqual(sAct, "Posts", "Title is correct!");
	});

});