sap.ui.define([
	'sap/ui/core/UIComponent',
	'sap/ui/demo/bulletinboard/model/models',
	'sap/ui/model/json/JSONModel',
	'sap/ui/Device'
], function (UIComponent, models, JSONModel, Device){
	"use strict";

	return UIComponent.extend("sap.ui.demo.bulletinboard.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * In this function, the resource and application models are set and the router is initialized.
		 * @public
		 * @override
		 */
		init: function () {

			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// allow saving values to the OData model
			this.getModel().setDefaultBindingMode("TwoWay");

			// set the device model
			this.setModel(models.createDeviceModel(), "device");

			// set posts model
			this.setModel(new JSONModel(), "posts");

			// create the views based on the url/hash
			this.getRouter().initialize();
		}

	});

});
