import * as assert from 'assert';
import { MdEngine } from 'refinery-core';
import { delay, logger } from 'refinery-core';
import { unlinkSync, readFileSync } from 'fs';
import { Record } from 'refinery-core';
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
      let rec1 = await engine?.recordsDb.db.get(ids[0]);
      let rec2 = await engine?.recordsDb.db.get(ids[1]);
      assert.notEqual(rec1, undefined);
      assert.notEqual(rec2, undefined);
    }
  });
  it("should not load hashes into the title", async function(){
    let ids = await engine?.load('./tests/res/markdown/test.md', undefined, 'myNotebook');
    await delay(50);
    if (ids !== undefined) {
      let rec1: Record = <Record><unknown> await engine?.recordsDb.db.get(ids[0]);
      let rec2: Record = <Record><unknown> await engine?.recordsDb.db.get(ids[1]);
      assert.doesNotMatch(rec1.batch, /#.*/);
      assert.doesNotMatch(rec2.batch, /#.*/);
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
      let firstDoc = <Record><unknown> await engine?.recordsDb.db.get(ids[0]);
      assert.notEqual(mdFileSerialized.search(firstDoc.data[0]), -1);
    }
  });
  after(async function () {
    await engine?.recordsDb.db.destroy();
    unlinkSync('temp.md');
    await delay(50);
  });
});