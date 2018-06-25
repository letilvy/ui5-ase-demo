sap.ui.define([
  'jquery.sap.global',
  'sap/ui/base/Object'
], function (jQuery, Object) {
  'use strict';
  return Object.extend("sap.ui.demo.bulletinboard.model.Greeter", {
    constructor: function () {
    },

    greet: function (sName) {
      return sName;
    }
  });
});