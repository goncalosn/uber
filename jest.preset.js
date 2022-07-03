const nxPreset = require('@nrwl/jest/preset');

module.exports = {
  ...nxPreset,
  runner: 'groups',
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
};
