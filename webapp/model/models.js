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
		}
	};

});