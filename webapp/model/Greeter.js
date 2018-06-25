sap.ui.define([
  'jquery.sap.global',
  'sap/ui/base/Object'
], function (jQuery, Object) {
  'use strict';
  return Object.extend("sap.ui.demo.bulletinboard.model.Greeter", {
    constructor: function (fnGetCurrentTimeMillis) {
      this.fnGetCurrentTimeMillis = fnGetCurrentTimeMillis;
    },

    greet: function (sName) {
      var dCurrentTime = new Date(this.fnGetCurrentTimeMillis());
      var iHourOfDay = dCurrentTime.getHours();
      var sGreeting = this._getGreeting(iHourOfDay);

      if (sName === undefined || sName === null) {
        return sGreeting;
      }
      
      sName = jQuery.trim(sName);
      if (sName === '') {
        return sGreeting;
      }

      return sGreeting + ' ' + sName;
    },

    _getGreeting: function (iHourOfDay) {
      var sGreeting;
      if (iHourOfDay >= 6 && iHourOfDay < 12) {
        sGreeting = 'Good morning';
      } else if (iHourOfDay >= 12 && iHourOfDay < 18) {
        sGreeting = 'Hello';
      } else if (iHourOfDay >= 18 && iHourOfDay < 22) {
        sGreeting = 'Good evening';
      } else {
        sGreeting = 'Good night';
      }
      return sGreeting;
    }
  });
});