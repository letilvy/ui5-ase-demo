sap.ui.define([
	"sap/ui/demo/bulletinboard/model/DateFormatter"
], function (DateFormatter) {
	"use strict";

	return {
		/**
		 * Rounds the number unit value to 2 digits
		 *
		 * @public
		 * @param {string} sValue the number string to be rounded
		 * @returns {string} sValue with 2 digits rounded
		 */
		numberUnit: function (sValue) {
		    "";

		},

		/**
		 * Defines a value state based on the price
		 *
		 * @public
		 * @param {number} iPrice the price of a post
		 * @returns {string} sValue the state for the price
		 */
		priceState: function (iPrice) {
			return "None";
		},

		/**
		 * Creates a human readable date
		 *
		 * @public
		 * @param {Date} oDate the date of the property.
		 * @returns {string} sValue the formatted date
		 */
		date: function(oDate) {
			return new DateFormatter().format(oDate);
		}
};

});

