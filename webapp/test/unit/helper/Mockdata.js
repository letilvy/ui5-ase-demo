sap.ui.define([
	"sap/ui/model/resource/ResourceModel",
	"sap/ui/model/json/JSONModel"
], function(ResourceModel, JSONModel) {
	"use strict";

	return {
		getI18nModel: function() {
			return new ResourceModel({
				bundleName: "sap.ui.demo.bulletinboard.i18n.i18n"
			});
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