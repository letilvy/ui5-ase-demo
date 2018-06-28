sap.ui.define([
	"jquery.sap.global",
	"sap/m/CheckBox",
	"./CheckBoxExRenderer"
], function(jQuery, CheckBox, CheckBoxExRenderer) {

	"use strict";

	var CheckBoxEx = CheckBox.extend("sap.ui.demo.bulletinboard.control.CheckBoxEx", { metadata : {

		properties : {
			selected : {type : "boolean", group : "Data", defaultValue : true}
		}
		
	}});
	

	return CheckBoxEx;

}, true);
