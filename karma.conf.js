module.exports = function(config){
  config.set({
    frameworks: ["ui5", "qunit", "sinon"],
    basePath: "./",
    type: "application",
    paths: {
      src: "webapp",
      test: "webapp/test"
    },
    ui5: {
      url: "https://openui5.hana.ondemand.com",
      mode: "script",
      config: {
        bindingSyntax: "complex",
        compatVersion: "edge",
        async: true,
        resourceRoots: {
          "sap.ui.demo.bulletinboard": "./base/webapp",
          "test": "./base/webapp/test"
        }
      },
      tests: [
        "sap/ui/demo/bulletinboard/test/unit/allTests"
        // add test case file one by one is also possible here, for example
        //   "test/unit/model/formatter"
      ]
    },

    singleRun: true,

    // enable or disable watching file and executing tests once any file changes
    autoWatch: true,

    browsers: ["ChromiumHeadlessLargeDesktop"],
    browserConsoleLogOptions: {
      level: "info",
      format: "%b %T: %m",
      terminal: false
    },
    customLaunchers: {
        ChromiumHeadlessLargeDesktop: {
          base: "ChromeHeadless",
          flags: ["--disable-web-security", "--window-size=1440,1080"]
        }
    },

    /*plugins: [
        require('karma-coverage'),
        require('karma-junit-reporter'),
        require('karma-spec-reporter'),
        require('karma-ui5'),
        require('karma-qunit'),
        require('karma-sinon'),
        require('karma-chrome-launcher')
    ],*/
    // customize which files should be included in coverage calculation 
    preprocessors: {
      "**/webapp/!(test|localService)/**/*.js": ["coverage"]
    },
    coverageReporter: {
      includeAllSources: true,
      reporters: [
        {
          type: "cobertura",
          dir: "./target/jscoverage",
          subdir: "/./",
          file: "bulletinboard-cobertura-coverage.xml"
        },
        {
          type: "lcov",
          dir: "./target/jscoverage",
          subdir: "/./",
          file: "bulletinboard-lcov.info"
        },
        {
          type: "text"
        }
      ]
    },
    junitReporter: {
      outputDir: "./target/surefire-reports",
      outputFile: "bulletinboard.unitTests.qunit.xml",
      suite: "",
      useBrowserName: false
    },
    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    reporters: ["spec", "coverage", "junit"],
    specReporter: {
      maxLogLines: 50,            // limit number of lines logged per test
      suppressFailed: false,      // do not print information about failed tests
      suppressPassed: false,      // do not print information about passed tests
      suppressSkipped: true,      // do not print information about skipped tests
      showSpecTiming: false       // print the time elapsed for each spec
    }
  });
};