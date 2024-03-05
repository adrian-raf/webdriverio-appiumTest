require('dotenv').config();
const { config } = require('./wdio.shared.conf');

//
// ============
// BrowserStack Credentials
// ============
config.user = process.env.BROWSERSTACK_USER;
config.key = process.env.BROWSERSTACK_KEY;

//
// ============
// Specs
// ============
config.specs = ['../test/specs/android/add-note.screen*.js'];

//
// ============
// Capabilities
// ============
config.capabilities = [
  {
    // capabilities for local Appium web tests on an Android Emulator
    platformName: 'Android',
    'appium:deviceName': 'Google Pixel 4',
    'appium:platformVersion': '10.0',
    'appium:automationName': 'UiAutomator2',
    'appium:app': 'bs://cf34ba179c7fd1b1d966b7deadc22af04d24c200',
    'appium:autoGrantPermissions': true,
  },
];

//
// Test runner services
// Services take over a specific job you don't want to take care of. They enhance
// your test setup with almost no effort. Unlike plugins, they don't add new
// commands. Instead, they hook themselves up into the test process.
config.services = ['browserstack'];
exports.config = config;
