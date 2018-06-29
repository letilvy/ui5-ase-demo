sap.ui.define([
	"jquery.sap.global",
	"sap/m/CheckBox"
], function(jQuery, CheckBox){

	"use strict";

	var CheckBoxEx = CheckBox.extend("sap.ui.demo.bulletinboard.control.CheckBoxEx", { 
		metadata: {
			properties: {
				selected: {type: "boolean", group: "Data", defaultValue: true}
			}
		},

		renderer: "sap.m.CheckBoxRenderer"
	});
	
	return CheckBoxEx;

}, true);
