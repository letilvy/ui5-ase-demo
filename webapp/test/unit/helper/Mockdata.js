sap.ui.define([
	"sap/ui/model/resource/ResourceModel",
	"sap/ui/core/mvc/View",
	"sap/ui/model/json/JSONModel"
], function(ResourceModel, View, JSONModel) {
	"use strict";

	return {
		getI18nModel: function() {
			return new ResourceModel({
				bundleName: "sap.ui.demo.bulletinboard.i18n.i18n"
			});
		},
		getViewObject: function() {
			var oView = new View({
				viewName: "view"
			});
			// var oWorklistTableTitleModel = this.getModelObject("worklistView");
			oView.setModel( this.getModelObject("worklistView"), "worklistView" );
			return oView;
		},
		getModelObject: function(sModelName) {
			switch (sModelName) {
				case "worklistView":
					return new JSONModel({
						worklistTableTitle: ""
					});

			}
		}
	};
});