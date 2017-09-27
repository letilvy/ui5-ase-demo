sap.ui.define([
	// 'sap/ui/demo/bulletinboard/controller/BaseController',
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/demo/bulletinboard/model/formatter",
	"sap/ui/core/routing/History"
], function(Controller, JSONModel, formatter, History) {
	"use strict";

	return Controller.extend("sap.ui.demo.bulletinboard.controller.Post", {

		formatter: formatter,

		onInit: function() {

			var oViewModel = new JSONModel({
				busy: false
			});
 
			sap.ui.core.UIComponent.getRouterFor(this).getRoute("post").attachPatternMatched(this._onPostMatched, this);
			this.getView().setModel(oViewModel, "postView");
		},

		onNavBack: function() {
			// this.myNavBack("worklist");
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				// The history contains a previous entry
				history.go(-1);
			} else {
				// Otherwise we go backwards with a forward history 
				sap.ui.core.UIComponent.getRouterFor(this).navTo("worklist", "", true);
			}
		},

		_onPostMatched: function(oEvent) {
			var oViewModel = this.getView().getModel("postView"),
				oDataModel = this.getView().getModel();

			this.getView().bindElement({
				path: "/Posts('" + oEvent.getParameter("arguments").postId + "')",
				events: {
					dataRequested: function() {
						oDataModel.metadataLoaded().then(function() {
							oViewModel.setProperty("/busy", true);
						});
					},
					dataReceived: function() {
						oViewModel.setProperty("/busy", false);
					}
				}
			});
		}

	});

});