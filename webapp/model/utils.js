sap.ui.define([
	'sap/m/MessageBox'
], function (MessageBox) {
	"use strict";

	return {
		/**
			Use this method on flag button click event to test
		**/
		errorHandler: function(iErrorCode){
			 var sIcon = parseInt(iErrorCode)%2 === 0 ? "WARNING":"ERROR";
			 
			 MessageBox.show(sIcon + " Message Goes Here", {
			 	icon: sIcon,
				title: "My message box title",
        		actions: [sap.m.MessageBox.Action.OK]
			 });
		}
	};

});