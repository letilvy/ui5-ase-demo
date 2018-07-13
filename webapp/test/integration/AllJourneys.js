/*global QUnit*/

jQuery.sap.require("sap.ui.thirdparty.qunit-2");
jQuery.sap.require("sap.ui.qunit.qunit-2-css");
jQuery.sap.require("sap.ui.qunit.qunit-junit");
QUnit.config.autostart = false;

sap.ui.require([
	"sap/ui/test/Opa5",
	"sap/ui/demo/bulletinboard/test/integration/pages/Common"
], function (Opa5, Common) { 
	"use strict";
	Opa5.extendConfig({
		arrangements: new Common(),
		viewNamespace: "sap.ui.demo.bulletinboard.view.",
		autoWait: true
	});

	sap.ui.require([
		
		], function () {
		QUnit.start();
	});
});