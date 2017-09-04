sap.ui.define([
	'sap/ui/model/json/JSONModel',
	'sap/m/MessageBox',
	'sap/ui/Device'
], function (JSONModel, MessageBox, Device) {
	"use strict";

	return {
		createDeviceModel: function () {
			var oModel = new JSONModel(Device);
			oModel.setDefaultBindingMode("OneWay");
			return oModel;
		},
		
		errorHandler: function(iErrorCode){
			 var sIcon = parseInt(iErrorCode)%2 === 0 ? "WARNING":"ERROR";
			 
			 MessageBox.show("Error Message Goes Here", {
			 	icon: sIcon,
				title: "My message box title",
        		actions: [sap.m.MessageBox.Action.Cancel]
			 });
		}
	};

});