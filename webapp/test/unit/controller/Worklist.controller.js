sap.ui.require([
	"sap/ui/demo/bulletinboard/controller/Worklist.controller",
	"sap/ui/model/resource/ResourceModel",
	"sap/ui/base/Event",
	"sap/ui/model/json/JSONModel",
	"sap/m/ListBase",
	"sap/m/ColumnListItem",
	"sap/ui/thirdparty/sinon",
	"sap/ui/thirdparty/sinon-qunit"
], function (WorklistController, ResourceModel, Event, JSONModel, ListBase, ColumnListItem) {
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
				worklistTableTitle: null,
				shareSendEmailSubject: this.oI18n.getResourceBundle().getText("shareSendEmailWorklistSubject"),
				shareSendEmailMessage: this.oI18n.getResourceBundle().getText("shareSendEmailWorklistMessage"),
				selectedPosts: []
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

/*		// Arrangement
		var oEvent = new Event("updateFinished", this.stub, {
			total: 16
		});

		// Action
		this.oController.onUpdateFinished(oEvent);*/
});