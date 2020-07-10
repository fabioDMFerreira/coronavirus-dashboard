// eslint-disable-file

const { defaults: tsjPreset } = require('ts-jest/presets');
const tsconfig = require("./tsconfig.json");
const moduleNameMapper = require("tsconfig-paths-jest")(tsconfig);

module.exports = {
  ...tsjPreset,
  transform: {
    ...tsjPreset.transform,
    "^.+\\.tsx?$": "ts-jest",
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper,
  globals: {
    'ts-jest': {
      babelConfig: true,
    }
  },
  "coverageDirectory": "./coverage/",
  "collectCoverage": true,
};
