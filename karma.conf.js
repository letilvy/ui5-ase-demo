module.exports = function(config){
  config.set({
    frameworks: ["ui5", "qunit", "sinon"],
    ui5: {
      url: "https://openui5.hana.ondemand.com",
      mode: "script",
      config: {
        async: true,
        resourceRoots: {
          "sap.ui.demo.bulletinboard": "./base/webapp",
          "test": "./base/webapp/test"
        }
      },
      tests: [
        "sap/ui/demo/bulletinboard/test/unit/allTests"
      ]
    },
    browsers: ["ChromeHeadless"],
    singleRun: true
  });
};