import * as assert from 'assert';
import { MdEngine } from '../../src/handlers/markdown';
import { delay } from '../../src/utils';
import { promises as fs, readFileSync } from 'fs';
import { IRecord } from '../../src';

var engine: MdEngine | undefined = undefined;

describe("Test Markdown Ingress", function () {
  before(function () {
    engine = new MdEngine();
  });
  it("should load two exact flashcards from test.md", async function () {
    let ids = await engine?.load('./tests/res/markdown/test.md');
    delay(100);
    assert.equal(ids?.length, 2);
    if (ids !== undefined) {
      let rec1 = engine?.recordsDb.db.get(ids[0]);
      let rec2 = engine?.recordsDb.db.get(ids[0]);
      assert.notEqual(rec1, undefined);
      assert.notEqual(rec2, undefined);
    }
  });
});

describe("Test Markdown Egress", function(){
  before(function () {
    engine = new MdEngine();
  });
  it("should dump a markdown file", async function(){
    let ids = await engine?.export('temp.md', 'default', 'default');
    assert.notEqual(ids, undefined);
    assert.notEqual(ids?.length, 0);
    let mdFileSerialized = readFileSync('temp.md', {encoding: 'utf-8'});
    if (ids !== undefined) {
      let firstDoc = <IRecord><unknown>engine?.recordsDb.db.get(ids[0]);
      assert.notEqual(mdFileSerialized.search(firstDoc.dataField1), -1);
    }
  });
  after(async function () {
    await fs.unlink('temp.md');
  });
});