sap.ui.require([
	"sap/ui/demo/bulletinboard/controller/Worklist.controller",
	"sap/ui/demo/bulletinboard/localService/mockserver",
	"sap/ui/model/json/JSONModel",
	"sap/ui/base/Event",
	"sap/ui/thirdparty/sinon",
	"sap/ui/thirdparty/sinon-qunit"
], function(Worklist, Mockserver, JSONModel, Event){
	"use strict";

	QUnit.module("Worklist Controller", {
		before: function(){
			Mockserver.init();
			this.oWl = new Worklist();
			sinon.stub(this.oWl, "showSuggestionPopover");
		},

		beforeEach: function(){
			sinon.stub(this.oWl, "getModel").withArgs("search").returns(new JSONModel({suggest: []}));
		},

		afterEach: function(){
			this.oWl.getModel.restore();
		},

		after: function(){
			this.oWl.destroy();
		}
	});

	QUnit.test("Should show suggestion 'Car Tires, 22 Inch' and 'Car VW Golf (white)' when search term is 'car'", function(assert){
		return this.oWl.onSuggestPosts(new Event("e_car", null, {
			suggestValue: "car"
		})).then(() => {
			assert.strictEqual(this.oWl.getModel("search").getProperty("/suggest/0/Title"), "Car Tires, 22 Inch");
			assert.strictEqual(this.oWl.getModel("search").getProperty("/suggest/1/Title"), "Car VW Golf (white)");
		});	
	});

	QUnit.test("Should show suggestion 'Kids Toys, a Whole Box of Stuff' when search term is 'Kid'", function(assert){
		return this.oWl.onSuggestPosts(new Event("e_kid", null, {
			suggestValue: "Kid"
		})).then(() => {
			assert.strictEqual(this.oWl.getModel("search").getProperty("/suggest/0/Title"), "Kids Toys, a Whole Box of Stuff");
		});	
	});

	QUnit.test("Should show no suggestion when search term is 'dummy'", function(assert){
		return this.oWl.onSuggestPosts(new Event("e_dummy", null, {
			suggestValue: "dummy"
		})).then(() => {
			assert.strictEqual(this.oWl.getModel("search").getProperty("/suggest").length, 0);
		});
	});
});