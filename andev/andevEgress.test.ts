import { AndevFldsEngine } from '../../src/handlers/andevFlashcards';
import { fullRecord } from '../core/fixtures';
import * as csv from 'fast-csv';
import { unlinkSync, readFileSync } from 'fs';
import * as assert from 'assert';
import { IRecord } from '../../src';

var controller: AndevFldsEngine = new AndevFldsEngine();

describe("Testing AnDev Flashcards Egress", function () {

  before(async function () {
    await controller.recordsDb.db.put(fullRecord);
  });

  it("should match expected CSV row", async function () {
    await controller.export('temp.csv', 'default', 'myNotebook')
    let expectedContent = `${fullRecord.dataField1},${fullRecord.dataField2}\n`
    let actualContent = readFileSync('temp.csv', { encoding: 'utf-8' });
    assert.equal(expectedContent, actualContent)
  });

  it("should match expected CSV row for a flipped card", async function () {
    await controller.export('temp.csv', 'default', 'myNotebook', undefined, true)
    let expectedContent = `${fullRecord.dataField2},${fullRecord.dataField1}\n`
    let actualContent = readFileSync('temp.csv', { encoding: 'utf-8' });
    assert.equal(expectedContent, actualContent)
  });

  it("should have a non-empty `pastExports` Array", async function () {
    let record: IRecord = await controller.recordsDb.db.get(fullRecord._id);
    assert.notEqual(record.pastExports.length, 0);
  });

  after(async function () {
    await controller.recordsDb.db.destroy();
    unlinkSync('temp.csv');
  });
});