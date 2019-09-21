// You only need this file
// - if you don't want to customize your Jest environment
// - if you don't want to use Jest i. e. from a Visual Studio Code extension
const { jestConfig } = require('lwc-services/lib/config/jestConfig');

module.exports = {
    ...jestConfig,
    // Add your custom Jest configuration
    testMatch: ['**/__tests__/**/?(*.)(spec|test).ts', '**/__tests__/**/?(*.)(spec|test).ts']
};
