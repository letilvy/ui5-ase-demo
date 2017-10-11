sap.ui.define([
	"jquery.sap.global",
	"sap/m/CheckBox",
	"sap/m/CheckBoxRenderer"
], function(jQuery, CheckBox, CheckBoxRenderer) {

	"use strict";

	var CheckBoxEx = CheckBox.extend("sap.m.CheckBoxEx", { metadata : {

		properties : {
			selected : {type : "boolean", group : "Data", defaultValue : true},
		},

		renderer: "sap.m.CheckBoxRenderer"
	}});

	/*CheckBox.prototype.init = function() {
		this.addActiveState(this);
		IconPool.insertFontFaceStyle();
	};*/

	return CheckBoxEx;

}, true);