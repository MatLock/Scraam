module.exports = (config) => {
  const configuration = {
    basePath: 'src/test/frontend',
    frameworks: [ 'mocha' ],
    files: [ 'config.test.frontend.js' ],

    preprocessors: {
      "config.test.frontend.js": ["webpack"]
    },
    webpack: require("./webpack.config"),
    webpackMiddleware: {
      stats: "errors-only"
    },

    reporters: [ 'mocha' ],
    mochaReporter: { output: 'full' },
    browserConsoleLogOptions: {
      level: 'log', format: '%b %T: %m', terminal: true
    },
    port: 9876,
    browsers: ['Chrome'],
    singleRun: true,

    customLaunchers: {
      Chrome_travis_ci: {
           base: 'Chrome',
           flags: ['--no-sandbox']
       }
     }
  };
  if(process.env.TRAVIS){
    configuration.browsers = ['Chrome_travis_ci'];
  }
  config.set(configuration);
}
