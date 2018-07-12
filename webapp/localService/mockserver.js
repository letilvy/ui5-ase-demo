sap.ui.define([
	"sap/ui/core/util/MockServer"
], function (MockServer) {
	"use strict";

	var oMockServer,
		_sAppModulePath = "sap/ui/demo/bulletinboard/",
		_sJsonFilesModulePath = _sAppModulePath + "localService/mockdata";

	var _fnFilterData = function (oEvent) {

		/* This function will be invoked for twice, one is for $count, another is for results */
		// var oFilteredData = oEvent.getParameter("oFilteredData");
		var oData = oEvent.getSource().getEntitySetData("Posts");
		var oXhr = oEvent.getParameter("oXhr");

		if (oXhr.url.indexOf("$count") === -1) {
			var aItems = oData.filter(function (oItem) {
				return oItem.Quantity > 104;
			});
			oEvent.getParameter("oFilteredData").results = aItems;
		}
	};

	return {
		/**
		 * Initializes the mock server.
		 * You can configure the delay with the URL parameter "serverDelay".
		 * The local mock data in this folder is returned instead of the real data for testing.
		 * @public
		 */

		init: function () {

			var oUriParameters = jQuery.sap.getUriParameters(),
				sJsonFilesUrl = jQuery.sap.getModulePath(_sJsonFilesModulePath),
				sManifestUrl = jQuery.sap.getModulePath(_sAppModulePath + "manifest", ".json"),
				oManifest = jQuery.sap.syncGetJSON(sManifestUrl).data,
				oMainDataSource = oManifest["sap.app"].dataSources.mainService,
				sMetadataUrl = jQuery.sap.getModulePath(_sAppModulePath + oMainDataSource.settings.localUri.replace(".xml", ""), ".xml"),
				// ensure there is a trailing slash
				sMockServerUrl = /.*\/$/.test(oMainDataSource.uri) ? oMainDataSource.uri : oMainDataSource.uri + "/";

			oMockServer = new MockServer({
				rootUri: sMockServerUrl
			});

			// configure mock server with a delay of 1s
			MockServer.config({
				autoRespond: true,
				autoRespondAfter: (oUriParameters.get("serverDelay") || 1000)
			});

			oMockServer.simulate(sMetadataUrl, {
				sMockdataBaseUrl: sJsonFilesUrl,
				bGenerateMissingMockData: true
			});

			// Exercise 2 --------------------------------------------------------->

			/* Solution 1:  Modify a 'DELETE' request to mockserver */

			var aRequests = oMockServer.getRequests();
			aRequests.push({
				method: "GET",
				path: /(Posts)\/?(\?(.*))?/,
				response: function (oXhr, urlParameters) {
					var oItems = oMockServer.getEntitySetData("Posts");
					var oItemsFiltered = oItems.filter(function (oItem) {
						return oItem.Quantity > 104;
					});

					oMockServer.setEntitySetData("Posts", oItemsFiltered);

					oXhr.respondJSON(200, {}, {
						"d": {
							"results": oItemsFiltered
						}
					});
				}
			});
			oMockServer.setRequests(aRequests);

			/* Solution 2:  Manipulate response data  */
			// oMockServer.attachAfter("GET", _fnFilterData, "Posts");

			//<--------------------------------------------------------------------

			oMockServer.start();

			jQuery.sap.log.info("Running the app with mock data");
		}
	};

});