sap.ui.define([

], function () {
	'use strict';

	return {
		/**
		 * Defines a description based on the quantity
		 *
		 * @public
		 * @param {number} iQuantity, the quantity of a post
		 * @returns {string} the description text for the quantity
		 */
		quantityDesc: function (iQuantity) {
			if (iQuantity >= 100) {
				return "99+";
			} else if (iQuantity >= 20 && iQuantity < 100) {
				return "Many";
			} else if (iQuantity > 0 && iQuantity < 20) {
				return "Only " + iQuantity + " left in stock";
			} else if (iQuantity === 0) {
				return "Out of Stock";
			}
		}
	};

});
