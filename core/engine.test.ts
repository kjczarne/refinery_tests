import * as assert from 'assert';
import { fromConstructRecord, fullRecord } from './fixtures';
import { isRecord } from '../../src/engine';
import { IRecord } from '../../src/interfaces';

describe("Test Engine", function () {
  describe("\`constructRecord\` function", function () {
    it("should produce same \`dataField1\` as manual setter", function () {
      assert.equal(fullRecord.dataField1, fromConstructRecord.dataField1);
    });
    it("should produce same \`dataField2\` as manual setter", function () {
      assert.equal(fullRecord.dataField2, fromConstructRecord.dataField2);
    });
    it("should produce same \`notebook\` as manual setter", function () {
      assert.equal(fullRecord.notebook, fromConstructRecord.notebook);
    });
    it("should produce same \`pageMap\` as manual setter", function () {
      assert.equal(fullRecord.pageMap, fromConstructRecord.pageMap);
    });
    it("should produce same \`source\` as manual setter", function () {
      assert.equal(fullRecord.source, fromConstructRecord.source);
    });
    it("should produce same \`richContent\` as manual setter", function () {
      assert.equal(fullRecord.richContent, fromConstructRecord.richContent);
    });
  });

  describe('\`isRecord\` function', function () {
    it("should return true for a valid IRecord", function () {
      assert.equal(isRecord(fullRecord), true);
    });
    it("should return false for a malformed IRecord", function () {
      // skip `dataField1` from `fullRecord`:
      let { dataField1, ...malformed } = fullRecord;
      assert.equal(isRecord(malformed), false);
    });
  });

  describe("\`convert\` function derivatives", function () {
    describe("\`convertToMarkdown\` function", function () {
      it("should return valid Markdown", function () {
        //TODO: MD unit tests
      });
    });
    describe("\`convertToHtml\` function", function () {
      it("should return valid HTML", function () {
        //TODO: HTML unit tests
      });
    });
  });
});
