/*global QUnit*/

sap.ui.require(
	[
		"sap/ui/demo/bulletinboard/control/CheckBoxEx"
	],
	function (CheckBoxEx) {
		"use strict";

		QUnit.module("CheckBoxEx");

		QUnit.test("Should default selected when render the extended checkbox at the first time", function (assert) {
			var oCheckBoxEx = new CheckBoxEx();
			var bSelected = true;

			oCheckBoxEx.placeAt("qunit-fixture");
			sap.ui.getCore().applyChanges();

			assert.strictEqual(oCheckBoxEx.getSelected(), bSelected, "Property 'selected': Default value should be '" + bSelected + "'");

			// cleanup
			oCheckBoxEx.destroy();
		});
    }
);
