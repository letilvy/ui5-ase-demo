/*global history*/

sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/demo/bulletinboard/model/formatter",
	"sap/ui/demo/bulletinboard/model/FlaggedType",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (Controller, JSONModel, formatter, FlaggedType, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("sap.ui.demo.bulletinboard.controller.Worklist", {
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
			var iTotalCount = oEvent.getParameter("total");
			var oViewModel = this.getViewModel();

			var sTableTitle = iTotalCount === 0 ? this.getResourceBundle().getText("worklistTableTitle") :
				this.getResourceBundle().getText("worklistTableTitleCount", iTotalCount);

			oViewModel.setProperty("/worklistTableTitle", sTableTitle);

		},

		onPress: function (oEvent) {
			sap.ui.core.UIComponent.getRouterFor(this).navTo("post", {
				postId: oEvent.getSource().getBindingContext().getProperty("PostID")
			});

		},

		onShareEmailPress: function () {
			// Exercise 2
			var oViewModel = this.getViewModel();
			var sSubject = oViewModel.getProperty("/shareSendEmailSubject");
			var sMessage = oViewModel.getProperty("/shareSendEmailMessage");

			var oTable = this.byId("table");
			var aSelectedItems = oTable.getSelectedItems();

			aSelectedItems.forEach(function (oItem) {
				var oProperty = oItem.getBindingContext().getProperty();
				sMessage = sMessage + " \n " + oProperty.Title + "    " + oProperty.Price + "    " + oProperty.Currency;
			});

			sap.m.URLHelper.triggerEmail("", sSubject, sMessage);
		},

		getResourceBundle: function () {
			return this.getOwnerComponent().getModel("i18n").getResourceBundle();
		},
		getViewModel: function () {
			return this.getView().getModel("worklistView");
		}

	});

});