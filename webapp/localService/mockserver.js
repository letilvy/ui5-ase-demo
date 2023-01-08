sap.ui.define([
	"sap/ui/core/util/MockServer"
], function (MockServer) {
	"use strict";

	var oMockServer,
		_sAppModulePath = "sap/ui/demo/bulletinboard/",
		_sJsonFilesModulePath = _sAppModulePath + "localService/mockdata";

	return {
		/**
		 * Initializes the mock server.
		 * You can configure the delay with the URL parameter "serverDelay".
		 * The local mock data in this folder is returned instead of the real data for testing.
		 * @public
		 */
		init: function(){
			var oUriParameters = jQuery.sap.getUriParameters(),
				sJsonFilesUrl = jQuery.sap.getModulePath(_sJsonFilesModulePath),
				sManifestUrl = jQuery.sap.getModulePath(_sAppModulePath + "manifest", ".json"),
				oManifest = jQuery.sap.syncGetJSON(sManifestUrl).data,
				oMainDataSource = oManifest["sap.app"].dataSources.mainService,
				sMetadataUrl = jQuery.sap.getModulePath(_sAppModulePath + oMainDataSource.settings.localUri.replace(".xml", ""), ".xml"),
				// ensure there is a trailing slash
				sMockServerUrl = /.*\/$/.test(oMainDataSource.uri) ? oMainDataSource.uri : oMainDataSource.uri + "/";

			oMockServer = new MockServer({
				rootUri : sMockServerUrl
			});

			// configure mock server with a delay of 1s
			MockServer.config({
				autoRespond : true,
				autoRespondAfter : (oUriParameters.get("serverDelay") || 1000)
			});

			oMockServer.simulate(sMetadataUrl, {
				sMockdataBaseUrl : sJsonFilesUrl,
				bGenerateMissingMockData : true
			});

			var aRequests = oMockServer.getRequests();

			var sPostsJsonUrl = sJsonFilesUrl + "/Posts.json",
			oRegQueryFilter = new RegExp("q=(.*)$", "i"),
			oRegPostIdFilter = new RegExp("'(.*)'", "i");
			aRequests.push({
				method: "GET",
				path: new RegExp("Posts(.*)"),
				response: function (oXhr, sEntity) {
					var aPost = jQuery.sap.syncGetJSON(sPostsJsonUrl).data.d.results;
					if(oRegPostIdFilter.test(sEntity)){
						var sPostId = oRegPostIdFilter.exec(sEntity)[1];
						oXhr.respondJSON(200, {}, aPost.find((oPost)=>{
							return oPost.PostID === sPostId;
						}));
					}else if(oRegQueryFilter.test(sEntity)){
						var sQuery = oRegQueryFilter.exec(sEntity)[1];
						if(sQuery)
							oXhr.respondJSON(200, {}, aPost.filter((oPost)=>{
								return oPost.Title.toLowerCase().startsWith(sQuery.toLowerCase());
							}));
					}else{
						oXhr.respondJSON(200, {}, aPost);
					}
					return true;
				}
			});

			oMockServer.setRequests(aRequests);

			oMockServer.start();

			jQuery.sap.log.info("Running the app with mock data");
		}
	};

});

