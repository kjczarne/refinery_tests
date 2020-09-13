import * as assert from 'assert';
import { fromConstructRecord, fullRecord } from './fixtures';
import { Record } from '../../src/record';
import { IRecord } from '../../src/interfaces';

describe("Test Engine", function () {
  describe("\`constructRecord\` function", function () {
    it("should produce same \`data[0]\` as manual setter", function () {
      assert.equal(fullRecord.data[0], fromConstructRecord.data[0]);
    });
    it("should produce same \`data[1]\` as manual setter", function () {
      assert.equal(fullRecord.data[1], fromConstructRecord.data[1]);
    });
    it("should produce same \`notebook\` as manual setter", function () {
      assert.equal(fullRecord.notebook, fromConstructRecord.notebook);
    });
    it("should produce same \`source\` as manual setter", function () {
      assert.equal(fullRecord.source, fromConstructRecord.source);
    });
  });

  describe('\`isRecord\` function', function () {
    it("should return true for a valid IRecord", function () {
      assert.equal(Record.isRecord(fullRecord), true);
    });
    it("should return false for a malformed IRecord", function () {
      // skip `data` from `fullRecord`:
      let { data, ...malformed } = fullRecord;
      assert.equal(Record.isRecord(malformed), false);
    });
  });
});
