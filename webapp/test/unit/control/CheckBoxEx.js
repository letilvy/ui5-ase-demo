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
		
		QUnit.test("Tap when selected=true", function (assert) {
			var oCheckBoxEx = new CheckBoxEx();
			var oSpy = this.spy();
		    oCheckBoxEx.attachSelect(oSpy);
		    
			oCheckBoxEx.placeAt("qunit-fixture");
			sap.ui.getCore().applyChanges();
			
			assert.equal(oCheckBoxEx.getSelected(), true, "CheckBox should be selected");
	     	assert.strictEqual(oCheckBoxEx.$().attr("aria-checked"), "true", "Property 'aria-checked': Default value should be 'true'");
			
			sap.ui.test.qunit.triggerEvent("tap", oCheckBoxEx.getId());
			assert.ok(oSpy.calledOnce, "Event 'select' should have been fired");
		    assert.equal(oCheckBoxEx.getSelected(), false, "CheckBox should not be selected");
		    assert.strictEqual(oCheckBoxEx.$().attr("aria-checked"), "false", "Property 'aria-checked': Default value should be 'false'");
		    
		    sap.ui.test.qunit.triggerEvent("tap", oCheckBoxEx.getId());
		    assert.ok(oSpy.calledTwice, "Event 'select' should have been fired");
		    assert.equal(oCheckBoxEx.getSelected(), true, "CheckBox should be selected");
		    assert.strictEqual(oCheckBoxEx.$().attr("aria-checked"), "true", "Property 'aria-checked': Default value should be 'true'");
			
			// cleanup
		    oCheckBoxEx.destroy();
		});
		
		QUnit.test("Press Enter on selected checkBox", function (assert) {
			var oCheckBoxEx = new CheckBoxEx();
			var oSpy = this.spy();
		    oCheckBoxEx.attachSelect(oSpy);
		    
			oCheckBoxEx.placeAt("qunit-fixture");
			sap.ui.getCore().applyChanges();
			
			oCheckBoxEx.$().focus();
			sap.ui.test.qunit.triggerKeydown(oCheckBoxEx.$(), jQuery.sap.KeyCodes.ENTER);
			
			assert.strictEqual(oSpy.callCount, 1, "Enter is pressed, select event was fired");
			assert.equal(oCheckBoxEx.getSelected(), false, "CheckBox should be deselected");
			assert.strictEqual(oCheckBoxEx.$().attr("aria-checked"), "false", "Property 'aria-checked' should be 'false'");
			
			// cleanup
		    oCheckBoxEx.destroy();
		});
  }
);
