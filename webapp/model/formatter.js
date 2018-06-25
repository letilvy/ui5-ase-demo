sap.ui.define([
	'sap/ui/demo/bulletinboard/model/Greeter'
], function (Greeter) {
	'use strict';

	return {
		greeter: function (sName) {
			var oGreeter = new Greeter();

			return oGreeter.greet(sName);
		}
	};

});
