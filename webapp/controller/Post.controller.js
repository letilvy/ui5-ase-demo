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
			this.getRouter().getRoute("post").attachPatternMatched(this._onPostMatched, this);
			// Model used to manipulate control states. The chosen values make sure,
			// detail page is busy indication immediately so there is no break in
			// between the busy indication for loading the view's meta data
			var oViewModel = new JSONModel({
					busy: false
				});
			this.setModel(oViewModel, "postView");
			this.setModel(new JSONModel(), "post");
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
			var oViewModel = this.getModel("postView");

			oViewModel.setProperty("/busy", true);
			const sURL = "/here/goes/your/serviceUrl/Posts('" + oEvent.getParameter("arguments").postId + "')";
            jQuery.ajax(sURL, {
                method: "GET",
                contentType: "application/json",
                success: (oData) => {
                    this.getModel("post").setData(oData || []);
                    oViewModel.setProperty("/busy", false);
                }
            });
		}

	});

});
