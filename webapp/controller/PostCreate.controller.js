sap.ui.define([
	'sap/ui/demo/bulletinboard/controller/BaseController',
	'sap/ui/model/json/JSONModel',
	'sap/ui/core/routing/History',
	'sap/m/MessageBox'
], function(BaseController, JSONModel, History, MessageBox) {
	"use strict";

	return BaseController.extend("sap.ui.demo.bulletinboard.controller.PostCreate", {

		onInit: function () {
			this._bChangeFlag = false;
			var oViewModel = new JSONModel({
				busy: false,
				busyDelay: 500
			});
			this.setModel(oViewModel, "postCreateView");
		},

		onChange: function(){
			this._bChangeFlag = true;
		},

		onNavBack: function () {
			if(this._bChangeFlag){
				MessageBox.show("Warning", {
					icon: "WARNING",
					title: "Are you sure to drop draft?",
					actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
					onClose: function(oAction) {
						if (oAction === sap.m.MessageBox.Action.OK) {
							this.myNavBack("worklist");
						}
					}.bind(this)
				});
			}
		},

		getUserInput: function(){
			return {
				Title: this.getView().byId("input_name").getValue(),
				Price: this.getView().byId("input_price").getValue(),
				Category: this.getView().byId("select_category").getSelectedItem().getText()
			};
		},

		_validateUserInput: function(){
			var mInput = this.getUserInput();
			if(!mInput.Title.match(/^\w+$/) ||
				!mInput.Price.match(/^[1-9]{1}\d*$/) ||
				!mInput.Category){
				return false;
			}

			mInput.PostID = jQuery.sap.uid();
			return mInput;
		},

		onSavePost: function() {
			var vRes = this._validateUserInput();
			if (!vRes) {
				MessageBox.show("Validation Error", {
					icon: "ERROR",
					title: "You have validation error",
					actions: [sap.m.MessageBox.Action.OK]
				});
				return;
			}

			var oViewModel = this.getModel("postCreateView");
			oViewModel.setProperty("/busy", true);

			var oDataModel = this.getModel();
			oDataModel.create("/Posts", vRes, {
				success: function() {
					oViewModel.setProperty("/busy", false);
					this._bChangeFlag = false;
					MessageBox.show("Success", {
						icon: "SUCCESS",
						title: "Post was created successfully",
						actions: [sap.m.MessageBox.Action.OK],
						onClose: this.myNavBack.bind(this, "worklist")
					});
				}.bind(this),
				error: function() {
					MessageBox.show("Save Error", {
						icon: "ERROR",
						title: "Create post failed",
						actions: [sap.m.MessageBox.Action.OK]
					});
				}
			});
		},

		onCancelPost: function() {
			this.myNavBack("worklist");
		}
	});

});
