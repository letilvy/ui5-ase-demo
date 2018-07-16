/*global history*/

sap.ui.define([
	"sap/ui/demo/bulletinboard/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ui/demo/bulletinboard/model/formatter",
	"sap/ui/demo/bulletinboard/model/FlaggedType",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (BaseController, JSONModel, formatter, FlaggedType, Filter, FilterOperator) {
	"use strict";

	return BaseController.extend("sap.ui.demo.bulletinboard.controller.Worklist", {
		types: {
			flagged: new FlaggedType()
		},

		formatter: formatter,

		onInit: function () {
			var oViewModel,
				iOriginalBusyDelay,
				oTable = this.byId("table");

			iOriginalBusyDelay = oTable.getBusyIndicatorDelay();

			// Model used to manipulate control states
			oViewModel = new JSONModel({
				worklistTableTitle: this.getResourceBundle().getText("worklistTableTitle"),
				shareSendEmailSubject: this.getResourceBundle().getText("shareSendEmailWorklistSubject"),
				shareSendEmailMessage: this.getResourceBundle().getText("shareSendEmailWorklistMessage"),
				tableBusyDelay: 0
			});
			this.getView().setModel(oViewModel, "worklistView");

			oTable.attachEventOnce("updateFinished", function () {
				// Restore original busy indicator delay for worklist's table
				oViewModel.setProperty("/tableBusyDelay", iOriginalBusyDelay);
			});
		},

		onUpdateFinished: function (oEvent) {
			// Exercise 1
		},

		onPress: function (oEvent) {
			sap.ui.core.UIComponent.getRouterFor(this).navTo("post", {
				postId: oEvent.getSource().getBindingContext().getProperty("PostID")
			});

		},

		onShareEmailPress: function () {
			// Exercise 2
		}

	});

});