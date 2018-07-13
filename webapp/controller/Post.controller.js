sap.ui.define([
	'sap/ui/demo/bulletinboard/controller/BaseController',
	'sap/ui/model/json/JSONModel',
	'sap/ui/demo/bulletinboard/model/formatter'
], function (BaseController, JSONModel, formatter) {
	"use strict";

	return BaseController.extend("sap.ui.demo.bulletinboard.controller.Post", {

		formatter: formatter,

		/* =========================================================== */
		/* lifecycle methods                                           */
		/* =========================================================== */

		/**
		 * Called when the worklist controller is instantiated.
		 * @public
		 */
		onInit: function () {
			// Model used to manipulate control states. The chosen values make sure,
			// detail page is busy indication immediately so there is no break in
			// between the busy indication for loading the view's meta data
			var oViewModel = new JSONModel({
				busy: false,
				selectedKey: "info"
			});

			this.getRouter().getRoute("post").attachPatternMatched(this._onPostMatched, this);
			this.setModel(oViewModel, "postView");
		},

		/* =========================================================== */
		/* event handlers                                              */
		/* =========================================================== */

		/**
		 * Navigates back to the worklist
		 * @function
		 */
		onNavBack: function () {
			this.myNavBack("worklist");
		},
		onSelect: function (oEvent) {

			var oCtx = this.getView().getBindingContext();

			this.getRouter().navTo("post", {
				// The source is the list item that got pressed
				postId: oCtx.getProperty("PostID"),
				query: {
					tab: oEvent.getParameter("selectedKey")
				}
			});

		},
		/* =========================================================== */
		/* internal methods                                            */
		/* =========================================================== */

		/**
		 * Binds the view to the post path.
		 *
		 * @function
		 * @param {sap.ui.base.Event} oEvent pattern match event in route 'object'
		 * @private
		 */
		_onPostMatched: function (oEvent) {
			var oArgs, oQuery;
			var oViewModel = this.getModel("postView"),
				oDataModel = this.getModel();

			this.getView().bindElement({
				path: "/Posts('" + oEvent.getParameter("arguments").postId + "')",
				events: {
					dataRequested: function () {
						oDataModel.metadataLoaded().then(function () {
							// Busy indicator on view should only be set if metadata is loaded,
							// otherwise there may be two busy indications next to each other on the
							// screen. This happens because route matched handler already calls '_bindView'
							// while metadata is loaded.
							oViewModel.setProperty("/busy", true);
						});
					},
					dataReceived: function () {
						oViewModel.setProperty("/busy", false);
					}
				}
			});

			var _aValidTabKeys = ["info", "statistics"];

			oArgs = oEvent.getParameter("arguments");
			oQuery = oArgs["?query"];
			if (oQuery && _aValidTabKeys.indexOf(oQuery.tab) > -1) {
				oViewModel.setProperty("/selectedKey", oQuery.tab);
			} 
			// else {
			// 	// the default query param should be visible at all time
			// 	this.getRouter().navTo("posts", {
			// 		postId: oEvent.getSource().getBindingContext().getProperty("PostID")
			// 	}, true /*no history*/ );
			// }
		}

	});
});