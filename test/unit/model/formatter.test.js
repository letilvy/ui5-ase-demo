sap.ui.require([
  'sap/ui/demo/bulletinboard/model/formatter'
], function (Formatter) {
  'use strict';

	QUnit.module("Formatter - Quantity description");
	
	function quantityDescTestCase(assert, iQuantity, fExpectedDesc) {
		// Act
		var sDesc = Formatter.quantityDesc(iQuantity);

		// Assert
		assert.strictEqual(sDesc, fExpectedDesc, "The description was correct");
	}
	
	QUnit.test("Should show 99+ when quantity is greater than 100.", function (assert) {
		quantityDescTestCase.call(this, assert, 120, "99+");
	});

	QUnit.test("Should show 99+ when quantity is equal to 100.", function (assert) {
		quantityDescTestCase.call(this, assert, 100, "99+");
	});

	QUnit.test("Should show 'Many' when quantity is between 21 to 99.", function (assert) {
		quantityDescTestCase.call(this, assert, 50, "Many");
	});
	
	QUnit.test("Should show 'Many' when quantity is equal to 20.", function (assert) {
		quantityDescTestCase.call(this, assert, 20, "Many");
	});

	QUnit.test("Should show 'Only <actual number> left in stock' when quantity is between 1 to 19.", function (assert) {
		quantityDescTestCase.call(this, assert, 5, "Only 5 left in stock");
	});

	QUnit.test("Should show 'Out of Stock' when quantity is equal to 0.", function (assert) {
		quantityDescTestCase.call(this, assert, 0, "Out of Stock");
	});
});
