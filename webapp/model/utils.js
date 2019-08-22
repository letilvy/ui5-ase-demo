sap.ui.define([
	'sap/m/MessageBox',
	"sap/m/MessageToast"
], function (MessageBox,MessageToast) {
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
		},

		favoriteHandler:function(bPressed){
			if(bPressed){
		    	MessageToast.show("Mark as favorite");
		    }else{
		    	MessageToast.show("Remove favorite");
		    }
		}
	};

});