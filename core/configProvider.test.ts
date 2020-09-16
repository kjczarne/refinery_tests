import * as assert from 'assert';
import { config } from 'refinery-core';

let configObj = config();

describe("\`configProvider\` default load", function () {
  it("should have a \`database\` config", function () {
    assert.notEqual(configObj?.refinery.database, undefined);
  });
});