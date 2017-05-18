exports.config = {
  framework: 'mocha',
  mochaOpts: {
     timeout: 30000,
  },
  onPrepare: function () {
    require("babel-register");
  },
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['src/test/frontend/e2e/e2e.js']
};
