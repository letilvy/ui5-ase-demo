sap.ui.define([
	'sap/ui/demo/bulletinboard/controller/BaseController',
	'sap/ui/model/json/JSONModel',
	'sap/ui/demo/bulletinboard/model/formatter'
], function (BaseController, JSONModel, formatter) {
	'use strict';

	return BaseController.extend('sap.ui.demo.bulletinboard.controller.Worklist', {

		formatter: formatter,

		/**
		 * Called when the worklist controller is instantiated.
		 * @public
		 */
		onInit: function () {
			var oViewModel;

			// Model used to manipulate control states
			oViewModel = new JSONModel({
				userName: 'Richard Gong'
			});
			this.setModel(oViewModel, 'worklistView');
		}
	});

});
