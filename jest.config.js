const { defaults: tsjPreset } = require('ts-jest/presets');

module.exports = {
    preset: 'ts-jest',
    testMatch: [
        '**/tests/**/*.ts',
        '**/*.test.ts',
    ],
    transform: {
        ...tsjPreset.transform,
    },
};
