sap.ui.define([
	"sap/ui/demo/bulletinboard/model/DateFormatter"
], function (DateFormatter) {
	"use strict";

	return {

		/**
		 * Creates a human readable date
		 *
		 * @public
		 * @param {Date} oDate the date of the property.
		 * @returns {string} sValue the formatted date
		 */
		date: function(oDate) {
			return new DateFormatter({ now: Date.now }).format(oDate);
		}
};

});