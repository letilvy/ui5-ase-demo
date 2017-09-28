sap.ui.require(
	[
		"sap/ui/demo/bulletinboard/controller/Post.controller",
		"sap/ui/model/odata/v2/ODataModel",
		"sap/ui/thirdparty/sinon",
		"sap/ui/thirdparty/sinon-qunit"
	],
	function (Post, ODataModel) {
		"use strict";
		
		QUnit.module("add and remove favorite",{
		    beforeEach: function() {
    			this.post = new Post();
    			this.viewStub = new sap.ui.core.mvc.View({});
			    sinon.stub(this.post, "getView").returns(this.viewStub);
			    this.viewStub.setModel(new ODataModel(""));    
    		},
    		afterEach: function() {
    			this.post.destroy();
    			this.viewStub.destroy();
    		}
    	});
	});