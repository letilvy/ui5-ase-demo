sap.ui.define([
               'sap/ui/demo/bulletinboard/controller/BaseController',
               'sap/ui/model/json/JSONModel',
               'sap/ui/demo/bulletinboard/model/formatter',
               "sap/m/MessageToast",
               "sap/m/MessageBox"
	], function(BaseController, JSONModel, formatter,MessageToast,MessageBox){
	
	"use strict";
	
	return BaseController.extend("sap.ui.demo.bulletinboard.controller.Post", {
		
		formatter: formatter,
		
		onInit: function(){
			this.iCount = 0;
			var oViewModel = new JSONModel({
				busy: false
			});
			this.setModel(oViewModel, "postView");
			this.getRouter().getRoute("post").attachPatternMatched(this._onPostMatched, this);
		},

		onPressFavoriteBtn: function(oEvent){
		    /*
			if(this.iCount % 2 === 0){
				MessageToast.show("success");
			}else{
				MessageToast.show("error");
			}
		    */
		    
		    if(oEvent.getParameter("pressed")){
		    	MessageToast.show("Mark as favorite");
		    }else{
		    	MessageToast.show("Remove favorite");
		    }
		    
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