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
		getViewObject: function(sModelName) {
			var oModel = this.getModelObject(sModelName);
			var oView = {
				getModel: function() {
					return oModel;
				}
			};
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