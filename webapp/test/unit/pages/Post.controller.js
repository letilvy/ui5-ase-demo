sap.ui.require(
	[
		"sap/ui/demo/bulletinboard/controller/Post.controller",
		"sap/ui/model/odata/v2/ODataModel",
		"sap/m/MessageBox",
		"sap/m/MessageToast",
		"sap/ui/thirdparty/sinon",
		"sap/ui/thirdparty/sinon-qunit"
	],
	function (Post, ODataModel,MessageBox,MessageToast) {
		"use strict";
		
		QUnit.module("add and remove favorite",{
		    beforeEach: function() {
    			this.post = new Post();
			    sinon.stub(this.post, "getModel").returns(new ODataModel(""));
    		},
    		afterEach: function() {
    			this.post.destroy();
    		}
    	});

		QUnit.test("Should show 'Mask as favorite' when toggle the favorite button", function(assert){
			//Arrangement
			this.stub(MessageToast, "show");

			//Action
			this.post.onPressFavoriteBtn(new sap.ui.base.Event(null, null, {
				pressed: true
			}));

			//Assertion
			assert.strictEqual(MessageToast.show.getCall(0).args[0], "Mark as favorite");
		});

		QUnit.test("Should show 'Remove favorite' when toggle the favorite button", function(assert){
			//Arrangement
			this.stub(MessageToast, "show");

			//Action
			this.post.onPressFavoriteBtn(new sap.ui.base.Event(null, null, {
				pressed: false
			}));

			//Assertion
			assert.strictEqual(MessageToast.show.getCall(0).args[0], "Remove favorite");
		});
		
		/*QUnit.test("Should show warning message box when updating favorite error", function(assert){
			this.stub(MessageBox, "error");
			this.stub(ODataModel.prototype,"submitChanges").yieldsTo("error");
			this.post.onPressFavoriteBtn();                            
			assert.strictEqual(MessageBox.error.getCall(0).args[0], "error");
		});
		
		QUnit.test("Should show success message toast when updating favorite success", function(assert){
			this.stub(MessageToast, "show");
			this.stub(ODataModel.prototype,"submitChanges").yieldsTo("success");
			this.post.onPressFavoriteBtn();                            
			assert.strictEqual(MessageToast.show.getCall(0).args[0], "success");
		});*/
	});