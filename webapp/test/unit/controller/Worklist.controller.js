sap.ui.require([
	"sap/ui/demo/bulletinboard/controller/Worklist.controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/resource/ResourceModel",
	"sap/m/ListBase",
	"sap/ui/thirdparty/sinon",
	"sap/ui/thirdparty/sinon-qunit"
], function (WorklistController, JSONModel, ResourceModel, ListBase) {

	"use strict";

	QUnit.module("Worklist Controller", {
		before: function () {

			this.oI18NModel = new ResourceModel({
				bundleName: "sap.ui.demo.bulletinboard.i18n.i18n",
				bundleLocale: "en"
			});
		},
		beforeEach: function () {
			this.oController = new WorklistController();
			this.oTable = new ListBase();
			sinon.stub(this.oController, "byId").withArgs("table").returns(this.oTable);

			this.oViewModel = new JSONModel({
				worklistTableTitle: "Posts",
				shareSendEmailSubject: "My selected items",
				shareSendEmailMessage: "Please check below items:",
				tableBusyDelay: 0,
				mode: "MultiSelect"
			});
			sinon.stub(this.oController, "getViewModel").returns(this.oViewModel);
			sinon.stub(this.oController, "getResourceBundle").returns(this.oI18NModel.getResourceBundle());
		},
		afterEach: function () {
			sinon.restore();
			this.oTable.destroy();
			this.oController.destroy();
		}
	});

	function _makeupEventTableUpdateFinished(mParameters) {

		var oEvent = {
			getParameter: function (sParameter) {
				switch (sParameter) {
				case "total":
					return mParameters.total;
				default:
					return null;
				}
			}
		};

		return oEvent;

	}

	function _makeupSingleItem(mParameter) {

		var oItem = {
			getBindingContext: function () {
				return {
					getProperty: function () {
						return {
							Title: mParameter.Title,
							Price: mParameter.Price,
							Currency: mParameter.Currency
						};
					}
				};
			}
		};

		return oItem;
	}

	function _onInitArrangement() {
		// Arrangement
		this.stub(this.oController, "getView").returns({
			setModel: function (oModel, sName) {
				this.oActViewModel = oModel;
				this.oActViewName = sName;
			}.bind(this)
		});

	}
	QUnit.test("Should view model set to initial value when initiating view", function (assert) {
		// Arrangement
		_onInitArrangement.call(this);

		// Action
		this.oController.onInit();

		// Assertion
		assert.strictEqual(this.oActViewName, "worklistView", "View model name");
		assert.deepEqual(this.oActViewModel.getData(), this.oViewModel.getData(), "View model initial value");

	});
	QUnit.test("Should table busy delay value set to 1000 when updaing table after initialization of view", function (assert) {

		// Arrangement
		_onInitArrangement.call(this);

		// Action
		this.oController.onInit();
		this.oTable.fireUpdateFinished();

		// Assertion
		assert.strictEqual(this.oTable.getBusyIndicatorDelay(), 1000, "1st Update");

	});
	QUnit.test("Should table title display 'Posts (16)' when table contains 16 items", function (assert) {
		// Arrangement
		var oEvent = _makeupEventTableUpdateFinished.call(this, {
			total: 16
		});

		// Action
		this.oController.onUpdateFinished(oEvent);

		// Assertion
		var sAct = this.oController.getViewModel().getProperty("/worklistTableTitle");
		assert.strictEqual(sAct, "Posts (16)", "Title is correct!");
	});

	QUnit.test("Should table title display 'Posts' when table contains 0  items", function (assert) {
		// Arrangement
		var oEvent = _makeupEventTableUpdateFinished.call(this, {
			total: 0
		});

		// Action
		this.oController.onUpdateFinished(oEvent);

		// Assertion
		var sAct = this.oController.getViewModel().getProperty("/worklistTableTitle");
		assert.strictEqual(sAct, "Posts", "Title is correct!");
	});

	QUnit.test("Should contains initial email body when press send email button", function (assert) {
		// Arrangement
		var oStubTriggerEmail = this.stub(sap.m.URLHelper, "triggerEmail");

		// Action
		this.oController.onShareEmailPress();

		// Assertion
		var sExpEmailSubject = this.oViewModel.getData().shareSendEmailSubject;
		var sExpEmailBody = this.oViewModel.getData().shareSendEmailMessage;
		var aExp = ["", sExpEmailSubject, sExpEmailBody];

		assert.deepEqual(oStubTriggerEmail.getCall(0).args, aExp, "Email content is correct");
	});

	QUnit.test("Should email body contains selected items when press send email button", function (assert) {
		// Arrangement
		var aSelectedItems = [
			_makeupSingleItem.call(this, {
				Title: "Title_1",
				Price: 12.3,
				Currency: "EUR"
			}),
			_makeupSingleItem.call(this, {
				Title: "Title_2",
				Price: 3.14,
				Currency: "USD"
			})
		];
		this.stub(this.oTable, "getSelectedItems").returns(aSelectedItems);
		var oStubTriggerEmail = this.stub(sap.m.URLHelper, "triggerEmail");

		// Action
		this.oController.onShareEmailPress();

		// Assertion
		var sExpEmailSubject = this.oViewModel.getData().shareSendEmailSubject;
		var aExp = ["", sExpEmailSubject, "Please check below items: \n Title_1    12.3    EUR \n Title_2    3.14    USD"];

		assert.deepEqual(oStubTriggerEmail.getCall(0).args, aExp, "Email content is correct");
	});
});