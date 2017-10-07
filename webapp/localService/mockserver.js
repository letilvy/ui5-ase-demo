sap.ui.define([
	"sap/ui/core/util/MockServer"
], function (MockServer) {
	"use strict";

	var oMockServer;

	return {
		/**
		 * Initializes the mock server.
		 * You can configure the delay with the URL parameter "serverDelay".
		 * The local mock data in this folder is returned instead of the real data for testing.
		 * @public
		 */

		init : function () {
			
			/*  1. Instanciate a MockServer: oMockServer */  
			oMockServer = new MockServer({
				// roolUri is defined in manifest.json file
			});
				
			/*  2. configure mock server with a delay of 1s  */
				// var oUriParameters = jQuery.sap.getUriParameters();
		
			/*  3. simulate */  
			
			/* 4. start */ 

			jQuery.sap.log.info("Running the app with mock data");
		}
	};

});