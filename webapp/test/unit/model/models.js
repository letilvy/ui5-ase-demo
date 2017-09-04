sap.ui.require(
	[
		"sap/ui/demo/bulletinboard/model/models",
		"sap/m/MessageBox",
		"sap/ui/thirdparty/sinon",
		"sap/ui/thirdparty/sinon-qunit"
	],
	function (models, MessageBox) {
		"use strict";

		QUnit.module("createDeviceModel", {
			afterEach: function () {
				this.oDeviceModel.destroy();
			}
		});

		function isPhoneTestCase(assert, bIsPhone) {
			// Arrange
			this.stub(sap.ui.Device, "system", {phone: bIsPhone});

			// System under test
			this.oDeviceModel = models.createDeviceModel();

			// Assert
			assert.strictEqual(this.oDeviceModel.getData().system.phone, bIsPhone, "IsPhone property is correct");
		}

		QUnit.test("Should initialize a device model for desktop", function (assert) {
			isPhoneTestCase.call(this, assert, false);
		});

		QUnit.test("Should initialize a device model for phone", function (assert) {
			isPhoneTestCase.call(this, assert, true);
		});

		function isTouchTestCase(assert, bIsTouch) {
			// Arrange
			this.stub(sap.ui.Device, "support", {touch: bIsTouch});

			// System under test
			this.oDeviceModel = models.createDeviceModel();

			// Assert
			assert.strictEqual(this.oDeviceModel.getData().support.touch, bIsTouch, "IsTouch property is correct");
		}

		QUnit.test("Should initialize a device model for non touch devices", function (assert) {
			isTouchTestCase.call(this, assert, false);
		});

		QUnit.test("Should initialize a device model for touch devices", function (assert) {
			isTouchTestCase.call(this, assert, true);
		});

		QUnit.test("The binding mode of the device model should be one way", function (assert) {

			// System under test
			this.oDeviceModel = models.createDeviceModel();

			// Assert
			assert.strictEqual(this.oDeviceModel.getDefaultBindingMode(), "OneWay", "Binding mode is correct");
		});
		
		QUnit.module("Sinon test");
		
		QUnit.test("Should show warning message box when error code is even", function(assert){
			this.stub(MessageBox, "show");
			models.errorHandler(2);
			assert.strictEqual(MessageBox.show.getCall(0).args[1].icon, "WARNING", "Message box type is correct");
		});
		
		QUnit.test("Should show warning message box when error code is odd", function(assert){
			var oSpy = this.stub(MessageBox, "show");
			models.errorHandler(3);
			//assert.strictEqual(MessageBox.show.getCall(0).args[1].icon, "ERROR", "Message box type is correct");
			assert.ok(oSpy.calledWith(sinon.match.string, sinon.match({icon:"ERROR"})), "Message box type is correct");
		});
	});