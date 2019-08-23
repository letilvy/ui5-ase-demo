sap.ui.require([
	"sap/ui/demo/bulletinboard/controller/Worklist.controller",
	"sap/ui/model/resource/ResourceModel",
	"sap/ui/model/json/JSONModel"
], function (WorklistController, ResourceModel, JSONModel) {
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
			sinon.stub(this.oController, "getModel").withArgs("worklistView").returns(this.oViewModel);
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

	QUnit.test("", function (assert) {

	});