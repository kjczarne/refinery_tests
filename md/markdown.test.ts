import * as assert from 'assert';
import { MdEngine } from '../../src/engines/markdown';
import { delay } from '../../src/utils';
import { unlinkSync, readFileSync } from 'fs';
import { IRecord } from '../../src';
import { fullRecord } from '../core/fixtures';

var engine: MdEngine | undefined = undefined;

describe("Test Markdown Ingress", function () {
  before(async function () {
    engine = new MdEngine();
  });
  it("should load two exact flashcards from test.md", async function () {
    let ids = await engine?.load('./tests/res/markdown/test.md', undefined, 'myNotebook');
    await delay(100);
    assert.equal(ids?.length, 2);
    if (ids !== undefined) {
      let rec1 = engine?.recordsDb.db.get(ids[0]);
      let rec2 = engine?.recordsDb.db.get(ids[0]);
      assert.notEqual(rec1, undefined);
      assert.notEqual(rec2, undefined);
    }
  });
  after(async function () {
    await engine?.recordsDb.db.destroy();
  });
});

describe("Test Markdown Egress", function(){
  before(async function () {
    engine = new MdEngine();
    await engine.recordsDb.db.put(fullRecord);
    await delay(100);
  });
  it("should dump a markdown file", async function(){
    let ids = await engine?.export('temp.md', 'default', 'myNotebook');
    assert.notEqual(ids, undefined);
    assert.notEqual(ids?.length, 0);
    let mdFileSerialized = readFileSync('temp.md', {encoding: 'utf-8'});
    if (ids !== undefined) {
      let firstDoc = <IRecord><unknown>engine?.recordsDb.db.get(ids[0]);
      assert.notEqual(mdFileSerialized.search(firstDoc.dataField1), -1);
    }
  });
  after(async function () {
    await engine?.recordsDb.db.destroy();
    // unlinkSync('temp.md');
    await delay(50);
  });
});