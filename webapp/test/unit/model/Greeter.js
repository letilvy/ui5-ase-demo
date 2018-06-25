/*global QUnit*/

sap.ui.require([
  'sap/ui/demo/bulletinboard/model/Greeter'
], function (Greeter) {
  'use strict';
  QUnit.module("Greeter");

  QUnit.test("Should only return greeting string if no name is given", function (assert) {
    var oGreeter = new Greeter(function () {
      return new Date(2018, 6, 21, 14, 0, 0, 0).getTime();;
    });
    assert.strictEqual(oGreeter.greet(), "Hello");
  });

  QUnit.test("Should only return greeting string if name is empty string", function (assert) {
    var oGreeter = new Greeter(function () {
      return new Date(2018, 6, 21, 14, 0, 0, 0).getTime();;
    });
    assert.strictEqual(oGreeter.greet(''), "Hello");
  });

  QUnit.test("Should only return greeting string if name only contains space", function (assert) {
    var oGreeter = new Greeter(function () {
      return new Date(2018, 6, 21, 14, 0, 0, 0).getTime();;
    });
    assert.strictEqual(oGreeter.greet('   '), "Hello");
  });

  QUnit.test("Should trim name", function (assert) {
    var oGreeter = new Greeter(function () {
      return new Date(2018, 6, 21, 14, 0, 0, 0).getTime();;
    });
    assert.strictEqual(oGreeter.greet(' Richard '), "Hello Richard");
  });

  QUnit.test("Should return Good morning if time is 6:00", function (assert) {
    var oGreeter = new Greeter(function () {
      return new Date(2018, 6, 21, 6, 0, 0, 0).getTime();;
    });
    assert.strictEqual(oGreeter.greet('Richard'), "Good morning Richard");
  });

  QUnit.test("Should return Good morning if time is 8:00", function (assert) {
    var oGreeter = new Greeter(function () {
      return new Date(2018, 6, 21, 8, 0, 0, 0).getTime();;
    });
    assert.strictEqual(oGreeter.greet('Richard'), "Good morning Richard");
  });

  QUnit.test("Should return Hello if time is 12:00", function (assert) {
    var oGreeter = new Greeter(function () {
      return new Date(2018, 6, 21, 12, 0, 0, 0).getTime();;
    });
    assert.strictEqual(oGreeter.greet('Richard'), "Hello Richard");
  });

  QUnit.test("Should return Hello if time is 14:00", function (assert) {
    var oGreeter = new Greeter(function () {
      return new Date(2018, 6, 21, 14, 0, 0, 0).getTime();;
    });
    assert.strictEqual(oGreeter.greet('Richard'), "Hello Richard");
  });

  QUnit.test("Should return Good evening if time is 18:00", function (assert) {
    var oGreeter = new Greeter(function () {
      return new Date(2018, 6, 21, 18, 0, 0, 0).getTime();;
    });
    assert.strictEqual(oGreeter.greet('Richard'), "Good evening Richard");
  });

  QUnit.test("Should return Good evening if time is 20:00", function (assert) {
    var oGreeter = new Greeter(function () {
      return new Date(2018, 6, 21, 20, 0, 0, 0).getTime();;
    });
    assert.strictEqual(oGreeter.greet('Richard'), "Good evening Richard");
  });

  QUnit.test("Should return Good night if time is 22:00", function (assert) {
    var oGreeter = new Greeter(function () {
      return new Date(2018, 6, 21, 22, 0, 0, 0).getTime();;
    });
    assert.strictEqual(oGreeter.greet('Richard'), "Good night Richard");
  });

  QUnit.test("Should return Good night if time is 23:59", function (assert) {
    var oGreeter = new Greeter(function () {
      return new Date(2018, 6, 21, 23, 59, 0, 0).getTime();;
    });
    assert.strictEqual(oGreeter.greet('Richard'), "Good night Richard");
  });

  QUnit.test("Should return Good night if time is 01:00", function (assert) {
    var oGreeter = new Greeter(function () {
      return new Date(2018, 6, 21, 1, 0, 0, 0).getTime();;
    });
    assert.strictEqual(oGreeter.greet('Richard'), "Good night Richard");
  });

  QUnit.test("Should return Good night if time is 05:00", function (assert) {
    var oGreeter = new Greeter(function () {
      return new Date(2018, 6, 21, 5, 0, 0, 0).getTime();;
    });
    assert.strictEqual(oGreeter.greet('Richard'), "Good night Richard");
  });

});
