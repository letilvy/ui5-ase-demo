sap.ui.define([
               'sap/ui/demo/bulletinboard/controller/BaseController',
               'sap/ui/model/json/JSONModel',
               'sap/ui/demo/bulletinboard/model/formatter'
	], function(BaseController, JSONModel, formatter){
	
	"use strict";
	
	return BaseController.extend("sap.ui.demo.bulletinboard.controller.Post", {
		
		formatter: formatter,
		
		onInit: function(){
			var oViewModel = new JSONModel({
				busy: false
			});
			this.setModel(oViewModel, "postView");
			this.getRouter().getRoute("post").attachPatternMatched(this._onPostMatched, this);
		},
		
		onNavBack: function(){
			this.myNavBack("worklist");
		},
		
		_onPostMatched: function(oEvent){
			var oViewModel = this.getModel("postView"),
			oDataModel = this.getModel();
			this.getView().bindElement({
				path: "/Posts('" + oEvent.getParameter('arguments').postId + "')",
				events: {
					dataRequested: function(){
						oDataModel.metadataLoaded().then(function(){
							// Busy indicator on view should only be set if metadata is loaded,
							// otherwise there may be two busy indications next to each other on the
							// screen. This happens because route matched handler already calls '_bindView'
							// while metadata is loaded.
							oViewModel.setProperty("/busy", true);
						});
					},
					dataReceived: function(){
						oViewModel.setProperty("/busy", false);
					}
				}
			});
		}
	});
});