sap.ui.define([
	'sap/ui/demo/bulletinboard/model/Greeter'
], function (Greeter) {
	'use strict';

	return {
		greeter: function (sName) {
			var oGreeter = new Greeter(function () {
				return new Date(2018, 6, 21, 18, 0, 0, 0).getTime();
			});

			return oGreeter.greet(sName);
		}
	};

});
