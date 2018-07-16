sap.ui.require([
	"sap/ui/demo/bulletinboard/controller/Worklist.controller",
	"sap/ui/model/resource/ResourceModel",
	"sap/ui/base/Event",
	"sap/ui/model/json/JSONModel",
	"sap/m/ListBase",
	"sap/m/ColumnListItem",
	"sap/ui/thirdparty/sinon",
	"sap/ui/thirdparty/sinon-qunit"
], function (WorklistController, ResourceModel, Event, JSONModel, ListBase, ColumnListItem) {
	"use strict";
	QUnit.module("Worklist Controller", {
		before: function () {
			this.oI18n = new ResourceModel({
				bundleName: "sap.ui.demo.bulletinboard.i18n.i18n",
				bundleLocale: "en"
			});
		},
		beforeEach: function () {
			this.oController = new WorklistController();
			sinon.stub(this.oController, "getResourceBundle").returns(this.oI18n.getResourceBundle());

			this.oViewModel = new JSONModel({
				worklistTableTitle: null,
				shareSendEmailSubject: this.oI18n.getResourceBundle().getText("shareSendEmailWorklistSubject"),
				shareSendEmailMessage: this.oI18n.getResourceBundle().getText("shareSendEmailWorklistMessage"),
				selectedPosts: []
			});
			sinon.stub(this.oController, "getModel").withArgs("worklistView").returns(this.oViewModel);
		},
		afterEach: function () {
			sinon.restore();
			this.oViewModel.destroy();
			this.oController.destroy();
		},
		after: function () {
			this.oI18n.destroy();
		}
	});

	QUnit.test("Should table title display as 'Posts (16)' when the table contains 16 posts", function (assert) {
		// Arrangement
		var oEvent = new Event("updateFinished", this.stub, {
			total: 16
		});

		// Action
		this.oController.onUpdateFinished(oEvent);

		// Assertion
		var sAct = this.oViewModel.getProperty("/worklistTableTitle");
		assert.strictEqual(sAct, "Posts (16)", "Table title is: Posts (16)");

	});
	QUnit.test("Should table title display as 'Posts' when the table contains no post", function (assert) {
		// Arrangement
		var oEvent = new Event("updateFinished", this.stub, {
			total: 0
		});

		// Action
		this.oController.onUpdateFinished(oEvent);

		// Assertion
		var sAct = this.oViewModel.getProperty("/worklistTableTitle");
		assert.strictEqual(sAct, "Posts", "Table title is: Posts");
	});

	QUnit.test("Should email contains template content when user selected no post", function (assert) {
		// Arrangement 
		var oStubTriggerEmail = this.stub(sap.m.URLHelper, "triggerEmail");

		// Aciton
		this.oController.onShareEmailPress();

		//Assertion
		var aExpArgs = ["", "My selected items", "Please check below items:"];
		var aActArgs = oStubTriggerEmail.getCall(0).args;
		assert.deepEqual(aActArgs, aExpArgs, "Email content is correct");
	});

	QUnit.test("Should email contains selected posts as message body when user selected 2 posts from list", function (assert) {
		// Arrangement
		var oStubTriggerEmail = this.stub(sap.m.URLHelper, "triggerEmail");

		this.oViewModel.setProperty("/selectedPosts", [{
			Title: "Title_1",
			Price: "12.3",
			Currency: "EUR"
		}, {
			Title: "Title_2",
			Price: "3.14",
			Currency: "USD"
		}]);

		// Action
		this.oController.onShareEmailPress();

		// Assertion
		var aExpArgs = [
			"",
			"My selected items",
			"Please check below items: \n Title_1    12.3    EUR \n Title_2    3.14    USD"
		];
		var aActArgs = oStubTriggerEmail.getCall(0).args;
		assert.deepEqual(aActArgs, aExpArgs, "Email content is correct");
	});


	function _createMockPostList(sMode){
		var oModel = new JSONModel({
			Posts: [{
				Title: "Title_1",
				Price: "3.14",
				Currency: "JPY"
			}, {
				Title: "Title_2",
				Price: "3.141",
				Currency: "USD"
			}, {
				Title: "Title_3",
				Price: "3.1415",
				Currency: "CNY"
			}]
		});
		var oList = new ListBase({
			mode: sMode
		}).setModel(oModel);
		oList.bindItems({
			path: "/Posts", 
			template: new ColumnListItem({

			})
		});
		return oList;
	}

	QUnit.test("Should store selected posts information in view model when user select posts from list", function (assert) {
		// Arrange
		this.oViewModel.setProperty("/selectedPosts", []);
		var oListBase = _createMockPostList("MultiSelect"); 
		oListBase.setSelectedItem(oListBase.getItems()[1]);
		oListBase.setSelectedItem(oListBase.getItems()[2]);
 
		// Action
		this.oController.onListSelectionChange(new Event("selectionChange", oListBase, {
			listItems: [oListBase.getItems()[1], oListBase.getItems()[2]]
		}));

		// Assertion
		var aAct = this.oController.getModel("worklistView").getProperty("/selectedPosts");

		var aExp = [{
			Title: "Title_2",
			Price: "3.141",
			Currency: "USD"
		}, {
			Title: "Title_3",
			Price: "3.1415",
			Currency: "CNY"
		}];

		assert.deepEqual(aAct, aExp, "Posts information was stored correctly");
	});
});