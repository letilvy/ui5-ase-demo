/*global QUnit*/

sap.ui.require(
	[
		"sap/ui/demo/bulletinboard/control/CheckBoxEx"
	],
	function (CheckBoxEx) {
		"use strict";

		QUnit.module("CheckBoxEx");
        var bSelected = true;
		QUnit.test("Default Values", function (assert) {
			var oCheckBoxEx = new CheckBoxEx();
			oCheckBoxEx.placeAt("qunit-fixture");
			sap.ui.getCore().applyChanges();
			
			assert.strictEqual(oCheckBoxEx.getSelected(), bSelected, "Property 'selected': Default value should be '" + bSelected + "'");
			
			// cleanup
		    oCheckBoxEx.destroy();
		});
  }
);
