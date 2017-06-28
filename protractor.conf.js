exports.config = {
  framework: 'mocha',
  mochaOpts: {
     timeout: 30000,
  },
  seleniumAddress: process.env.WEBDRIVER || 'http://localhost:4444/wd/hub',
  baseUrl: process.env.SERVER || 'http://localhost:3001' ,
  onPrepare: function () {
    require("babel-register");
  },
  specs: ['src/test/frontend/e2e/e2e.js']
};
