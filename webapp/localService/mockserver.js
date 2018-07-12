sap.ui.define([
	"sap/ui/core/util/MockServer"
], function (MockServer) {
	"use strict";

	var oMockServer,
		_sAppModulePath = "sap/ui/demo/bulletinboard/",
		_sJsonFilesModulePath = _sAppModulePath + "localService/mockdata";

	var _fnFilterData = function (oEvent) {

		/* This function will be invoked for twice, one is for $count, another is for results */
		var oFilteredData = oEvent.getParameter("oFilteredData");

		oEvent.getParameter("oFilteredData").results = oFilteredData.results.filter(function (oItem) {
			return oItem.Quantity > 104;
		});

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

			/* Manipulate response data */
			oMockServer.attachAfter("GET", _fnFilterData, "Posts");

			oMockServer.start();

			jQuery.sap.log.info("Running the app with mock data");
		}
	};

});