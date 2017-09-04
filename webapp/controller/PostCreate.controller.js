sap.ui.define([
	'sap/ui/core/mvc/Controller',
	'sap/ui/core/routing/History',
	'sap/m/MessageBox'
], function(Controller, History, MessageBox) {
	"use strict";

	return Controller.extend("sap.ui.demo.bulletinboard.controller.PostCreate", {

		getRouter: function() {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},

		onInit: function() {
			this.f = false;
			this.getRouter().getRoute("postCreate").attachPatternMatched(this._onPostCreateMatched, this);
			this.getView().byId("input_name").attachChange(function() {
				this.onChange();
			}.bind(this));
			this.getView().byId("select_category").attachChange(function() {
				this.onChange();
			}.bind(this));
			this.getView().byId("input_price").attachChange(function() {
				this.onChange();
			}.bind(this));
		},

		_onPostCreateMatched: function() {

		},

		onNavBack: function() {
			if (this.f) {
				var that = this;
				MessageBox.show("Warning", {
					icon: "WARNING",
					title: "Are you sure to drop draft?",
					actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
					onClose: function(oEvent) {
						if (oEvent === sap.m.MessageBox.Action.OK) {
							var oHistory = History.getInstance();
							var sPreviousHash = oHistory.getPreviousHash();
							if (sPreviousHash !== undefined) {
								// The history contains a previous entry
								history.go(-1);
							} else {
								// Otherwise we go backwards with a forward history
								var bReplace = true;
								that.getRouter().navTo("worklist", {}, bReplace);
							}
						} else {
							return;
						}
					}
				});
			}
		},
		
		onChange: function() {
			this.f = true;
		},

		onSavePost: function() {
			var oInputName = this.getView().byId("input_name");
			var oSelectCategory = this.getView().byId("select_category");
			var oInputPrice = this.getView().byId("input_price");

			if (!oInputName.getValue() || !oInputName.getValue().match(/^\w+$/) ||
				!oInputPrice.getValue() || !oInputPrice.getValue().match(/^[1-9]{1}\d*$/) ||
				!oSelectCategory.getSelectedItem()) {
				MessageBox.show("Validation Error", {
					icon: "ERROR",
					title: "You have validation error",
					actions: [sap.m.MessageBox.Action.OK]
				});
				return;
			}

			var oCreateForm = this.getView().byId("form_post_create");
			oCreateForm.setBusy(true);
			oCreateForm.setBusyIndicatorDelay(500);

			var oDataModel = this.getOwnerComponent().getModel();
			var that = this;
			oDataModel.create("/Posts", {
				PostID: jQuery.sap.uid(),
				Title: oInputName.getValue(),
				Price: oInputPrice.getValue(),
				Category: oSelectCategory.getSelectedItem().getText()
			}, {
				success: function() {
					oCreateForm.setBusy(false);
					that.f = false;
					MessageBox.show("Success", {
						icon: "SUCCESS",
						title: "Post was created successfully",
						actions: [sap.m.MessageBox.Action.OK],
						onClose: function() {
							var oHistory = History.getInstance();
							var sPreviousHash = oHistory.getPreviousHash();
							if (sPreviousHash !== undefined) {
								// The history contains a previous entry
								history.go(-1);
							} else {
								// Otherwise we go backwards with a forward history
								var bReplace = true;
								that.getRouter().navTo("worklist", {}, bReplace);
							}
						}
					});
				},
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
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();
			if (sPreviousHash !== undefined) {
				// The history contains a previous entry
				history.go(-1);
			} else {
				// Otherwise we go backwards with a forward history
				var bReplace = true;
				this.getRouter().navTo("worklist", {}, bReplace);
			}
		}
	});

});