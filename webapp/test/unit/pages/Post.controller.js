sap.ui.require(
	[
		"sap/ui/demo/bulletinboard/controller/Post.controller",
		"sap/ui/model/odata/v2/ODataModel",
		"sap/ui/thirdparty/sinon",
		"sap/ui/thirdparty/sinon-qunit"
	],
	function (Post, View, ODataModel) {
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
    	
    	
    	//stub yieldsTo
	});