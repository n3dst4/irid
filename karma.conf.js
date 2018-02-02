// Karma configuration

// Run normally, this Karma config will stay open in watch mode and re-run your
// tests when the code changes. It will also pop-up a desktop notification on
// each run.

// Under TeamCity or any CI environment that sets the environment variable CI to
// atruthy value, it will just do a single run.

// When running under TeamCity, it will also use the TeamCity reporter.

var isTeamCity = !!process.env.TEAMCITY_VERSION
var isCIEnvironment = isTeamCity || !!(process.env.CI)
// this gets inserted by yeoman generator n3dst4-package:karma based on the
// "babel" config value
var useBabelify = true

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    // CLI --log-level debug
    logLevel: config.LOG_WARN,

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['browserify', 'mocha'],

    browserify: {
      debug: true,
      transform: useBabelify ? ["babelify", "envify"] : ["envify"],
      // for enzyme
      configure: function(bundle) {
        bundle.on('prebundle', function() {
          bundle.external('react/addons');
          bundle.external('react/lib/ReactContext');
          bundle.external('react/lib/ExecutionEnvironment');
          bundle.external('react-addons-test-utils');
        });
      }
    },

    // list of files / patterns to load in the browser
    files: [
      'test/test-*.js'
    ],

    // list of files to exclude
    exclude: [
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'test/**/*.js': [ 'browserify' ],
      'src/**/*.js': [ 'browserify' ],
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: isTeamCity ? ["teamcity"] : isCIEnvironment ? ['progress'] :
      ['progress', 'notify'], // probably desktop then

    notifyReporter: {
      reportEachFailure: true, // Default: false, Will notify on every failed spec
      reportSuccess: true, // Default: true, Will notify when a suite was successful
    },

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: !isCIEnvironment,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Firefox'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: isCIEnvironment,

    // See https://www.npmjs.com/package/karma-mocha
    client: {
      mocha: {
        reporter: 'html', // change Karma's debug.html to the mocha web reporter
        ui: 'tdd'
      }
    }
  })
}
